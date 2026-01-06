<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UpdateController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ImageController;

// Public Routes (No Authentication Required)
Route::get('/updates', [UpdateController::class, 'index']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::get('/images', [ImageController::class, 'index']);

// Authentication Routes
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Authentication Required)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Admin - Updates
    Route::get('/admin/updates', [UpdateController::class, 'adminIndex']);
    Route::post('/updates', [UpdateController::class, 'store']);
    Route::put('/updates/{id}', [UpdateController::class, 'update']);
    Route::delete('/updates/{id}', [UpdateController::class, 'destroy']);
    
    // Admin - Certificates
    Route::get('/admin/certificates', [CertificateController::class, 'adminIndex']);
    Route::post('/certificates', [CertificateController::class, 'store']);
    Route::put('/certificates/{id}', [CertificateController::class, 'update']);
    Route::delete('/certificates/{id}', [CertificateController::class, 'destroy']);
    
    // Admin - Images
    Route::post('/images', [ImageController::class, 'store']);
    Route::delete('/images/{id}', [ImageController::class, 'destroy']);
});