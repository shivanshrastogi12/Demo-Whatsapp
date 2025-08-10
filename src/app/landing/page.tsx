
"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users, Zap, Shield, Globe, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setOpen(false);
        router.push("/chat");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-primary/10 via-background to-whatsapp-secondary/10">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-16 pb-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center space-x-3 mb-8">
            <MessageCircle className="w-12 h-12 text-whatsapp-primary" />
            <h1 className="text-4xl font-bold text-foreground">WhatsApp Business</h1>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground max-w-4xl leading-tight">
            Connect with your customers like never before
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Professional WhatsApp Business dashboard to manage all your customer conversations,
            send messages, and grow your business with real-time messaging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-white px-8 py-4 text-lg hover:opacity-90" style={{ backgroundColor: '#25D366' }}>
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter your phone number</DialogTitle>
                  <DialogDescription>
                    To get started, please enter your WhatsApp phone number.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full"
                  />
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <DialogFooter>
                    <Button type="submit" disabled={loading || !phone} className="w-full bg-whatsapp-primary text-white hover:opacity-90">
                      {loading ? "Submitting..." : "Continue"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Everything you need to manage WhatsApp Business
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform provides all the tools you need to communicate effectively with your customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-whatsapp-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-whatsapp-primary" />
              </div>
              <CardTitle className="text-xl">Real-time Messaging</CardTitle>
              <CardDescription>
                Send and receive messages instantly with your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Instant message delivery</li>
                <li>• Read receipts and status updates</li>
                <li>• Message history and search</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle className="text-xl">Contact Management</CardTitle>
              <CardDescription>
                Organize and manage all your customer contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Contact profiles and history</li>
                <li>• Group conversations</li>
                <li>• Contact search and filters</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <CardTitle className="text-xl">Fast Performance</CardTitle>
              <CardDescription>
                Lightning-fast interface built with modern technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Next.js 14 App Router</li>
                <li>• Real-time updates with SWR</li>
                <li>• Optimized for mobile and desktop</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <CardTitle className="text-xl">Secure & Private</CardTitle>
              <CardDescription>
                Your data is secure with enterprise-grade encryption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• End-to-end encryption</li>
                <li>• JWT-based authentication</li>
                <li>• Secure MongoDB Atlas storage</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-purple-500" />
              </div>
              <CardTitle className="text-xl">Cloud-Based</CardTitle>
              <CardDescription>
                Access your messages from anywhere, anytime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multi-device synchronization</li>
                <li>• Cloud backup and restore</li>
                <li>• 99.9% uptime guarantee</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-red-500" />
              </div>
              <CardTitle className="text-xl">Analytics & Insights</CardTitle>
              <CardDescription>
                Track your messaging performance and engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Message delivery rates</li>
                <li>• Response time analytics</li>
                <li>• Customer engagement metrics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl p-8 md:p-12 text-center text-white" style={{ backgroundColor: '#25D366' }}>
          <h3 className="text-3xl font-bold mb-4">
            Ready to transform your business communication?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using our WhatsApp Business platform
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2025 WhatsApp Business Dashboard. Built with Next.js 14, MongoDB & shadcn/ui.</p>
        </div>
      </footer>
    </div>
  );
}
