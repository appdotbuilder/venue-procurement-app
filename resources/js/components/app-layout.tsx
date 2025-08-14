import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <main className="flex flex-1 flex-col gap-4 overflow-hidden lg:gap-6">
                <AppHeader />
                <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 md:gap-6 md:p-6">
                    {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                    <AppContent>{children}</AppContent>
                </div>
            </main>
        </AppShell>
    );
}