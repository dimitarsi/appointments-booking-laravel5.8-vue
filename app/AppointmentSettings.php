<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class AppointmentSettings extends Model
{
    use Notifiable;

    public $fillable = [
        'service_provider_id',
        'mon','mon_from','mon_to',
        'thu','thu_from','thu_to',
        'wed','wed_from','wed_to',
        'tur','tur_from','tur_to',
        'fri','fri_from','fri_to',
        'sat','sat_from','sat_to',
        'sun','sun_from','sun_to'
    ];
}
