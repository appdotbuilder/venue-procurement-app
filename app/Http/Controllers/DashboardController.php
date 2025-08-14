<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\ProcurementRequest;
use App\Models\Venue;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->isSuperAdmin()) {
            $data = [
                'totalRequests' => ProcurementRequest::count(),
                'pendingRequests' => ProcurementRequest::where('status', 'pending')->count(),
                'approvedRequests' => ProcurementRequest::where('status', 'approved')->count(),
                'totalVenues' => Venue::count(),
                'totalItems' => Item::count(),
                'lowStockItems' => Item::where('stock_quantity', '<', 10)->count(),
                'recentRequests' => ProcurementRequest::with(['venue', 'requester'])
                    ->latest()
                    ->take(5)
                    ->get(),
            ];
        } else {
            $data = [
                'myRequests' => ProcurementRequest::where('requested_by', $user->id)->count(),
                'myPendingRequests' => ProcurementRequest::where('requested_by', $user->id)
                    ->where('status', 'pending')
                    ->count(),
                'myApprovedRequests' => ProcurementRequest::where('requested_by', $user->id)
                    ->where('status', 'approved')
                    ->count(),
                'recentRequests' => ProcurementRequest::with(['venue', 'requester'])
                    ->where('requested_by', $user->id)
                    ->latest()
                    ->take(5)
                    ->get(),
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => $data,
            'userRole' => $user->role,
        ]);
    }
}