<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    public $fillable = ['name', 'price', 'free', 'provider_plan_id'];

    public function parameters() {
        return $this->hasOne(PlanParameter::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function isFree()
    {
        return $this->free;
    }

    // public function serviceProvider() {
    //     return $this->hasMany(ServiceProvider::class);
    // }
}
