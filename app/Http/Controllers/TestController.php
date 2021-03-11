<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {    

        return view('products.index');
    }

    public function edit($id){
        return view('products.edit', compact('id'));
    }

}
