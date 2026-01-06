<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Update;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    // Public: Get all published updates
    public function index()
    {
        $updates = Update::where('published', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($updates);
    }

    // Admin: Get all updates (including unpublished)
    public function adminIndex()
    {
        $updates = Update::orderBy('created_at', 'desc')->get();
        return response()->json($updates);
    }

    // Admin: Create update
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string',
            'image_url' => 'nullable|string',
            'published' => 'boolean',
        ]);

        $update = Update::create($validated);

        return response()->json($update, 201);
    }

    // Admin: Update update
    public function update(Request $request, $id)
    {
        $update = Update::findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'category' => 'nullable|string',
            'image_url' => 'nullable|string',
            'published' => 'boolean',
        ]);

        $update->update($validated);

        return response()->json($update);
    }

    // Admin: Delete update
    public function destroy($id)
    {
        $update = Update::findOrFail($id);
        $update->delete();

        return response()->json(['message' => 'Update deleted successfully']);
    }
}