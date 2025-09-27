import React from 'react'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="auth-page">
            <div className="auth-blob auth-blob--left" />
            <div className="auth-blob auth-blob--right" />
            {children}
        </div>
    )
}
