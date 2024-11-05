<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserInfoRequest;
use App\Http\Requests\UpdateUserPasswordRequest;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('User/Index', [
            'users' => User::with(['module.area'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        User::create([
            'name' => $request->validated()['name'],
            'email' => $request->validated()['email'],
            'password' => Hash::make($request->validated()['password']),
        ]);

        return to_route('user.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return inertia('User/Edit', [
            'user' => User::with(['module.area'])->findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_info(UpdateUserInfoRequest $request, string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->update($request->validated());

            return redirect()->back()->with('success', 'User updated');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'User not found');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Unexpected error');
        }
    }

    public function update_password(UpdateUserPasswordRequest $request, string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->update([
                'password' => Hash::make($request->validated()['new_password']),
            ]);

            return redirect()->back()->with('success', 'Password updated.');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'User not found.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Unexpected error.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return to_route('user.index');
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function reset_password(Request $request, $id) {}
}
