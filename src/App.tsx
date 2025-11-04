import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Chatbot from "@/components/Chatbot";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Auth from "./pages/Auth";
import AddCar from "./pages/AddCar";
import MyCars from "./pages/MyCars";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import VehicleAlerts from "./pages/VehicleAlerts";
import DriverScore from "./pages/DriverScore";
import GPSTracking from "./pages/GPSTracking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import KVKK from "./pages/KVKK";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Chatbot />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/my-cars" element={<MyCars />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/support" element={<Support />} />
            <Route path="/vehicle-alerts" element={<VehicleAlerts />} />
            <Route path="/driver-score" element={<DriverScore />} />
            <Route path="/gps-tracking" element={<GPSTracking />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/kvkk" element={<KVKK />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
