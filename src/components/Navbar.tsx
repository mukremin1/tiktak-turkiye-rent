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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border pt-safe">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2 transition-transform active:scale-95 md:hover:scale-105">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <span className="text-lg md:text-xl font-bold text-foreground">RideYo</span>
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

          <div className="flex items-center gap-2 md:gap-3">
            {user ? (
              <>
                <Link to="/my-cars" className="hidden md:inline-flex">
                  <Button variant="ghost">
                    Araçlarım
                  </Button>
                </Link>
                <Link to="/add-car" className="hidden md:inline-flex">
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Araç Ekle
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="default" size="icon" className="h-9 w-9 md:h-10 md:w-10">
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-popover">
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
                <Link to="/auth" className="hidden md:inline-flex">
                  <Button variant="ghost">
                    Giriş Yap
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="default" size="sm" className="h-9 md:h-10">
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
