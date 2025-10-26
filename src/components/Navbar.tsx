import { Car, User, LogOut, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">RideYo</span>
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
            {user ? (
              <>
                <Link to="/my-cars" className="hidden sm:inline-flex">
                  <Button variant="ghost">
                    Araçlarım
                  </Button>
                </Link>
                <Link to="/add-car">
                  <Button variant="outline" className="hidden sm:inline-flex">
                    <Plus className="w-4 h-4 mr-2" />
                    Araç Ekle
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="default" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/my-cars">
                      <DropdownMenuItem>
                        <Car className="w-4 h-4 mr-2" />
                        Araçlarım
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/add-car">
                      <DropdownMenuItem>
                        <Plus className="w-4 h-4 mr-2" />
                        Araç Ekle
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/subscription">
                      <DropdownMenuItem>
                        <Car className="w-4 h-4 mr-2" />
                        Abonelik
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="hidden sm:inline-flex">
                    Giriş Yap
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="default">
                    Üye Ol
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
