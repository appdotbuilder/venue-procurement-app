import React, { useState } from 'react';
import AppLayout from '@/components/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface ProcurementRequest {
    id: number;
    venue: {
        name: string;
    };
    requester: {
        name: string;
    };
    request_date: string;
    status: string;
    created_at: string;
    items: Array<{
        item: {
            name: string;
        };
        quantity: number;
    }>;
}

interface PaginationMeta {
    from: number;
    to: number;
    total: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    requests: {
        data: ProcurementRequest[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    filters: {
        venue?: string;
        date?: string;
    };
    canCreateRequest: boolean;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Permintaan Pengadaan', href: '/procurement-requests' },
];

export default function ProcurementRequestsIndex({ requests, filters, canCreateRequest }: Props) {
    const [searchFilters, setSearchFilters] = useState({
        venue: filters.venue || '',
        date: filters.date || '',
    });

    const handleSearch = () => {
        router.get('/procurement-requests', searchFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClearFilters = () => {
        setSearchFilters({ venue: '', date: '' });
        router.get('/procurement-requests', {}, {
            preserveState: true,
            replace: true,
        });
    };

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
                return 'Pending';
            case 'approved':
                return 'Disetujui';
            case 'rejected':
                return 'Ditolak';
            default:
                return status;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permintaan Pengadaan" />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📋 Permintaan Pengadaan</h1>
                        <p className="text-gray-600">Kelola permintaan barang untuk venue pernikahan</p>
                    </div>
                    {canCreateRequest && (
                        <Link href="/procurement-requests/create">
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                ➕ Buat Permintaan Baru
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Search Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filter Pencarian</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Venue
                            </label>
                            <input
                                type="text"
                                placeholder="Cari venue..."
                                value={searchFilters.venue}
                                onChange={(e) => setSearchFilters({ ...searchFilters, venue: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Permintaan
                            </label>
                            <input
                                type="date"
                                value={searchFilters.date}
                                onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button 
                                onClick={handleSearch}
                                className="mr-2 bg-pink-600 hover:bg-pink-700"
                            >
                                🔍 Cari
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={handleClearFilters}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                🗑️ Reset
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Requests List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {requests.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Venue
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Diminta Oleh
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Permintaan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jumlah Item
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {requests.data.map((request) => (
                                            <tr key={request.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    #{request.id.toString().padStart(4, '0')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {request.venue.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {request.requester.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(request.request_date).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                        {request.items.length} item
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeClass(request.status)}`}>
                                                        {getStatusText(request.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={`/procurement-requests/${request.id}`}
                                                        className="text-pink-600 hover:text-pink-900 transition-colors"
                                                    >
                                                        👁️ Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {requests.links.length > 3 && (
                                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        {requests.links[0]?.url && (
                                            <Link 
                                                href={requests.links[0]?.url || '#'} 
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {requests.links[requests.links.length - 1]?.url && (
                                            <Link 
                                                href={requests.links[requests.links.length - 1]?.url || '#'} 
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Menampilkan {requests.meta.from} sampai {requests.meta.to} dari {requests.meta.total} hasil
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                {requests.links.map((link, index) => 
                                                    link.url ? (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                link.active
                                                                    ? 'z-10 bg-pink-50 border-pink-500 text-pink-600'
                                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                                index === requests.links.length - 1 ? 'rounded-r-md' : ''
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ) : (
                                                        <span
                                                            key={index}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-not-allowed ${
                                                                link.active
                                                                    ? 'z-10 bg-pink-50 border-pink-500 text-pink-600'
                                                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                                index === requests.links.length - 1 ? 'rounded-r-md' : ''
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )
                                                )}
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">📋</span>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada permintaan</h3>
                            <p className="text-gray-500 mb-6">
                                {(filters.venue || filters.date) 
                                    ? 'Tidak ada permintaan yang sesuai dengan filter pencarian.'
                                    : 'Belum ada permintaan pengadaan yang dibuat.'
                                }
                            </p>
                            {canCreateRequest && !(filters.venue || filters.date) && (
                                <Link href="/procurement-requests/create">
                                    <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                        ➕ Buat Permintaan Pertama
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}