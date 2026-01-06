<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'certificate_name',
        'full_name',
        'issuer',
        'image_path',
        'issue_date',
        'certificate_number',
        'score',
        'skills_covered',
        'description',
        'is_visible',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'is_visible' => 'boolean',
    ];
}