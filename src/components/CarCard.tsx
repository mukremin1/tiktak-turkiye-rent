import { Car as CarType } from "@/types/car";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Users, Fuel, Settings, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface CarCardProps {
  car: CarType;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {car.available ? (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
            Müsait
          </Badge>
        ) : (
          <Badge variant="destructive" className="absolute top-4 right-4">
            Kullanımda
          </Badge>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">{car.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{car.location}</span>
              {car.distance && <span className="ml-2">• {car.distance} km</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{car.seats} Kişi</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{car.pricePerHour}₺/saat</span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-3xl font-bold text-foreground">{car.pricePerMinute}₺</span>
              <span className="text-sm text-muted-foreground ml-1">/dakika</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{car.pricePerDay}₺/gün</div>
            </div>
          </div>

          <Link to={`/car/${car.id}`} className="w-full block">
            <Button 
              className="w-full" 
              disabled={!car.available}
            >
              {car.available ? "Detayları Gör" : "Müsait Değil"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
