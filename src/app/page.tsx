import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users, Zap, Shield, Globe, BarChart3, ArrowRight, CheckCircle, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-8 pb-16">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <MessageCircle className="w-10 h-10 text-green-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              WhatsApp Business
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-green-600">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Trusted by 10,000+ businesses worldwide
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Connect with your customers 
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                like never before
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional WhatsApp Business dashboard to manage all your customer conversations, 
              send messages, and grow your business with real-time messaging.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/login">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-green-200 text-gray-600 hover:bg-green-50"
              >
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-green-100 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-green-700">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="mt-1">4.9/5 from 2,000+ reviews</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="flex-1 relative">
            <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-2xl">
              {/* Mock WhatsApp Interface */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-green-600 text-white p-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp Business</h3>
                    <p className="text-xs text-green-100">Online now</p>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="p-4 space-y-3 bg-green-50 min-h-[300px]">
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-xs">
                      <p className="text-sm text-gray-800">Hi! I&apos;d like to know more about your products</p>
                      <span className="text-xs text-gray-500">10:30 AM</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-green-200 rounded-lg rounded-tr-none px-3 py-2 max-w-xs">
                      <p className="text-sm text-gray-800">Hello! I&apos;d be happy to help. What are you looking for?</p>
                      <span className="text-xs text-gray-600 flex items-center justify-end">
                        10:31 AM
                        <CheckCircle className="w-3 h-3 ml-1 text-blue-500" />
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-xs">
                      <p className="text-sm text-gray-800">Perfect! Your response time is amazing 🚀</p>
                      <span className="text-xs text-gray-500">10:31 AM</span>
                    </div>
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="p-4 border-t bg-white flex items-center space-x-3">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                    <span className="text-sm text-gray-400">Type a message...</span>
                  </div>
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to manage WhatsApp Business
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our platform provides all the tools you need to communicate effectively with your customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: MessageCircle,
              title: "Real-time Messaging",
              description: "Send and receive messages instantly with your customers",
              color: "green",
              features: ["Instant message delivery", "Read receipts and status updates", "Message history and search"]
            },
            {
              icon: Users,
              title: "Contact Management", 
              description: "Organize and manage all your customer contacts",
              color: "blue",
              features: ["Contact profiles and history", "Group conversations", "Contact search and filters"]
            },
            {
              icon: Zap,
              title: "Fast Performance",
              description: "Lightning-fast interface built with modern technology",
              color: "yellow",
              features: ["Next.js 15 App Router", "Real-time updates with SWR", "Optimized for mobile and desktop"]
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your data is secure with enterprise-grade encryption",
              color: "emerald",
              features: ["End-to-end encryption", "JWT-based authentication", "Secure MongoDB Atlas storage"]
            },
            {
              icon: Globe,
              title: "Cloud-Based",
              description: "Access your messages from anywhere, anytime",
              color: "purple",
              features: ["Multi-device synchronization", "Cloud backup and restore", "99.9% uptime guarantee"]
            },
            {
              icon: BarChart3,
              title: "Analytics & Insights",
              description: "Track your messaging performance and engagement", 
              color: "red",
              features: ["Message delivery rates", "Response time analytics", "Customer engagement metrics"]
            }
          ].map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.features.map((feat, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
          </div>
          
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your business communication?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of businesses already using our WhatsApp Business platform to connect with customers and grow their revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg text-green-700 bg-white hover:bg-gray-100">
                  Start Your Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/20">
              {[
                { number: "10K+", label: "Active Users" },
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "Support" },
                { number: "50+", label: "Countries" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-green-100 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">WhatsApp Business</h3>
              </div>
              <p className="text-gray-600 mb-4">
                The most powerful WhatsApp Business management platform. Connect with your customers, 
                manage conversations, and grow your business.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-green-100 cursor-pointer transition-colors">
                  <span className="text-sm font-semibold text-gray-600">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-green-100 cursor-pointer transition-colors">
                  <span className="text-sm font-semibold text-gray-600">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-green-100 cursor-pointer transition-colors">
                  <span className="text-sm font-semibold text-gray-600">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">API</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 WhatsApp Business Dashboard. Built with Next.js 15, MongoDB & shadcn/ui.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
