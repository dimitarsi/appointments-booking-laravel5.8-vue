<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class CalendarInvitation extends Mailable
{
    use Queueable, SerializesModels;


    protected $info;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($info = [])
    {
        $this->info = $info;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        
        $view = $this->view('klendr::mail.calendar');

        $serviceProvider = $this->info['serviceProvider'];
        $subject = $this->info['subject'];
        $content = $this->info['message'];
        $icsFile = $this->info['icsFile'];
        $appointment = $this->info['appointment'];
        $date = \Carbon\Carbon::parse($appointment->date);

        $this->subject($subject);
        $view->with('content', $content);
        $view->attachData($icsFile->to_string(), 'calendar-'.$date->format('Y-m-d').'.ics', [
            'mime' => 'text/calendar'
        ]);
    }
}
