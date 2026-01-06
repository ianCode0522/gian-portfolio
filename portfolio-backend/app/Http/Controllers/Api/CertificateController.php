<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    // Public: Get all visible certificates
    public function index()
    {
        $certificates = Certificate::where('is_visible', true)
            ->orderBy('issue_date', 'desc')
            ->get();

        return response()->json($certificates);
    }

    // Admin: Get all certificates
    public function adminIndex()
    {
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        return response()->json($certificates);
    }

    // Admin: Create certificate
    public function store(Request $request)
    {
        $validated = $request->validate([
            'certificate_name' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'certificate_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
            'issue_date' => 'required|date',
            'certificate_number' => 'nullable|string',
            'score' => 'nullable|string',
            'skills_covered' => 'nullable|string',
            'description' => 'nullable|string',
            'is_visible' => 'nullable|boolean',
        ]);

        // Handle file upload
        if ($request->hasFile('certificate_image')) {
            $file = $request->file('certificate_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('certificates', $filename, 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        // Remove certificate_image from validated data before saving
        unset($validated['certificate_image']);
        
        // Set default visibility if not provided
        if (!isset($validated['is_visible'])) {
            $validated['is_visible'] = true;
        }

        $certificate = Certificate::create($validated);

        return response()->json($certificate, 201);
    }

    // Admin: Update certificate
    public function update(Request $request, $id)
    {
        $certificate = Certificate::findOrFail($id);

        $validated = $request->validate([
            'certificate_name' => 'sometimes|string|max:255',
            'full_name' => 'sometimes|string|max:255',
            'issuer' => 'sometimes|string|max:255',
            'certificate_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'issue_date' => 'sometimes|date',
            'certificate_number' => 'nullable|string',
            'score' => 'nullable|string',
            'skills_covered' => 'nullable|string',
            'description' => 'nullable|string',
            'is_visible' => 'nullable|boolean',
        ]);

        // Handle file upload if new image provided
        if ($request->hasFile('certificate_image')) {
            // Delete old image if exists
            if ($certificate->image_path) {
                $oldPath = str_replace('/storage/', '', $certificate->image_path);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $file = $request->file('certificate_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('certificates', $filename, 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        // Remove certificate_image from validated data before saving
        unset($validated['certificate_image']);
        
        $certificate->update($validated);

        return response()->json($certificate);
    }

    // Admin: Delete certificate
    public function destroy($id)
    {
        $certificate = Certificate::findOrFail($id);
        
        // Delete image file if exists
        if ($certificate->image_path) {
            $oldPath = str_replace('/storage/', '', $certificate->image_path);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }
        
        $certificate->delete();

        return response()->json(['message' => 'Certificate deleted successfully']);
    }
}