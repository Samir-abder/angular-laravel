<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentarios extends Model
{
    use HasFactory;

    protected $table = 'comentarios';

    // Aquí puedes especificar los campos que se pueden asignar en masa
    protected $fillable = [
            'username',
            'date',
            'text',
            'video_id'
            ];
    public $timestamps = false;
}
