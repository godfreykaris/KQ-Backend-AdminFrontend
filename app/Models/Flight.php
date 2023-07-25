<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_number',
        'airline',
        'plane_id',
        'is_international'
        
    ];

    // Event listener for when a flight is created
    protected static function booted()
    {
        static::created(function ($flight) {
            // Get the plane associated with the flight
            $plane = $flight->plane;

            // Replicate seats from the plane to the seats table
            $seats = $plane->seats->map(function ($seat) use ($flight) {
                return [
                    'seat_number' => $seat->seat_number,
                    'is_available' => $seat->is_available,
                    'price' => $seat->price,
                    'plane_id' => null, // Set plane_id to null for seats associated with a flight
                    'flight_id' => $flight->id,
                    'flight_class_id' => $seat->flight_class_id,
                    'location_id' => $seat->location_id,
                ];
            });

            // Insert replicated seats into the seats table
            Seat::insert($seats->toArray());
        });

        
    }

    // Define the relationship with the Plane model
    public function plane()
    {
        return $this->belongsTo(Plane::class);
    }
}
