<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanParameter extends Model
{
    public $fillable = ['plan_id', 'accounts_count', 'pending_appointments_count', 'confirmed_appointments_count', 'days_in_advance', 'web_plugins', 'web_embed', 'emails_sent', 'sms_sent'];

    public function plan() {
        return $this->belongsTo(Plan::class);
    }
}
