import React from 'react';
import AppLayout from '@/components/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Venue {
    id: number;
    name: string;
    address: string;
}

interface Item {
    id: number;
    name: string;
    unit: string;
    stock_quantity: number;
}

interface RequestItem {
    item_id: number;
    quantity: number;
    notes: string;
}



interface Props {
    venues: Venue[];
    items: Item[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Permintaan Pengadaan', href: '/procurement-requests' },
    { title: 'Buat Permintaan', href: '/procurement-requests/create' },
];

export default function CreateProcurementRequest({ venues, items }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        venue_id: '',
        request_date: '',
        notes: '',
        items: [{ item_id: 0, quantity: 1, notes: '' }],
    });

    const addItem = () => {
        setData('items', [...data.items, { item_id: 0, quantity: 1, notes: '' }]);
    };

    const removeItem = (index: number) => {
        if (data.items.length > 1) {
            const newItems = data.items.filter((_, i) => i !== index);
            setData('items', newItems);
        }
    };

    const updateItem = (index: number, field: keyof RequestItem, value: string | number) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('items', newItems);
    };

    const getSelectedItem = (itemId: number) => {
        return items.find(item => item.id === itemId);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/procurement-requests');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Permintaan Pengadaan" />
            
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">📝 Buat Permintaan Pengadaan</h1>
                        <p className="text-gray-600">Buat permintaan barang untuk venue pernikahan</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">ℹ️ Informasi Dasar</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Venue <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.venue_id}
                                        onChange={(e) => setData('venue_id', e.target.value || '')}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                            errors.venue_id ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        required
                                    >
                                        <option value="">Pilih Venue</option>
                                        {venues.map((venue) => (
                                            <option key={venue.id} value={venue.id}>
                                                {venue.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.venue_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.venue_id}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tanggal Permintaan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.request_date}
                                        onChange={(e) => setData('request_date', e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                                            errors.request_date ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                    {errors.request_date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.request_date}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Catatan
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    placeholder="Catatan tambahan untuk permintaan ini..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                                {errors.notes && (
                                    <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                                )}
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">📦 Item yang Diminta</h2>
                                <Button
                                    type="button"
                                    onClick={addItem}
                                    variant="outline"
                                    className="border-pink-300 text-pink-600 hover:bg-pink-50"
                                >
                                    ➕ Tambah Item
                                </Button>
                            </div>

                            {errors.items && typeof errors.items === 'string' && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
                                    <p className="text-red-700 text-sm">{errors.items}</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {data.items.map((requestItem, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-md font-medium text-gray-900">
                                                Item #{index + 1}
                                            </h3>
                                            {data.items.length > 1 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                                >
                                                    🗑️ Hapus
                                                </Button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Item <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={requestItem.item_id}
                                                    onChange={(e) => updateItem(index, 'item_id', parseInt(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                    required
                                                >
                                                    <option value={0}>Pilih Item</option>
                                                    {items.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.name} (Stok: {item.stock_quantity} {item.unit})
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors[`items.${index}.item_id` as keyof typeof errors] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        Error pada item
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Jumlah <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={requestItem.quantity}
                                                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                        required
                                                    />
                                                    {requestItem.item_id > 0 && (
                                                        <div className="absolute right-0 top-full mt-1 text-xs text-gray-500">
                                                            {getSelectedItem(requestItem.item_id)?.unit}
                                                        </div>
                                                    )}
                                                </div>
                                                {errors[`items.${index}.quantity` as keyof typeof errors] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        Error pada jumlah
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Catatan Item
                                                </label>
                                                <input
                                                    type="text"
                                                    value={requestItem.notes}
                                                    onChange={(e) => updateItem(index, 'notes', e.target.value)}
                                                    placeholder="Catatan khusus untuk item ini"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Stock Warning */}
                                        {requestItem.item_id > 0 && requestItem.quantity > 0 && (
                                            (() => {
                                                const selectedItem = getSelectedItem(requestItem.item_id);
                                                if (selectedItem && requestItem.quantity > selectedItem.stock_quantity) {
                                                    return (
                                                        <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
                                                            <p className="text-yellow-800 text-sm">
                                                                ⚠️ Jumlah permintaan ({requestItem.quantity}) melebihi stok tersedia ({selectedItem.stock_quantity} {selectedItem.unit})
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })()
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                🔙 Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                            >
                                {processing ? '⏳ Menyimpan...' : '💾 Simpan Permintaan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}