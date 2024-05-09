<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
       // $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Error al iniciar sesion, Email o contraseña podrian no estar correctos'], 401);
        }
        
        return $this->respondWithToken($token);
        //return response()->json(['message'=>"User logged"],200);

    }

    public function signup(Request $request){
        try {
            $validated = $request->validate([
                'name'=>'required',
                'email'=>'required|email|unique:users',
                'password'=>'required',
                'password_confirmation'=>'required|same:password'
            ]);
            
            $userData = User::create($request->except('password_confirmation'));
            return response()->json(['message'=>"User Added",'userData'=>$userData],200);
        } catch (ValidationException $e) {
            // Manejar la excepción de validación aquí
            return response()->json(['error' => "El email ya se encuentra registrado."], 422);
        }
    }

    public function getUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user], 200);
    
    }
    public function getAllUser()
{
    $users = User::all();

    if ($users->isEmpty()) {
        return response()->json(['error' => 'No users found'], 404);
    }

    return response()->json(['users' => $users], 200);
}

    public function updateUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

       // Validar si el archivo fue enviado
        if ($request->hasFile('file')) {
            // Obtener el archivo de la solicitud
            $file = $request->file('file');
            // Generar un nombre único para el archivo
            $fileName = uniqid('file_') . '.' . $file->getClientOriginalExtension();

            // Guardar el archivo en el directorio deseado
            $file->storeAs('public/files', $fileName);

            // Devolver la ruta del archivo guardado
            $filePath = 'files/' . $fileName;
            $user->foto = $fileName;
        }

         // Eliminar valores en blanco del request
        $data = array_filter($request->except(['email', 'file']), function ($value) {
            return $value !== null && $value !== '';
        });


        $user->update($request->except('email'));

        return response()->json(['message' => 'User updated', 'user' => $user], 200);
    }

    public function saveFile(Request $request)
{
    // Validar si el archivo fue enviado
    if ($request->hasFile('file')) {
        // Obtener el archivo de la solicitud
        $file = $request->file('file');
        // Generar un nombre único para el archivo
        $fileName = uniqid('file_') . '.' . $file->getClientOriginalExtension();

        // Guardar el archivo en el directorio deseado
$file->storeAs('/imagenes', $fileName);

// Devolver la ruta del archivo guardado
$filePath = 'imagenes/' . $fileName;

        
        return response()->json(['message' => 'File saved', 'file_path' => $filePath], 200);
    } else {
        return response()->json(['error' => 'No file uploaded'], 400);
    }
}



    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
    
}
