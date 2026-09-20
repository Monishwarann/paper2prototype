'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <h2 className="text-2xl font-bold text-white tracking-tight">Reset Password</h2>
          <p className="text-xs text-gray-400">Enter your registered email to receive password reset instructions</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-semibold text-white">Reset Link Sent!</p>
            <p className="text-xs text-gray-400">If an account exists for {email}, a reset link has been sent.</p>
            <Link href="/login" className="inline-block pt-2 text-xs text-indigo-400 hover:underline">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs transition flex items-center justify-center space-x-2"
            >
              <span>Send Reset Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-400">
          Remembered your password?{' '}
          <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
