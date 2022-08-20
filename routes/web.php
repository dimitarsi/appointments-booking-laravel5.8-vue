<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/customer/{slug?}', ['uses' => 'Customer@index']);
// Route::get('/customer/about', ['uses' => 'Customer@index']);

// Route::post('/customer', ['uses' => 'Customer@save']);
// Route::get('/serviceproviders', ['uses' => 'ServiceProviderController@listAll']);
// Route::get('/serviceproviders/{id}', ['uses' => 'ServiceProviderController@index']);
// Route::get('/serviceproviders/{id}/list', ['uses' => 'ServiceProviderController@appointments']);
// Route::post('/serviceproviders/{id}/appointments', ['uses' => 'ServiceProviderController@weekAppointments']);
// Route::post('/serviceprovider', ['uses' => 'ServiceProviderController@save']);

// Route::post('/appointment', ['uses' => 'AppointmentController@save']);
// Route::delete('/appointment/{id}', ['uses' => 'AppointmentController@delete']);

// Route::post('/login', ['uses' => 'ServiceProviderController@login']);
// Route::post('/logout', ['uses' => 'ServiceProviderController@logout']);

// Route::get('/{any}', function () {
//     // return view('welcome');
//     return view('welcome');
// })->where('any', '.*');

Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
