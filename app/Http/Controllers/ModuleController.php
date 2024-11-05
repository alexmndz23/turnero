<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreModuleRequest;
use App\Http\Requests\UpdateModuleRequest;
use App\Models\Area;
use App\Models\Module;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Module/Index', [
            'modules' => Module::with(['user', 'area'])->get(),
            'users' => User::with(['module'])->get(),
            'areas' => Area::all()
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
    public function store(StoreModuleRequest $request)
    {
        try {
            Module::create($request->validated());
            return back()->with('success', 'Module created');
        } catch (Exception $e) {
            return back()->with('error', 'Unexpected error');
        }
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModuleRequest $request, string $id)
    {
        try {
            $module = Module::findOrFail($id);
            $module->update($request->validated());

            return back()->with('success', 'Module updated');
        } catch (ModelNotFoundException $e) {
            return back()->with('error', 'Module not found');
        } catch (Exception $e) {
            return back()->with('error', 'Unexpected error');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $module = Module::findOrFail($id);
            $module->delete();

            return back()->with('success', 'Module deleted');
        } catch (ModelNotFoundException $e) {
            return back()->with('error', 'Module not found');
        } catch (Exception $e) {
            return back()->with('error', 'Unexpected error');
        }
    }
}
