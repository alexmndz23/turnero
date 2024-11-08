<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TurnStation extends Model
{
    protected $fillable = [
        'name',
        'description',
        'location'
    ];
}
