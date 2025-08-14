<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProcurementRequestRequest;
use App\Models\Item;
use App\Models\ProcurementRequest;
use App\Models\ProcurementRequestItem;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProcurementRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ProcurementRequest::with(['venue', 'requester', 'approver', 'items.item'])
            ->latest();

        // Search by venue name
        if ($request->filled('venue')) {
            $query->whereHas('venue', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->venue . '%');
            });
        }

        // Search by request date
        if ($request->filled('date')) {
            $query->whereDate('request_date', $request->date);
        }

        // Filter by status for admins (they can only see their own requests)
        if (!auth()->user()->isSuperAdmin()) {
            $query->where('requested_by', auth()->id());
        }

        $requests = $query->paginate(10)->withQueryString();

        return Inertia::render('procurement-requests/index', [
            'requests' => $requests,
            'filters' => $request->only(['venue', 'date']),
            'canCreateRequest' => auth()->user()->isAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Only admins can create procurement requests.');
        }

        $venues = Venue::active()->orderBy('name')->get();
        $items = Item::orderBy('name')->get();

        return Inertia::render('procurement-requests/create', [
            'venues' => $venues,
            'items' => $items,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProcurementRequestRequest $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Only admins can create procurement requests.');
        }

        $procurementRequest = ProcurementRequest::create([
            'venue_id' => $request->venue_id,
            'requested_by' => auth()->id(),
            'request_date' => $request->request_date,
            'notes' => $request->notes,
            'status' => ProcurementRequest::STATUS_PENDING,
        ]);

        // Create request items
        foreach ($request->items as $itemData) {
            ProcurementRequestItem::create([
                'procurement_request_id' => $procurementRequest->id,
                'item_id' => $itemData['item_id'],
                'quantity' => $itemData['quantity'],
                'notes' => $itemData['notes'] ?? null,
            ]);
        }

        return redirect()->route('procurement-requests.show', $procurementRequest)
            ->with('success', 'Permintaan pengadaan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProcurementRequest $procurementRequest)
    {
        $procurementRequest->load(['venue', 'requester', 'approver', 'items.item']);

        // Check authorization
        if (!auth()->user()->isSuperAdmin() && $procurementRequest->requested_by !== auth()->id()) {
            abort(403, 'You can only view your own requests.');
        }

        return Inertia::render('procurement-requests/show', [
            'request' => $procurementRequest,
            'canApprove' => auth()->user()->isSuperAdmin() && $procurementRequest->status === ProcurementRequest::STATUS_PENDING,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProcurementRequest $procurementRequest)
    {
        if (!auth()->user()->isSuperAdmin()) {
            abort(403, 'Only super admins can approve requests.');
        }

        $request->validate([
            'status' => 'required|in:approved,rejected',
            'notes' => 'nullable|string',
        ]);

        if ($procurementRequest->status !== ProcurementRequest::STATUS_PENDING) {
            return back()->with('error', 'Request sudah diproses sebelumnya.');
        }

        // Check stock availability for approval
        if ($request->status === 'approved') {
            foreach ($procurementRequest->items as $requestItem) {
                $availableStock = $requestItem->item->getAvailableStock();
                if ($availableStock < $requestItem->quantity) {
                    return back()->with('error', 
                        "Stok tidak mencukupi untuk item {$requestItem->item->name}. " .
                        "Tersedia: {$availableStock}, Diminta: {$requestItem->quantity}"
                    );
                }
            }

            // Reduce stock for approved items
            foreach ($procurementRequest->items as $requestItem) {
                $requestItem->item->decrement('stock_quantity', $requestItem->quantity);
            }
        }

        $procurementRequest->update([
            'status' => $request->status,
            'approved_by' => auth()->id(),
            'approved_at' => now(),
            'notes' => $request->notes,
        ]);

        $statusText = $request->status === 'approved' ? 'disetujui' : 'ditolak';
        
        return back()->with('success', "Permintaan berhasil {$statusText}.");
    }
}