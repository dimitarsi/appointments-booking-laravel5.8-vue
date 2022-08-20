<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{

    use SoftDeletes;

    public $fillable = ['status', 'plan_id', 'service_provider_id', 'subscription_id', 'paid_through', 'balance', 'plan_id_on_cancel'];

    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProvider::class);
    }

    public function plan() 
    {
        return $this->belongsTo(Plan::class);
    }
}
