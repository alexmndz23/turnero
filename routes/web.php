<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TurnStationController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'password.changed'])->name('dashboard');

Route::middleware(['auth', 'password.changed'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/module', [ModuleController::class, 'index'])->name('module.index');
    Route::post('/module', [ModuleController::class, 'store'])->name('module.store');
    Route::patch('/module/{id}', [ModuleController::class, 'update'])->name('module.update');
    Route::delete('/module/{id}', [ModuleController::class, 'destroy'])->name('module.destroy');

    Route::get('/area', [AreaController::class, 'index'])->name('area.index');
    Route::post('/area', [AreaController::class, 'store'])->name('area.store');
    Route::patch('/area/{id}', [AreaController::class, 'update'])->name('area.update');
    Route::delete('/area/{id}', [AreaController::class, 'destroy'])->name('area.destroy');

    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::get('/user/edit/{id}', [UserController::class, 'edit'])->name('user.edit');
    Route::patch('/user/update-info/{id}', [UserController::class, 'update_info'])->name('user.update_info');
    Route::patch('/user/update-password/{id}', [UserController::class, 'update_password'])->name('user.update_password');
    Route::post('/user', [UserController::class, 'store'])->name('user.store');

    Route::get('/turn-station', [TurnStationController::class, 'index'])->name('turn_station.index');
    Route::post('/turn-station', [TurnStationController::class, 'store'])->name('turn_station.store');
    Route::patch('/turn-station/{id}', [TurnStationController::class, 'update'])->name('turn_station.update');
    Route::delete('/turn-station/{id}', [TurnStationController::class, 'destroy'])->name('turn_station.destroy');
});

require __DIR__ . '/auth.php';
