<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::orderBy('created_at', 'desc')->get();
        return response()->json($images);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file_name' => 'required|string',
            'file_path' => 'required|string',
            'file_type' => 'nullable|string',
            'file_size' => 'nullable|integer',
        ]);

        $image = Image::create($validated);

        return response()->json($image, 201);
    }

    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }
}