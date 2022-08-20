<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmbedSettings extends Model
{
    public $fillable = ['embed_type', 'token_url', 'create_hook', 'cancel_hook', 'hook_authorization', 'hook_params'];

    public function serviceProvider() {
        return $this->belongsTo(ServiceProvider::class);
    }
}
