export interface Car {
  id: string;
  name: string;
  type: "compact" | "sedan" | "suv";
  pricePerMinute: number;
  pricePerHour: number;
  pricePerDay: number;
  image: string;
  fuelType: "Benzin" | "Dizel" | "Elektrik" | "Hibrit";
  transmission: "Manuel" | "Otomatik";
  seats: number;
  available: boolean;
  location: string;
  distance?: number;
}
