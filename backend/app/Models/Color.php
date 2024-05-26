<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;

    protected $table = 'colors';

    // Aquí puedes especificar los campos que se pueden asignar en masa
    protected $fillable = [
            'color_primario',
            'color_secundario',
            'color_terciario',
            'blanco',
            'negro',
            'font'];

}
