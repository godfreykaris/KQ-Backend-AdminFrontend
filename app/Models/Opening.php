<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opening extends Model
{
    use HasFactory;

    // Define the relationships with qualifications and skills
    public function qualifications()
    {
        return $this->belongsToMany(Qualification::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }

    // Method to get matching employees
    public function getMatchingEmployees()
    {
        // Retrieve employees who have all the required qualifications
        $matchingEmployees = Employee::whereHas('qualifications', function ($query) {
            $query->whereIn('qualifications.id', $this->qualifications()->pluck('qualifications.id'));
        });

        // Retrieve employees who have all the required skills
        $matchingEmployees = $matchingEmployees->whereHas('skills', function ($query) {
            $query->whereIn('skills.id', $this->skills()->pluck('skills.id'));
        });

        // Retrieve the final list of matching employees
        return $matchingEmployees->get();
    }
}
