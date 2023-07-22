<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->string('flight_number');
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->time('duration')->virtualAs('TIMEDIFF(arrival_time, departure_time)');
            $table->string('airline');
            $table->boolean('is_international')->default(true);
            $table->foreignId('departure_destination_id')->constrained('destinations')->onDelete('cascade');
            $table->foreignId('arrival_destination_id')->constrained('destinations')->onDelete('cascade');
            $table->foreignId('plane_id')->constrained('planes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
