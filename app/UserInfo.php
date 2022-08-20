<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    public $fillable = ['user_id', 'domain', 'uuid'];
}
