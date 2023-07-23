<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Destination;
use App\Models\FlightStatus;
use App\Models\Plane;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flight>
 */
class FlightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departureTime = fake()->dateTimeBetween('now', '+2 days');
        $arrivalTime = fake()->dateTimeBetween($departureTime, '+4 day');

        return [
            'flight_number' => fake()->unique()->regexify('[A-Z]{2}\d{3}'),
            'departure_time' => $departureTime,
            'arrival_time' => $arrivalTime,
            'airline' => fake()->company(),
            'is_international' => fake()->boolean(30),
            'flight_status_id' => FlightStatus::pluck('id')->random(),
            'departure_destination_id' => Destination::pluck('id')->random(),
            'arrival_destination_id' => Destination::pluck('id')->random(),
            'plane_id' => Plane::pluck('id')->random(),
        ];
    }
}
