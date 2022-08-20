<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    public $fillable = ['name', 'price', 'status', 'service_provider_id', 'duration'];
    public $timestamps = false;

    public function employees() {
        return $this->belongsToMany(Employee::class, 'employee_services')->withPivot('service_provider_id');
    }

    public function provider() {
        return $this->belongsTo(\App\ServiceProvider::class);
    }
}
