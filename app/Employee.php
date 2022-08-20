<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    public $fillable = ['service_provider_id', 'first_name', 'last_name', 'position', 'unavailable', 'visible', 'unavailable_after', 'unavailable_until', 'allow_login', 'allow_add', 'phone', 'user_id'];

    static public function scopedAvailable($query, $date)
    {
        $cd = Carbon::create($date);
        $date = $cd->format("Y-D-m");
        return $query->whereRaw("visible = 1 AND (unavailable = 0 OR ( unavailable_until > '".$date."' OR '".$date."' < unavailable_after ) )");
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scheduledAppointments()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'employee_services')->withPivot('service_provider_id');
    }
}
