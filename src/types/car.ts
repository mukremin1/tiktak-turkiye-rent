export interface Car {
  id: string;
  name: string;
  type: "compact" | "sedan" | "suv";
  pricePerMinute: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerKm: number;
  kmPackages: Record<string, number>; // e.g., {"50": 50, "100": 90, "200": 160, "500": 350}
  image: string;
  fuelType: "Benzin" | "Dizel" | "Elektrik" | "Hibrit";
  transmission: "Manuel" | "Otomatik";
  seats: number;
  available: boolean;
  location: string;
  distance?: number;
}
