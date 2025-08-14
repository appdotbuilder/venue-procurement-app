<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\ProcurementRequest;
use App\Models\ProcurementRequestItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementRequestItem>
 */
class ProcurementRequestItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'procurement_request_id' => ProcurementRequest::factory(),
            'item_id' => Item::factory(),
            'quantity' => fake()->numberBetween(1, 20),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}