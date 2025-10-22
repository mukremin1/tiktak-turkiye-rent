import { Car } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">RentNow</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Ana Sayfa
            </Link>
            <Link to="/cars" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Araçlar
            </Link>
            <a href="/#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Nasıl Çalışır
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Giriş Yap
            </Button>
            <Button variant="default">
              Üye Ol
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
