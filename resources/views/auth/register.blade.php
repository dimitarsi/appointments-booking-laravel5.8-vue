@extends('layouts.auth')

@section('form')
    <div class="heading">{{__('Register')}}</div>
    <form method="POST" action="{{ route('register') }}">
        @csrf
        @if($errors->count())
        <div class="row">
            <div class="col">
                @if ($errors->has('first_name'))
                    <div class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('first_name') }}</strong>
                    </div>
                @endif
                @if ($errors->has('last_name'))
                    <div class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('last_name') }}</strong>
                    </div>
                @endif
                @if ($errors->has('email'))
                    <div class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('email') }}</strong>
                    </div>
                @endif
                @if ($errors->has('phone'))
                    <div class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('phone') }}</strong>
                    </div>
                @endif
                @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>
        </div>
        @endif
        <div class="row">
            <div class="col">
                <label for="name" class="label">{{ __('First Name') }}</label>
                <div class="col-fill-content">
                    <input id="name" type="text" class="form-control{{ $errors->has('first_name') ? ' is-invalid' : '' }}" name="first_name" value="{{ old('first_name') }}" required autofocus>
                </div>
            </div>
            <div class="col">
                <label for="name" class="label">{{ __('Last Name') }}</label>
                <div class="col-fill-content">
                    <input id="name" type="text" class="form-control{{ $errors->has('last_name') ? ' is-invalid' : '' }}" name="last_name" value="{{ old('last_name') }}" required>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label for="email" class="label">{{ __('E-Mail Address') }}</label>
                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>
            </div>
            <div class="col">
                <label for="phone" class="label">{{ __('Phone') }}</label>
                <input id="phone" type="text" class="form-control{{ $errors->has('phone') ? ' is-invalid' : '' }}" name="phone" required>
            </div>
        </div>
        <div class="row mb-80">
            <div class="col">
                <label for="password" class="label">{{ __('Password') }}</label>
                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
            </div>
            <div class="col">
                <label for="password-confirm" class="label">{{ __('Confirm Password') }}</label>
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <button type="submit" class="btn-reg w-100">
                    {{ __('Register') }}
                </button>
            </div>
            <div class="col">
                <a href="{{ route('login') }}" class="btn btn-link d-block">{{ __('Login') }}</a>
            </div>
        </div>
    </form>
@endsection