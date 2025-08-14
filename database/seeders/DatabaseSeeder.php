<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\ProcurementRequest;
use App\Models\ProcurementRequestItem;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users
        $superAdmin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'role' => User::ROLE_SUPER_ADMIN,
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => User::ROLE_ADMIN,
        ]);

        // Create additional users
        User::factory(5)->create(['role' => User::ROLE_ADMIN]);
        User::factory(2)->create(['role' => User::ROLE_SUPER_ADMIN]);

        // Create venues
        Venue::factory()->create([
            'name' => 'Grand Ballroom Permata',
            'address' => 'Jl. Sudirman No. 123, Jakarta Pusat',
            'description' => 'Ballroom mewah dengan kapasitas 500 tamu, dilengkapi dengan sound system dan lighting profesional.',
            'status' => 'active',
        ]);

        Venue::factory()->create([
            'name' => 'Garden Paradise Wedding',
            'address' => 'Jl. Kemang Raya No. 456, Jakarta Selatan',
            'description' => 'Venue outdoor dengan konsep garden party yang romantis.',
            'status' => 'active',
        ]);

        Venue::factory(8)->create();

        // Create items
        $weddingItems = [
            ['name' => 'Kursi Tamu Putih', 'unit' => 'pcs', 'stock' => 500],
            ['name' => 'Meja Bulat Diameter 180cm', 'unit' => 'pcs', 'stock' => 50],
            ['name' => 'Taplak Meja Satin Putih', 'unit' => 'pcs', 'stock' => 60],
            ['name' => 'Bunga Dekorasi Mawar Putih', 'unit' => 'set', 'stock' => 30],
            ['name' => 'Sound System Outdoor', 'unit' => 'set', 'stock' => 10],
            ['name' => 'Lighting LED Wedding', 'unit' => 'set', 'stock' => 15],
            ['name' => 'Backdrop Minimalis Modern', 'unit' => 'pcs', 'stock' => 8],
            ['name' => 'Karpet Aisle Runner', 'unit' => 'pcs', 'stock' => 12],
            ['name' => 'Standing AC 2.5 PK', 'unit' => 'pcs', 'stock' => 20],
            ['name' => 'Genset 50 KVA', 'unit' => 'pcs', 'stock' => 5],
            ['name' => 'Canopy Dekorasi', 'unit' => 'pcs', 'stock' => 10],
            ['name' => 'Vas Bunga Crystal', 'unit' => 'pcs', 'stock' => 40],
        ];

        foreach ($weddingItems as $item) {
            Item::factory()->create([
                'name' => $item['name'],
                'unit' => $item['unit'],
                'stock_quantity' => $item['stock'],
                'description' => 'Item untuk keperluan pernikahan dan acara khusus',
            ]);
        }

        // Create procurement requests with items
        $venues = Venue::all();
        $items = Item::all();
        $users = User::where('role', User::ROLE_ADMIN)->get();

        foreach ($venues->take(5) as $venue) {
            $request = ProcurementRequest::factory()->create([
                'venue_id' => $venue->id,
                'requested_by' => $users->random()->id,
            ]);

            // Add 3-5 items to each request
            $requestItems = $items->random(random_int(3, 5));
            foreach ($requestItems as $item) {
                ProcurementRequestItem::factory()->create([
                    'procurement_request_id' => $request->id,
                    'item_id' => $item->id,
                    'quantity' => random_int(1, 10),
                ]);
            }
        }
    }
}