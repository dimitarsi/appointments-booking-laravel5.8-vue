<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use DB;

class AccessToken extends Model
{
    public $fillable = ['service_provider_id', 'preview'];
    
    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProvider::class);
    }
}