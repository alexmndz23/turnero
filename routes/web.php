<?php

use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
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
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/module', [ModuleController::class, 'index'])->name('module.index');
    Route::post('/module', [ModuleController::class, 'store'])->name('module.store');
    Route::patch('/module/{id}', [ModuleController::class, 'update'])->name('module.update');
    Route::delete('/module/{id}', [ModuleController::class, 'destroy'])->name('module.destroy');

    Route::get('/user', [UserController::class, 'index'])->name('user.index');
});

require __DIR__.'/auth.php';
