import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp Business</h1>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved or doesn&apos;t exist.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back Home
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500 mt-4">
            <p>Need help? Contact our support team</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
          <div className="flex flex-col space-y-2">
            <Link href="/login" className="text-green-600 hover:text-green-700 transition-colors">
              Login to Dashboard
            </Link>
            <Link href="/chat" className="text-green-600 hover:text-green-700 transition-colors">
              Chat Interface
            </Link>
            <Link href="/api/seed" className="text-green-600 hover:text-green-700 transition-colors">
              Database Setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
