import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = document.cookie.includes('admin_auth=true');
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASS || 'admin123';

    if (password === adminPassword) {
      // Set authentication cookie
      document.cookie = 'admin_auth=true; path=/; max-age=86400'; // 24 hours
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Admin Login - Deployment Test</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-400">
              Enter password to access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="label-text">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-200">
                  <p className="text-sm font-medium">❌ {error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !password}
                className="btn-primary w-full"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Contact Form
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Secure admin access for deployment testing</p>
          </div>
        </div>
      </div>
    </>
  );
}