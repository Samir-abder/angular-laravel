<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ShareVideoEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $videoUrl;

    /**
     * Create a new message instance.
     *
     * @param string $videoUrl
     */
    public function __construct($videoUrl)
    {
        $this->videoUrl = $videoUrl;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('Youtubent@correito.com') // Asegúrate de cambiar esto por tu dirección de correo real
                    ->subject('Video Compartido Contigo') // Puedes personalizar el asunto del correo
                    ->view('emails.shareVideo') // Asegúrate de que la vista 'emails.shareVideo' exista en resources/views/emails/shareVideo.blade.php
                    ->with([
                        'videoUrl' => $this->videoUrl,
                    ]);
    }
}