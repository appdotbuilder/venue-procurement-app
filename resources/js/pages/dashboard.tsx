import React from 'react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Stats {
    totalRequests?: number;
    pendingRequests?: number;
    approvedRequests?: number;
    totalVenues?: number;
    totalItems?: number;
    lowStockItems?: number;
    myRequests?: number;
    myPendingRequests?: number;
    myApprovedRequests?: number;
    recentRequests: Array<{
        id: number;
        venue: {
            name: string;
        };
        requester: {
            name: string;
        };
        request_date: string;
        status: string;
    }>;
}

interface Props {
    stats: Stats;
    userRole: string;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, userRole }: Props) {
    const isSuperAdmin = userRole === 'super_admin';

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
            <Head title="Dashboard" />
            <div className="p-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-6 mb-8 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        👋 Selamat Datang, {isSuperAdmin ? 'Super Admin' : 'Admin'}!
                    </h1>
                    <p className="text-pink-100">
                        {isSuperAdmin 
                            ? 'Kelola semua permintaan pengadaan dan pantau sistem secara menyeluruh.'
                            : 'Buat permintaan pengadaan baru dan pantau status permintaan Anda.'
                        }
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {isSuperAdmin ? (
                        <>
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <span className="text-2xl">📋</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Permintaan</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <span className="text-2xl">⏳</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Menunggu Persetujuan</p>
                                        <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Disetujui</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.approvedRequests}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <span className="text-2xl">⚠️</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Stok Rendah</p>
                                        <p className="text-2xl font-bold text-red-600">{stats.lowStockItems}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <span className="text-2xl">📝</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Permintaan Saya</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.myRequests}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <span className="text-2xl">⏳</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Menunggu</p>
                                        <p className="text-2xl font-bold text-yellow-600">{stats.myPendingRequests}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Disetujui</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.myApprovedRequests}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-center">
                                    <Link href="/procurement-requests/create">
                                        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                            ➕ Buat Permintaan
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Recent Requests */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">📋 Permintaan Terbaru</h2>
                            <Link
                                href="/procurement-requests"
                                className="text-pink-600 hover:text-pink-700 font-medium"
                            >
                                Lihat Semua →
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {stats.recentRequests.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
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
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {stats.recentRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {request.venue.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {request.requester.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(request.request_date).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeClass(request.status)}`}>
                                                    {getStatusText(request.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <Link
                                                    href={`/procurement-requests/${request.id}`}
                                                    className="text-pink-600 hover:text-pink-900"
                                                >
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-12">
                                <span className="text-6xl mb-4 block">📋</span>
                                <p className="text-gray-500">Belum ada permintaan</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}