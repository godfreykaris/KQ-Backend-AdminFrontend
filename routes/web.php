<?php

use App\Http\Controllers\DestinationsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlightsController;
use App\Http\Controllers\TicketsController;
use App\Http\Controllers\BookingsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('app');
});

Route::get('/flights', [FlightsController::class, 'index']);

Route::get('/ticket/{ticket_number}', [TicketsController::class, 'show']);

Route::get('/available_destinations/{departure_destination}', [DestinationsController::class, 'show']);

Route::post('/bookings', [BookingsController::class, 'store'])->name('bookings.store');