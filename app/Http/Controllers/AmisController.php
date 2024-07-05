<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AmisController extends Controller
{
    public function amis()
    {
        return Inertia::render('Page_Front/Amis');
    }
}
