<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentProvider extends Model
{
    public $fillable = ['name'];

    public function customers() {
        return $this->hasMany(PaymentProviderCustomer::class);
    }
}
