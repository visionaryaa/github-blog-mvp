import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'GitHub Blog MVP' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content="A blog built with Next.js and GitHub as CMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              GitHub Blog
            </Link>
            <div className="space-x-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-gray-900">
                Admin
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white mt-auto border-t">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>GitHub Blog MVP - Next.js with GitHub as CMS</p>
        </div>
      </footer>
    </div>
  );
}