import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Premium Banner - Mobile Optimized */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Crown className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">Aylık aboneliklerle %25'e varan indirimler!</span>
          </div>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => navigate('/subscription')}
            className="whitespace-nowrap"
          >
            Paketleri Gör
          </Button>
        </div>
      </div>

      <Hero />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
