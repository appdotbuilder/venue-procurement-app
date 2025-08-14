<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProcurementRequestItem
 *
 * @property int $id
 * @property int $procurement_request_id
 * @property int $item_id
 * @property int $quantity
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Item $item
 * @property-read \App\Models\ProcurementRequest $procurementRequest
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem whereItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem whereProcurementRequestId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequestItem whereUpdatedAt($value)
 * @method static \Database\Factories\ProcurementRequestItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ProcurementRequestItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'procurement_request_id',
        'item_id',
        'quantity',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the procurement request that owns the item.
     */
    public function procurementRequest(): BelongsTo
    {
        return $this->belongsTo(ProcurementRequest::class);
    }

    /**
     * Get the item that owns the procurement request item.
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}