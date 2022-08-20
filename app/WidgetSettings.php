<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class WidgetSettings extends Model
{
    use Notifiable;

    public $fillable = ['params', 'service_provider_id'];
}
