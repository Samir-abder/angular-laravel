<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use Illuminate\Support\Facades\Log; // Para el logging de errores

class VideoController extends Controller
{
    public function video(Request $request)
    {
        try {
            // Validar la solicitud
            $request->validate([
                'video' => 'required|mimes:mp4',
                'name' => 'required',
                'email' => 'required|email',
            ]);

            // Inicializamos la variable $videoName para asegurarnos de que está definida antes de usarla
            $videoName = '';

            // Subir el video
            if ($request->hasFile('video')) {
                $video = $request->file('video');
                $videoName = time() . '_' . $video->getClientOriginalName();
                $video->storeAs('public/files', $videoName);
            }

            // Subir la miniatura
            if ($request->hasFile('miniatura')) {
                $miniatura = $request->file('miniatura');
                $miniaturaName = time() . '_' . $miniatura->getClientOriginalName();
                $miniatura->storeAs('public/files', $miniaturaName);
            }

            // Guardar los detalles del video en la base de datos
            Video::create([
                'name' => $request->get('name'),
                'path' => $videoName,
                'email' => $request->get('email'),
                'fecha' => now()->format('Y-m-d'),
                'imagen' => $miniaturaName,
                'link' => now(),
            ]);

            // Retornar una respuesta JSON de éxito
            return response()->json([
                'status' => 'success',
                'message' => 'Video subido exitosamente.',
            ]);

        } catch (\Exception $e) {
            // Loguear el error para revisión
            Log::error('Error al subir el video: ' . $e->getMessage());

            // Retornar una respuesta JSON de error
            return response()->json([
                'status' => 'error',
                'message' => 'Hubo un error al subir el video. Por favor, intenta nuevamente.',
                'details' => $e->getMessage() // Puedes incluir más detalles si es necesario, pero generalmente es mejor no exponer errores técnicos en producción.
            ], 500);
        }
    }
    public function getAllVideos()
    {
        try {
            // Obtener todos los videos de la base de datos
            $videos = Video::all();

            // Retornar una respuesta JSON con los detalles de todos los videos
            return response()->json([
                'status' => 'success',
                'videos' => $videos,
            ]);

        } catch (\Exception $e) {
            // Loguear el error para revisión
            Log::error('Error al obtener todos los videos: ' . $e->getMessage());

            // Retornar una respuesta JSON de error
            return response()->json([
                'status' => 'error',
                'message' => 'Hubo un error al obtener todos los videos. Por favor, intenta nuevamente.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
    public function getVideoByEmail(Request $request, $email)
    {
        try {
            //echo $email;
            // Validar la solicitud
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'El email proporcionado no es válido.',
                ], 400);
            }

            // Obtener el email del request

            // Obtener todos los videos por email
            $video = Video::where('email', $email)->get();

            // Verificar si se encontró el video
            if ($video) {
                // Retornar una respuesta JSON con los detalles del video
                return response()->json([
                    'status' => 'success',
                    'video' => $video,
                ]);
            } else {
                // Retornar una respuesta JSON de error si no se encontró el video
                return response()->json([
                    'status' => 'error',
                    'message' => 'No se encontró ningún video asociado a ese email.',
                ], 404);
            }

        } catch (\Exception $e) {
            // Loguear el error para revisión
            Log::error('Error al obtener el video por email: ' . $e->getMessage());

            // Retornar una respuesta JSON de error
            return response()->json([
                'status' => 'error',
                'message' => 'Hubo un error al obtener el video por email. Por favor, intenta nuevamente.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function filterVideos(Request $request, $search)
    {
        try {
            

            // Buscar videos por nombre o email
            $videos = Video::where('name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%')
                ->get();

            // Retornar una respuesta JSON con los videos encontrados
            return response()->json([
                'status' => 'success',
                'videos' => $videos,
            ]);

        } catch (\Exception $e) {
            // Loguear el error para revisión
            Log::error('Error al filtrar los videos: ' . $e->getMessage());

            // Retornar una respuesta JSON de error
            return response()->json([
                'status' => 'error',
                'message' => 'Hubo un error al filtrar los videos. Por favor, intenta nuevamente.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function getVideoByLink(Request $request, $link)
    {
        try {
            //echo $email;
            
            // Obtener el email del request

            // Obtener todos los videos por email
            $video = Video::where('link', $link)->get();

            // Verificar si se encontró el video
            if ($video) {
                // Retornar una respuesta JSON con los detalles del video
                return response()->json([
                    'status' => 'success',
                    'video' => $video,
                ]);
            } else {
                // Retornar una respuesta JSON de error si no se encontró el video
                return response()->json([
                    'status' => 'error',
                    'message' => 'No se encontró ningún video asociado a ese link.',
                ], 404);
            }

        } catch (\Exception $e) {
            // Loguear el error para revisión
            Log::error('Error al obtener el video por link: ' . $e->getMessage());

            // Retornar una respuesta JSON de error
            return response()->json([
                'status' => 'error',
                'message' => 'Hubo un error al obtener el video por link. Por favor, intenta nuevamente.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

}
