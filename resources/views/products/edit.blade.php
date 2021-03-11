@extends('layouts.base')

@section('title', 'Products List')

@section('content')

    <div class="container mainpage">
        
        <products-edit :product-id="{{ $id }}"></products-edit>
        
    </div>
@endsection
