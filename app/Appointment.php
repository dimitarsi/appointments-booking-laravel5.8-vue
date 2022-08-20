<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Appointment extends Model
{
    use SoftDeletes;

    public $fillable = ['customer_id', 'service_provider_id', 'date', 'confirmed', 'duration', 'notes', 'reason', 'service_id', 'ics_uuid'];
    public $attributes = [
        'duration' => 60
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function provider()
    {
        return $this->belongsTo(ServiceProvider::class);
    }

    public function scheduledEmployees()
    {
        return $this->belongsToMany(Employee::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function scopeValidToken(Builder $builder, $token)
    {
        return $builder->where('confirm_token', $token)
                       ->whereRaw('confirm_token_valid_before > NOW()');
    }

    public function scopePending(Builder $query) {
        return $query->whereRaw("date > NOW()");
    }

    public function scopeHasPending(Builder $query) {
        return $query->whereRaw("date > NOW()")->limit(1);
    }

    public static function reasons() {
        return [
            '1' => [
                'text' =>'Не е в удобно за мен време',
            ],
            '2' => [
                'text' => 'Не съм записвал час'
            ],
            '3' => [
                'text' => 'Вече имам записан час ( на друго място )'
            ],
            '4' => [
                'text' => 'Вече имам записан час ( на същото място )'
            ],
            '5' => [
                'text' => 'Нямам нужда  повече'
            ],
            '6' => [
                'text' => 'Невъзможност за изпълнение на часа'
            ]
        ];
    }

}
