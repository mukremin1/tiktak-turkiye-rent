import { Home, Car, Plus, User, Search, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border pb-safe md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            isActive("/") 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Ana Sayfa</span>
        </Link>

        <Link 
          to="/cars" 
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            isActive("/cars") 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">Araçlar</span>
        </Link>

        {user && (
          <Link 
            to="/favorites" 
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              isActive("/favorites") 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Favoriler</span>
          </Link>
        )}

        {user && (
          <>
            <Link 
              to="/add-car" 
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg -mt-6 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium mt-1">Ekle</span>
            </Link>

            <Link 
              to="/my-cars" 
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive("/my-cars") 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Car className="w-6 h-6" />
              <span className="text-xs font-medium">Araçlarım</span>
            </Link>
          </>
        )}

        <Link 
          to={user ? "/subscription" : "/auth"} 
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            isActive(user ? "/subscription" : "/auth") 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">{user ? "Profil" : "Giriş"}</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
