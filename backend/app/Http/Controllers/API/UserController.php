<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\GenerateTokenRequest;
use App\Models\RefreshToken;

class UserController extends Controller
{
    public function logout(){
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out'
        ],200);
    }


    public function user(){
        $user = auth()->user();
        return response()->json([
            'status'=> true,
            'user' => $user,
        ]);
    }

    public function generateRefreshToken(User $user){
        $bytes = random_bytes(20);
        $check = RefreshToken::where('user_id', $user->id)->first();
        if($check){
            return $check;
        }else{
            $refresh_token = new RefreshToken();
            $refresh_token->user_id = $user->id;
            $refresh_token->token = bin2hex($bytes);
            $refresh_token->save();
            return $refresh_token;
        }
    }

    public function generateAccessTokenFromRefreshToken(GenerateTokenRequest $request){
        $user_id = RefreshToken::where('token', $request->refresh_token)->first('user_id');
        if($user_id){
            $user = User::where('id', $user_id->user_id)->first();
            if($user){
                $user->tokens()->delete();
                $token =  $user->createToken($user->email)->accessToken;
                return response()->json([
                    'status'=> true,
                    'token' => $token,
                    'user' => $user,
                    'refresh_token' => $user->refresh_token->token
                ], 200);
            }else{
                return response()->json([
                    'status'=> false,
                    'message' => "Access Token cannot be generated"
                ], 403);
            }
        }else{
            return response()->json([
                'status'=> false,
                'message' => "Access Token cannot be generated"
            ], 401);
        }
    }

    public function store(CreateUserRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        $token =  $user->createToken($user->email)->accessToken;
        $refresh_token = $this->generateRefreshToken($user);
        return response()->json([
            'status'=> true,
            'user' => $user,
            'token' => $token,
            'refresh_token' => $refresh_token->token
        ],200);

    }

    public function login(LoginRequest $request){
        if(auth()->attempt(['email' => $request->email, 'password' => $request->password])){
            $user = auth()->user();
            $user->tokens()->delete();
            $token =  $user->createToken($user->email)->accessToken;
            return response()->json([
                'status'=> true,
                'token' => $token,
                'user' => $user,
                'refresh_token' => $user->refresh_token->token
            ], 200);
        }
        else{
            return response()->json([
                'status'=> false,
                'error'=>'Unauthorised'
            ], 401);
        }
    }

}
