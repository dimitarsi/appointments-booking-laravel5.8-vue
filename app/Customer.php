<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    public $fillable = ['first_name', 'last_name', 'gender', 'service_provider_id'];

    public function contacts() {
        return $this->belongsToMany(Contacts::class, 'customer_contacts');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProvider::class, 'service_provider_id', 'id');
    }
}
