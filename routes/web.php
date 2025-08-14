<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProcurementRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Procurement Request routes
    Route::resource('procurement-requests', ProcurementRequestController::class)
        ->names([
            'index' => 'procurement-requests.index',
            'show' => 'procurement-requests.show',
            'create' => 'procurement-requests.create',
            'store' => 'procurement-requests.store',
            'edit' => 'procurement-requests.edit',
            'update' => 'procurement-requests.update',
            'destroy' => 'procurement-requests.destroy',
        ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';