
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Package, ShoppingCart, MessageSquare, Users, Megaphone, Zap, Ticket, Smartphone, Headphones, CreditCard, Menu, X } from 'lucide-react';
import ProductsManager from '@/components/admin/ProductsManager';
import OrdersManager from '@/components/admin/OrdersManager';
import MessagesManager from '@/components/admin/MessagesManager';
import UsersManager from '@/components/admin/UsersManager';
import PromotionsManager from '@/components/admin/PromotionsManager';
import FlashSalesManager from '@/components/admin/FlashSalesManager';
import VouchersManager from '@/components/admin/VouchersManager';
import MpesaPaymentsManager from '@/components/admin/MpesaPaymentsManager';
import NcbaLoopPaymentsManager from '@/components/admin/NcbaLoopPaymentsManager';
import SupportTicketsManager from '@/components/admin/SupportTicketsManager';
import { toast } from 'sonner';
import { useState } from 'react';

const Admin = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // If not loading and either no user or not admin, redirect to auth
    if (!loading) {
      if (!user) {
        toast.error('You must be logged in to access the admin panel');
        navigate('/auth');
        return;
      }
      
      if (!isAdmin) {
        toast.error('You do not have admin privileges');
        navigate('/');
        return;
      }
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error('Failed to sign out');
      } else {
        toast.success('Signed out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  // Show loading state while checking admin status
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Checking admin access...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not admin (redirect will happen via useEffect)
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-First Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/e047520e-19b1-47f7-8286-99901fcfc9ab.png" 
                alt="Kaffa Online Store" 
                className="h-8 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">Kaffa Online Store Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="hidden md:block text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigate('/')} className="hidden sm:flex">
                View Site
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="hidden sm:flex">
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="sm:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t space-y-2">
              <div className="text-xs text-muted-foreground mb-2">{user.email}</div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/')} className="flex-1">
                  View Site
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut} className="flex-1">
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8">
        <Tabs defaultValue="products" className="space-y-4">
          {/* Mobile-Optimized Tabs */}
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 w-max min-w-full gap-1">
              <TabsTrigger value="products" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="mpesa" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">M-Pesa</span>
              </TabsTrigger>
              <TabsTrigger value="flash-sales" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Sales</span>
              </TabsTrigger>
              <TabsTrigger value="vouchers" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <Ticket className="h-4 w-4" />
                <span className="hidden sm:inline">Vouchers</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="promotions" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <Megaphone className="h-4 w-4" />
                <span className="hidden sm:inline">Promos</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex flex-col items-center space-y-1 px-2 py-2 text-xs">
                <Headphones className="h-4 w-4" />
                <span className="hidden sm:inline">Support</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products Management</CardTitle>
                <CardDescription>
                  Add, edit, and delete products in your store
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
                <CardDescription>
                  View and manage customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrdersManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flash-sales">
            <Card>
              <CardHeader>
                <CardTitle>Flash Sales Management</CardTitle>
                <CardDescription>
                  Create and manage limited-time flash sales with special discounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FlashSalesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vouchers">
            <Card>
              <CardHeader>
                <CardTitle>Voucher Management</CardTitle>
                <CardDescription>
                  Create and manage discount vouchers for customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VouchersManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mpesa">
            <Card>
              <CardHeader>
                <CardTitle>M-Pesa Payment Management</CardTitle>
                <CardDescription>
                  Review and manually confirm M-Pesa payments from customers. Phone: 0743049549
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MpesaPaymentsManager />
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Customer Messages</CardTitle>
                <CardDescription>
                  View and respond to customer inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MessagesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users Management</CardTitle>
                <CardDescription>
                  Manage user accounts and admin permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotions">
            <Card>
              <CardHeader>
                <CardTitle>Promotional Content</CardTitle>
                <CardDescription>
                  Create and manage promotional banners and campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PromotionsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>
                  Manage customer support tickets and respond to inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SupportTicketsManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
