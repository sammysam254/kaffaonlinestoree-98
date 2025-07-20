import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Fashion & Clothing",
      subtitle: "Style Meets Comfort",
      description: "Discover the latest trends in clothing, shoes, and fashion accessories",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center",
      category: "clothing"
    },
    {
      id: 2,
      title: "Electronics & Tech",
      subtitle: "Innovation at Your Fingertips",
      description: "Latest laptops, smartphones, and cutting-edge technology",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&crop=center",
      category: "electronics"
    },
    {
      id: 3,
      title: "Home & Furniture",
      subtitle: "Transform Your Space",
      description: "Beautiful furniture and home essentials for every room",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center",
      category: "furniture"
    },
    {
      id: 4,
      title: "Beauty & Personal Care",
      subtitle: "Look & Feel Amazing",
      description: "Premium beauty products and personal care essentials",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop&crop=center",
      category: "beauty"
    },
    {
      id: 5,
      title: "Sports & Outdoors",
      subtitle: "Active Lifestyle",
      description: "Sports equipment and outdoor gear for every adventure",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
      category: "sports"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/10 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-medium text-sm">{currentSlideData.subtitle}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                {currentSlideData.title.split(' ')[0]}
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  {currentSlideData.title.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                {currentSlideData.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={() => navigate(`/products?category=${currentSlideData.category}`)}
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/products')}
              >
                View All Products
              </Button>
            </div>

            {/* Category indicators */}
            <div className="flex gap-2 pt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-primary w-8' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-tech transition-shadow duration-500">
              <div className="relative h-[500px] bg-gray-100">
                <img 
                  src={currentSlideData.image} 
                  alt={currentSlideData.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-primary p-6 rounded-xl shadow-glow">
              <p className="text-white font-bold text-lg">Quality Products</p>
              <p className="text-white/90 text-sm">Everything You Need</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;