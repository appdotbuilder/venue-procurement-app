<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $items = [
            ['name' => 'Kursi Tamu', 'unit' => 'pcs'],
            ['name' => 'Meja Bulat', 'unit' => 'pcs'],
            ['name' => 'Taplak Meja', 'unit' => 'pcs'],
            ['name' => 'Bunga Dekorasi', 'unit' => 'set'],
            ['name' => 'Sound System', 'unit' => 'set'],
            ['name' => 'Lighting', 'unit' => 'set'],
            ['name' => 'Backdrop', 'unit' => 'pcs'],
            ['name' => 'Karpet Aisle', 'unit' => 'pcs'],
            ['name' => 'Standing AC', 'unit' => 'pcs'],
            ['name' => 'Genset', 'unit' => 'pcs'],
        ];

        $item = fake()->randomElement($items);

        return [
            'name' => $item['name'],
            'description' => fake()->sentence(),
            'unit' => $item['unit'],
            'stock_quantity' => fake()->numberBetween(10, 100),
        ];
    }
}