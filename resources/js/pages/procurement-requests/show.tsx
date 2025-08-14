import React, { useState } from 'react';
import AppLayout from '@/components/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface ProcurementRequestItem {
    id: number;
    quantity: number;
    notes?: string;
    item: {
        id: number;
        name: string;
        unit: string;
        stock_quantity: number;
    };
}

interface ProcurementRequest {
    id: number;
    request_date: string;
    status: string;
    notes?: string;
    created_at: string;
    approved_at?: string;
    venue: {
        id: number;
        name: string;
        address?: string;
    };
    requester: {
        id: number;
        name: string;
        email: string;
    };
    approver?: {
        id: number;
        name: string;
        email: string;
    };
    items: ProcurementRequestItem[];
}

interface Props {
    request: ProcurementRequest;
    canApprove: boolean;
    [key: string]: unknown;
}



export default function ShowProcurementRequest({ request, canApprove }: Props) {
    const [showApprovalForm, setShowApprovalForm] = useState(false);
    
    const { data, setData, patch, processing, errors } = useForm({
        status: '',
        notes: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Permintaan Pengadaan', href: '/procurement-requests' },
        { title: `Permintaan #${request.id.toString().padStart(4, '0')}`, href: `/procurement-requests/${request.id}` },
    ];

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Menunggu Persetujuan';
            case 'approved':
                return 'Disetujui';
            case 'rejected':
                return 'Ditolak';
            default:
                return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'approved':
                return '✅';
            case 'rejected':
                return '❌';
            default:
                return '❓';
        }
    };

    const handleApproval = (approvalStatus: string) => {
        setData('status', approvalStatus);
        setShowApprovalForm(true);
    };

    const submitApproval = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/procurement-requests/${request.id}`, {
            onSuccess: () => {
                setShowApprovalForm(false);
            },
        });
    };

    const getTotalItems = () => {
        return request.items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permintaan #${request.id.toString().padStart(4, '0')}`} />
            
            <div className="p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    📋 Permintaan #{request.id.toString().padStart(4, '0')}
                                </h1>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span>📅 Dibuat: {new Date(request.created_at).toLocaleDateString('id-ID')}</span>
                                    {request.approved_at && (
                                        <span>
                                            ✅ Diproses: {new Date(request.approved_at).toLocaleDateString('id-ID')}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border ${getStatusBadgeClass(request.status)}`}>
                                    <span className="mr-2">{getStatusIcon(request.status)}</span>
                                    {getStatusText(request.status)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Request Details */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Detail Permintaan</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Venue
                                        </label>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="font-medium text-gray-900">{request.venue.name}</p>
                                            {request.venue.address && (
                                                <p className="text-sm text-gray-600 mt-1">{request.venue.address}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tanggal Permintaan
                                        </label>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="font-medium text-gray-900">
                                                {new Date(request.request_date).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {request.notes && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Catatan
                                        </label>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-gray-900">{request.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Items List */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">📦 Item yang Diminta</h2>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                        {request.items.length} item • Total: {getTotalItems()} unit
                                    </span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Item
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Jumlah
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Stok Tersedia
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status Stok
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Catatan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {request.items.map((requestItem) => (
                                                <tr key={requestItem.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {requestItem.item.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            <span className="font-semibold">{requestItem.quantity}</span>
                                                            <span className="text-gray-500 ml-1">{requestItem.item.unit}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            <span className="font-semibold">{requestItem.item.stock_quantity}</span>
                                                            <span className="text-gray-500 ml-1">{requestItem.item.unit}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {requestItem.quantity <= requestItem.item.stock_quantity ? (
                                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                                                                ✅ Tersedia
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
                                                                ❌ Tidak Cukup
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">
                                                            {requestItem.notes || '-'}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Requester Info */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Pemohon</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Nama</p>
                                        <p className="font-medium text-gray-900">{request.requester.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-sm text-gray-900">{request.requester.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Approver Info */}
                            {request.approver && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">👑 Penyetuju</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Nama</p>
                                            <p className="font-medium text-gray-900">{request.approver.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-sm text-gray-900">{request.approver.email}</p>
                                        </div>
                                        {request.approved_at && (
                                            <div>
                                                <p className="text-sm text-gray-500">Tanggal Persetujuan</p>
                                                <p className="text-sm text-gray-900">
                                                    {new Date(request.approved_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            {canApprove && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Aksi</h3>
                                    <div className="space-y-3">
                                        <Button
                                            onClick={() => handleApproval('approved')}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                                            disabled={processing}
                                        >
                                            ✅ Setujui Permintaan
                                        </Button>
                                        <Button
                                            onClick={() => handleApproval('rejected')}
                                            variant="outline"
                                            className="w-full border-red-300 text-red-600 hover:bg-red-50"
                                            disabled={processing}
                                        >
                                            ❌ Tolak Permintaan
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Approval Form Modal */}
                    {showApprovalForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    {data.status === 'approved' ? '✅ Setujui Permintaan' : '❌ Tolak Permintaan'}
                                </h3>
                                
                                <form onSubmit={submitApproval}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catatan {data.status === 'approved' ? 'Persetujuan' : 'Penolakan'}
                                        </label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={4}
                                            placeholder={`Berikan alasan ${data.status === 'approved' ? 'persetujuan' : 'penolakan'}...`}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                        {errors.notes && (
                                            <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                                        )}
                                    </div>
                                    
                                    <div className="flex justify-end space-x-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowApprovalForm(false)}
                                            disabled={processing}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            className={data.status === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                                            disabled={processing}
                                        >
                                            {processing ? '⏳ Memproses...' : (data.status === 'approved' ? 'Setujui' : 'Tolak')}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}