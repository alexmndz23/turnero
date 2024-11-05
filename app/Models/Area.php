<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $fillable = [
        'name',
        'display_name'
    ];

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}
