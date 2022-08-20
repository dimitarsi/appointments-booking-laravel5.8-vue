<?php

use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->makeDefaultUser();
        $this->makeAnonymouseCustomer();

        $this->makeImsUser();
    }

    public function makeDefaultUser()
    {
        \App\PaymentProvider::create(['name' => 'braintree']);

        $first_name = "Dimitar";
        $last_name = "Iliev";
        $name = $first_name." ".$last_name;


        $usr = \App\User::create([
            'name' => $name,
            'email' => 'info@dimitarsi.me',
            'password' => Hash::make('123456'),
        ]);

        $plan = new \App\Plan();
        $plan->name ="Default Seed Plan";
        $plan->price = 0;
        $plan->free = 1;
        $plan->provider_plan_id = null;
        $plan->save();

        $plan1 = new \App\Plan();
        $plan1->name = "Small Paid Plan";
        $plan1->price = "10";
        $plan1->provider_plan_id = "nfj2";
        $plan1->free = 0;
        $plan1->save();


        $plan2 = new \App\Plan();
        $plan2->name = "Small Paid Plan";
        $plan2->price = "30";
        $plan2->provider_plan_id = "v28m";
        $plan2->free = 0;
        $plan2->save();

        $plan->parameters()->create([
            'accounts_count' => 3,
            'pending_appointments_count' => 10,
            'confirmed_appointments_count' => 20,
            'days_in_advance' => 10,
            'emails_sent' => 100,
            'sms_sent' => 0,
            'web_embed' => 1,
            'web_plugins' => 1
        ]);

        $plan1->parameters()->create([
            'accounts_count' => 6,
            'pending_appointments_count' => 50,
            'confirmed_appointments_count' => 50,
            'days_in_advance' => 28,
            'emails_sent' => 100,
            'sms_sent' => 0,
            'web_embed' => 1,
            'web_plugins' => 1
        ]);

        $plan2->parameters()->create([
            'accounts_count' => 6,
            'pending_appointments_count' => 100,
            'confirmed_appointments_count' => 100,
            'days_in_advance' => 60,
            'emails_sent' => 100,
            'sms_sent' => 0,
            'web_embed' => 1,
            'web_plugins' => 1
        ]);

        // service provider is assigned after sp is created


        $planParams = new \App\PlanParameter();
        $planParams->accounts_count = 3;
        $planParams->pending_appointments_count = 10;
        $planParams->confirmed_appointments_count = 10;
        $planParams->days_in_advance = 30;
        $planParams->web_embed = 1;
        $planParams->web_plugins = 1;
        $planParams->plan_id = $plan->id;
        $planParams->emails_sent = 20;
        $planParams->sms_sent = 0;
        $planParams->save();

        $sp = new \App\ServiceProvider();
        $sp->first_name = $first_name;
        $sp->last_name = $last_name;
        $sp->email = $usr->email;
        $sp->main_user_id = $usr->id;
        $sp->app_code = (string) Uuid::uuid4();
        $sp->secret = (string) Uuid::uuid4();
        $sp->tz_offset = 7200;

        $sp->save();

        \App\Subscription::create([
            'status' => 'active', 
            'plan_id' => $plan->id,
            'service_provider_id' => $sp->id
        ]);

        $sp->embedSettings()->create([
            'embed_type' => 1,
            'token_url' => '/ajax-admin.php?action="embed_plugin_action"'
        ]);
        
        $employee = new \App\Employee();

        $employee->user_id = $usr->id;
        $employee->service_provider_id = $sp->id;
        $employee->allow_login = true;
        $employee->allow_add = "all";
        $employee->visible = false;
        $employee->position = "Manager";
        $employee->first_name = $sp->name." Admin";
        $employee->last_name = "Employee";
        $employee->admin = 1;
        $employee->phone = '0894386103';

        $employee->save();
        $employees = [];
        foreach([["Dimitar","Iliev"], ["Ilia", "Dimitrov"]] as $i => $employee) {
            $u = new \App\User();
            $u->email = "foo-$i@dimitarsi.me";
            $u->name = $employee[0];
            $u->password = Hash::make('123456');
            $u->save();


            $e = new \App\Employee();
            $e->user_id = $u->id;
            $e->first_name = $employee[0];
            $e->last_name = $employee[1];
            $e->service_provider_id = $sp->id;
            $e->allow_login = true;
            $e->allow_add = "self";
            $e->admin = 0;
            $e->phone = '0894386103';
            $e->visible = true;
            $e->save();
            $employees[] = $e;
        }

        foreach([1,2,3,4,5] as $day) {
            \App\Worktime::create([
                "day" => $day,
                "from" => "09:00",
                "to" => "18:00",
                "workday" => true,
                "service_provider_id" => $sp->id
            ]);
        }

        $sp1 = $sp->services()->create([
            'name' => 'Почистиване на таван',
            'duration' => 120,
            'price' => 100.00,
            'status' => 'available',
        ]);

        $sp2 = $sp->services()->create([
            'name' => 'Профилактика на климатик',
            'duration' => 60,
            'price' => 30.00,
            'status' => 'available',
        ]);

        $sp->services()->create([
            'name' => 'Ремонт на кухненска печка',
            'duration' => 45,
            'price' => 50.00,
            'status' => 'soon',
        ]);

        DB::statement(DB::raw("INSERT into employee_services(service_provider_id, employee_id, service_id) values(?,?,?)"), [
            $sp->id, ($employees[0])->id, $sp1->id
        ]);   

        DB::statement(DB::raw("INSERT into employee_services(service_provider_id, employee_id, service_id) values(?,?,?)"), [
            $sp->id, ($employees[1])->id, $sp2->id
        ]);   
    }

    public function makeAnonymouseCustomer()
    {
        $customer = \App\Customer::create([
            'first_name' => 'Anonymouse',
            'last_name' => 'Anonycat',
            'gender' => 'other',
        ]);

        $customer->contacts()->create([
            'type' => 'phone',
            'val' => 'xxx-xxx-xxxxx'
        ]);
    }

    public function makeImsUser()
    {
        $usr = new \App\ImsUser();
        $usr->active = 1;
        $usr->name  = "Dimitar Il";
        $usr->email = "info@dimitarsi.me";
        $usr->password = Hash::make('123456');

        $usr->save();
    }
}
