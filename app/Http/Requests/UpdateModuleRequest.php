<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateModuleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'display_name' => 'nullable|string|max:255',
            'area_id' => 'nullable|exists:areas,id',
            'user_ids' => 'nullable|array',
            'user_ids.*' => 'exists:users,id'
        ];
    }

    public function attributes()
    {
        return [
            'area_id' => 'area'
        ];
    }
}
