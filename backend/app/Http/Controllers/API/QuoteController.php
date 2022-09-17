<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class QuoteController extends Controller
{
    public function index(){
        $quotes = [
            'Your code will run',
            'You are the best',
            'do not give up'
        ];
        return response()->json([
            'status' => true,
            'quotes' => $quotes
        ],200);
    }

}
