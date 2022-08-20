<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

use Ramsey\Uuid\Uuid;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $name = $data['first_name']." ".$data["last_name"];

        $usr = User::create([
            'name' => $name,
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $sp = new \App\ServiceProvider();
        $sp->first_name = $data['first_name'];
        $sp->last_name = $data['last_name'];
        $sp->email = $usr->email;
        $sp->main_user_id = $usr->id;
        $sp->app_code = (string) Uuid::uuid4();
        $sp->secret = (string) Uuid::uuid4();
        $sp->tz_offset = 7200;

        $sp->save();
        
        $employee = new \App\Employee();

        $employee->user_id = $usr->id;
        $employee->service_provider_id = $sp->id;
        $employee->allow_login = true;
        $employee->allow_add = true;
        $employee->visible = false;
        $employee->position = 'Owner';
        $employee->first_name = '[Administrator] '.$data['first_name'];
        $employee->last_name = $data['last_name'];
        $employee->admin = 1;
        $employee->phone = $data['phone'];

        $employee->save();

        foreach([1,2,3,4,5] as $day) {
            \App\Worktime::create([
                "day" => $day,
                "from" => "09:00",
                "to" => "18:00",
                "workday" => true,
                "service_provider_id" => $sp->id
            ]);
        }
        
        return $usr;
    }
}
