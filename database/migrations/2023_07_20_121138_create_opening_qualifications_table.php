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
        Schema::create('opening_qualifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('opening_id')->constrained('openings')->onDelete('cascade');
            $table->foreignId('qualification_id')->constrained('qualifications')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opening_qualifications');
    }
};
