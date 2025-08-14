import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Wedding Venue Procurement System" />
            
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                {/* Navigation */}
                <nav className="px-6 py-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">WP</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900">WeddingPro</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-pink-600 font-medium transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            💐 Wedding Venue
                            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                {' '}Procurement
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Sistem pengadaan modern untuk venue pernikahan. Kelola permintaan barang dengan mudah, 
                            pantau stok, dan streamline proses persetujuan.
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 text-lg">
                                        🚀 Mulai Sekarang
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg">
                                        🔑 Login
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📝</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Permintaan Barang</h3>
                            <p className="text-gray-600">
                                Admin dapat membuat permintaan barang untuk venue pernikahan dengan mudah dan terorganisir.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">✅</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Sistem Persetujuan</h3>
                            <p className="text-gray-600">
                                Super Admin dapat meninjau, menyetujui, atau menolak permintaan dengan workflow yang jelas.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Manajemen Stok</h3>
                            <p className="text-gray-600">
                                Pantau ketersediaan barang secara real-time dan kelola inventory dengan otomatis.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Pencarian Cerdas</h3>
                            <p className="text-gray-600">
                                Cari data berdasarkan nama venue dan tanggal permintaan dengan filter yang powerful.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🏛️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Multi Venue</h3>
                            <p className="text-gray-600">
                                Kelola permintaan untuk berbagai venue pernikahan dalam satu platform terpusat.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Dashboard Analytics</h3>
                            <p className="text-gray-600">
                                Lihat statistik dan laporan komprehensif untuk pengambilan keputusan yang lebih baik.
                            </p>
                        </div>
                    </div>

                    {/* Role Showcase */}
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">🎭 Dua Peran, Satu Tujuan</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
                                    <div className="text-4xl mb-4">👤</div>
                                    <h3 className="text-xl font-bold mb-2">Admin</h3>
                                    <p className="text-pink-100">
                                        Buat permintaan barang baru, kelola data venue, dan pantau status permintaan Anda.
                                    </p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
                                    <div className="text-4xl mb-4">👑</div>
                                    <h3 className="text-xl font-bold mb-2">Super Admin</h3>
                                    <p className="text-purple-100">
                                        Tinjau semua permintaan, setujui atau tolak, dan kelola seluruh sistem procurement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded">
                            </div>
                            <span className="font-bold text-lg">WeddingPro</span>
                        </div>
                        <p className="text-gray-400">
                            © 2024 Wedding Venue Procurement System. Dibuat dengan ❤️ untuk industri pernikahan.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}