<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ColorController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('signup',[AuthController::class,'signup']);



Route::group(['middleware' => 'api',], function ($router) {
    Route::post('updateColors',[ColorController::class,'updateColors']);
    Route::get('getColors',[ColorController::class,'getColors']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('getUser',[AuthController::class,'getUser']);
    Route::get('getAllUser',[AuthController::class,'getAllUser']);
    Route::post('updateUser',[AuthController::class,'updateUser']);
    Route::post('saveFile',[AuthController::class,'saveFile']);
    Route::post('video',[VideoController::class,'video']);
    Route::get('getAllVideos',[VideoController::class,'getAllVideos']);
    Route::get('getVideo/{email}',[VideoController::class,'getVideoByEmail']);
    Route::get('getVideoByLink/{link}',[VideoController::class,'getVideoByLink']);
    Route::get('getVideoSearch/{search}',[VideoController::class,'filterVideos']);
    Route::post('/share-video', [VideoController::class, 'shareVideo']);
    Route::post('/comentario', [VideoController::class, 'saveComment']);
    Route::get('getAllCommentsByLink/{link}', [VideoController::class, 'getAllCommentsByLink']);


    // Asegúrate de ajustar el namespace y el middleware según sea necesario
    Route::get('/imagenes/{fileName}', function ($fileName) {
        // Obtener la ruta completa del archivo
        $filePath = storage_path('app/imagenes/' . $fileName);

        // Verificar si el archivo existe
        if (file_exists($filePath)) {
            // Devolver la imagen con el tipo de contenido adecuado
            return response()->file($filePath, ['Content-Type' => 'image/png']);
        } else {
            // Si el archivo no existe, devolver una imagen predeterminada o un error 404
            abort(404);
        }
    });

    #Route::post('logout', [AuthController::class, 'logout']);
    #Route::post('refresh', [AuthController::class, 'refresh']);
    #Route::post('me', [AuthController::class, 'me']);

});
