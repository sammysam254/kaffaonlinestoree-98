import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppChat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '254743049549'; // International format of 0743049549
    const message = encodeURIComponent('Hi! I\'m interested in your products from Kaffa Online Store. Can you help me with product information, pricing, and availability?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="icon"
      >
        <Phone className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default WhatsAppChat;