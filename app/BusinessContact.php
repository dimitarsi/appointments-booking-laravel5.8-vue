<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BusinessContact extends Model
{
    public $fillable = ['phone'];
    public $timestamps = false;

    public function owner()
    {
        return $this->belongsToMany(ServiceProvider::class, 'service_provider_business_contacts');
    }
}
