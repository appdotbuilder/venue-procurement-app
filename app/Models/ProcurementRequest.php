<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ProcurementRequest
 *
 * @property int $id
 * @property int $venue_id
 * @property int $requested_by
 * @property string $request_date
 * @property string $status
 * @property string|null $notes
 * @property int|null $approved_by
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $approver
 * @property-read \App\Models\User $requester
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProcurementRequestItem> $items
 * @property-read int|null $items_count
 * @property-read \App\Models\Venue $venue
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereRequestDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereRequestedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereVenueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest pending()
 * @method static \Database\Factories\ProcurementRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ProcurementRequest extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'venue_id',
        'requested_by',
        'request_date',
        'status',
        'notes',
        'approved_by',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'request_date' => 'date',
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include pending requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Get the venue that owns the procurement request.
     */
    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }

    /**
     * Get the user who created the request.
     */
    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    /**
     * Get the user who approved the request.
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get the items for the procurement request.
     */
    public function items(): HasMany
    {
        return $this->hasMany(ProcurementRequestItem::class);
    }

    /**
     * Check if request can be approved based on stock availability.
     */
    public function canBeApproved(): bool
    {
        foreach ($this->items as $requestItem) {
            if (!$requestItem->item->hasAvailableStock($requestItem->quantity)) {
                return false;
            }
        }
        return true;
    }
}