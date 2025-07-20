
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
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

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('products');

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

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsManager />;
      case 'orders':
        return <OrdersManager />;
      case 'flash-sales':
        return <FlashSalesManager />;
      case 'vouchers':
        return <VouchersManager />;
      case 'mpesa':
        return <MpesaPaymentsManager />;
      case 'messages':
        return <MessagesManager />;
      case 'users':
        return <UsersManager />;
      case 'promotions':
        return <PromotionsManager />;
      case 'support':
        return <SupportTicketsManager />;
      default:
        return <ProductsManager />;
    }
  };

  const getActiveTitle = () => {
    switch (activeTab) {
      case 'products':
        return { title: 'Products Management', description: 'Add, edit, and delete products in your store' };
      case 'orders':
        return { title: 'Orders Management', description: 'View and manage customer orders' };
      case 'flash-sales':
        return { title: 'Flash Sales Management', description: 'Create and manage limited-time flash sales with special discounts' };
      case 'vouchers':
        return { title: 'Voucher Management', description: 'Create and manage discount vouchers for customers' };
      case 'mpesa':
        return { title: 'M-Pesa Payment Management', description: 'Review and manually confirm M-Pesa payments from customers. Phone: 0743049549' };
      case 'messages':
        return { title: 'Customer Messages', description: 'View and respond to customer inquiries' };
      case 'users':
        return { title: 'Users Management', description: 'Manage user accounts and admin permissions' };
      case 'promotions':
        return { title: 'Promotional Content', description: 'Create and manage promotional banners and campaigns' };
      case 'support':
        return { title: 'Support Tickets', description: 'Manage customer support tickets and respond to inquiries' };
      default:
        return { title: 'Products Management', description: 'Add, edit, and delete products in your store' };
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

  const { title, description } = getActiveTitle();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="lg:hidden" />
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold">{title}</h1>
                  <p className="text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8">
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                {renderActiveComponent()}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
