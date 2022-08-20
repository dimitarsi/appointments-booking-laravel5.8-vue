<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentProviderCustomer extends Model
{
    public $fillable = ['payment_provider_id', 'payment_provider_customer_id', 'payment_provider_customer_token'];


    public function provider() {
        return $this->belongsTo(PaymentProvider::class);
    }

    public function serviceProvider() {
        return $this->hasOne(ServiceProvider::class, 'payment_provider_customer_id', 'id');
    }
}
