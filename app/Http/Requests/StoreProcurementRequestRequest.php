<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProcurementRequestRequest extends FormRequest
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
            'venue_id' => 'required|exists:venues,id',
            'request_date' => 'required|date|after_or_equal:today',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.item_id' => 'required|exists:items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'venue_id.required' => 'Venue harus dipilih.',
            'venue_id.exists' => 'Venue yang dipilih tidak valid.',
            'request_date.required' => 'Tanggal permintaan harus diisi.',
            'request_date.date' => 'Tanggal permintaan harus berupa tanggal yang valid.',
            'request_date.after_or_equal' => 'Tanggal permintaan tidak boleh kurang dari hari ini.',
            'items.required' => 'Minimal satu item harus dipilih.',
            'items.*.item_id.required' => 'Item harus dipilih.',
            'items.*.item_id.exists' => 'Item yang dipilih tidak valid.',
            'items.*.quantity.required' => 'Jumlah item harus diisi.',
            'items.*.quantity.integer' => 'Jumlah harus berupa angka.',
            'items.*.quantity.min' => 'Jumlah minimal adalah 1.',
        ];
    }
}