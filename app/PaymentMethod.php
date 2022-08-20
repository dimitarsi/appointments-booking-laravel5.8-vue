<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property Numeric $service_provider_id
 * @property String $payment_provider_method_type
 * @property String $payment_provider_method_id
 * @property String $payment_provider_method_token
 */
class PaymentMethod extends Model
{
    public $fillable = ['service_provider_id', 'payment_provider_method_type', 'payment_provider_method_id', 'payment_provider_method_token', 'identifier'];


    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProvider::class);
    }
}
