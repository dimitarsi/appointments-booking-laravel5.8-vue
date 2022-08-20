<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class ServiceProvider extends Model
{
    use Notifiable;

    public $fillable = ['first_name', 'last_name', 'company', 'email', 'type', 'domain', 'main_user_id', 'payment_provider_customer_id', 'subscription_id', 'tz_offset'];

    public $hidden = ['app_code', 'secret'];

    public function contacts()
    {
        return $this->belongsToMany(BusinessContact::class, 'service_provider_business_contacts');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'main_user_id');
    }

    public function appointmentSettings()
    {
        return $this->hasOne(AppointmentSettings::class);
    }

    public function widgetSettings()
    {
        return $this->hasOne(WidgetSettings::class);
    }

    public function accessToken()
    {
        return $this->hasMany(AccessToken::class);
    }

    public function scopeWithSecret($query, $secret)
    {
        return $query->where('secret', $secret);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class, 'service_provider_id', 'id');
    }

    public function embedSettings()
    {
        return $this->hasOne(EmbedSettings::class);
    }

    public function worktime()
    {
        return $this->hasMany(\App\Worktime::class);
    }

    public function services()
    {
        return $this->hasMany(\App\Service::class);
    }

    // public function plan()
    // {
    //     return $this->belongsTo(Plan::class);
    // }

    public function subscription()
    {
        return $this->hasMany(Subscription::class);
    }

    public function paymentCustomer()
    {
        return $this->belongsTo(PaymentProviderCustomer::class, 'payment_provider_customer_id', 'id');
    }

    public function paymentMethods()
    {
        return $this->hasMany(PaymentMethod::class);
    }

    public function hasPaymentDetails()
    {
        return !empty($this->payment_provider_customer_id);
    }

    public function plan()
    {
        // $subscription = $this->subscription->first();
        // info(json_encode([$subscription, $this->id]));
        $subscription = \App\Subscription::where('service_provider_id', $this->id)->first();
        return $subscription->plan ?? null;
    }
}

