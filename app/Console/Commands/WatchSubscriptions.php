<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class WatchSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscriptions:watch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'What if any subscription is passed it paid_through date and it is canceled. If so delete the subscription';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //$defaultPlan = \App\Plan::where('free', 1)->first();
        $passed = \App\Subscription::whereRaw("status = 'canceled' AND paid_through < NOW()")->limit(500)->get();

        $passedCount = $passed->count();
        $this->line("Total $passedCount passed subscriptions");

        foreach($passed as $subs) {
            $subs->delete();
            \App\Subscription::create([
                'plan_id' => $subs->plan_id_on_cancel,
                'service_provider_id' => $subs->service_provider_id,
                'status' => 'active'
            ]);
        }
    }
}
