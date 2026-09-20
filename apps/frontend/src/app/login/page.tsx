'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cpu, Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-indigo-500/30 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2 text-indigo-400">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-white">Paper2Prototype</span>
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-xs text-gray-400">Sign in to access your research engineering workspace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@paper2prototype.dev"
                className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-300">Password</label>
              <Link href="/forgot-password" className="text-[10px] text-indigo-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg text-xs transition shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase">Or continue with</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center space-x-2 py-2 border border-gray-700 bg-dark-800 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center space-x-2 py-2 border border-gray-700 bg-dark-800 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition"
          >
            <span className="font-bold text-indigo-400">G</span>
            <span>Google</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-indigo-400 hover:underline font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
