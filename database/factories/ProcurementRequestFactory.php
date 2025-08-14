<?php

namespace Database\Factories;

use App\Models\ProcurementRequest;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementRequest>
 */
class ProcurementRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['pending', 'approved', 'rejected']);
        $requestedBy = User::factory();
        $approvedBy = null;
        $approvedAt = null;

        if ($status !== 'pending') {
            $superAdmin = User::where('role', User::ROLE_SUPER_ADMIN)->first();
            $approvedBy = $superAdmin ? $superAdmin->id : User::factory(['role' => User::ROLE_SUPER_ADMIN]);
            $approvedAt = fake()->dateTimeBetween('-1 month', 'now');
        }

        return [
            'venue_id' => Venue::factory(),
            'requested_by' => $requestedBy,
            'request_date' => fake()->dateTimeBetween('now', '+3 months'),
            'status' => $status,
            'notes' => fake()->optional()->paragraph(),
            'approved_by' => $approvedBy,
            'approved_at' => $approvedAt,
        ];
    }
}