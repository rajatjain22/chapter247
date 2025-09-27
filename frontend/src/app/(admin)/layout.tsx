import Header from '@/components/Header'
import React from 'react'
import AutoLogoutWrapper from './AutoLogoutWrapper';
import AuthWrapper from './AuthWrapper';

export default function AdminLayout({ children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthWrapper>
            <AutoLogoutWrapper>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                    <Header />
                    {children}
                </div>
            </AutoLogoutWrapper>
        </AuthWrapper>
    )
}
