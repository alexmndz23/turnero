<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = [
        'name',
        'display_name',
        'area_id'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }
}
