<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Worktime extends Model
{
    public $fillable = ['service_provider_id', 'day', 'from', 'to', 'workday'];

    public $timestamps = false;

    public function serviceProvider()
    {
        return $this->belongsTo(\App\ServiceProvider::class);
    }
}
