<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Color;

class ColorController extends Controller
{
    public function updateColors(Request $request)
    {
        // Borra todos los registros de la tabla 'colors'
        Color::query()->delete();

        // Crea un nuevo registro con los valores recibidos
        $color = new Color([
            'color_primario' => $request->get('color_primario'),
            'color_secundario' => $request->get('color_secundario'),
            'color_terciario' => $request->get('color_terciario'),
            'blanco' => $request->get('blanco'),
            'negro' => $request->get('negro'),
            'font' => $request->get('font'),
        ]);

        $color->save();

        return response()->json('Colors Updated Successfully.');
    }
}
