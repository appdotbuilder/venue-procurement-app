<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Item
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $unit
 * @property int $stock_quantity
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProcurementRequestItem> $procurementRequestItems
 * @property-read int|null $procurement_request_items_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Item newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Item newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Item query()
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereStockQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereUpdatedAt($value)
 * @method static \Database\Factories\ItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'unit',
        'stock_quantity',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'stock_quantity' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the procurement request items for the item.
     */
    public function procurementRequestItems(): HasMany
    {
        return $this->hasMany(ProcurementRequestItem::class);
    }

    /**
     * Check if requested quantity is available in stock.
     */
    public function hasAvailableStock(int $requestedQuantity): bool
    {
        return $this->stock_quantity >= $requestedQuantity;
    }

    /**
     * Get available stock after pending requests.
     */
    public function getAvailableStock(): int
    {
        $pendingQuantity = $this->procurementRequestItems()
            ->whereHas('procurementRequest', function ($query) {
                $query->where('status', 'pending');
            })
            ->sum('quantity');

        return $this->stock_quantity - $pendingQuantity;
    }
}