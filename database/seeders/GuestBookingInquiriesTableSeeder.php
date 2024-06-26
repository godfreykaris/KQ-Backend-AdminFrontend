<?php

namespace Database\Seeders;

use App\Models\BookingInquiryType;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuestBookingInquiriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        [
            'name' => fake()->name,
            'email' => fake()->email,
            'user_id' => User::pluck('id')->random(),
            'booking_inquiry_type_id' => BookingInquiryType::pluck('id')->random(),
            'subject' => fake()->sentence,
            'message' => fake()->paragraph,
        ];
    }
}
