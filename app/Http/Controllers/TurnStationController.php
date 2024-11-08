<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTurnStationRequest;
use App\Http\Requests\UpdateTurnStationRequest;
use App\Models\TurnStation;
use Exception;
use Illuminate\Http\Request;

class TurnStationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('TurnStation/Index', [
            'turnStations' => TurnStation::all()
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
    public function store(StoreTurnStationRequest $request)
    {
        try {
            TurnStation::create($request->validated());
            return back()->with('success', 'Turn station created');
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
    public function update(UpdateTurnStationRequest $request, string $id)
    {
        try {
            $turnStation = TurnStation::findOrFail($id);
            $turnStation->update($request->validated());
            return back()->with('success', 'Turn station updated');
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
            $turnStation = TurnStation::findOrFail($id);
            $turnStation->delete();
            return back()->with('success', 'Turn station deleted');
        } catch (Exception $e) {
            return back()->with('error', 'Unexpected error');
        }
    }
}
