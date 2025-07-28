import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = document.cookie.includes('admin_auth=true');
    
    if (isAuthenticated) {
      // Redirect to dashboard if already logged in
      router.push('/admin/dashboard');
    } else {
      // Redirect to login if not authenticated
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Admin - Deployment Test</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Redirecting...</p>
        </div>
      </div>
    </>
  );
}