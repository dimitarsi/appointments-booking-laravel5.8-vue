<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;

class AppointmentCanceled extends Mailable
{
    use Queueable, SerializesModels;


    protected $data;
    protected $icsFile;
    protected $start;
    protected $mimeType = [
        'mime' => 'text/calendar'
    ];
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
        

        $appointment = $this->data['appointment'];// $this->getAppointment();
        $uuid = $appointment->ics_uuid;

        $this->start = Carbon::parse($appointment->date);
        
        $this->data['date'] = $this->start;
        $this->data['confirm_token'] = $appointment->confirm_token;

        $end = $this->start->copy()->addMinutes($appointment->duration);

        $this->icsFile = new \Klendr\Helpers\IcsCreator([
            'dtstart' => $this->start,
            'dtend' => $end,
            'summary' => 'Klendr generated calendar event',
            'description' => 'Appointment id '.$appointment->id
        ], $uuid, 'CANCELLED');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $date = $this->start;
        $icsFile = $this->icsFile;
        $fileName = 'calendar-'.$date->format('Y-m-d').'.ics';
        $mimeType = $this->mimeType;
        $serviceProviderName = $this->data['service_provider_name'];
        
        $this->subject('Отказан час за '.$date.' при '.$serviceProviderName);

        return $this->view('klendr::mail.canceled')
                    ->with('data', $this->data)
                    ->attachData($icsFile->to_string(), $fileName , $mimeType);
    }
}
