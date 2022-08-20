<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contacts extends Model
{
    use SoftDeletes;

    public $fillable = ['val', 'type'];
    public $timestamps = false;

    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'customer_contacts');
    }
}
