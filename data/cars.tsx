export type FuelType =
  | 'Petrol'
  | 'Diesel'
  | 'Hybrid'
  | 'Electric'
  | 'Petrol + LPG'
  | 'Hybrid + LPG';

export type BodyType =
  | 'Hatchback'
  | 'Sedan'
  | 'SUV'
  | 'Kombi'
  | 'Wagon';

export type DriveType = 'FWD' | 'AWD' | 'RWD';

export type Car = {
  id: number;
  slug: string;
  name: string;
  year: string;
  image: string;

  fuel: FuelType;
  gearbox: string;
  engine: string;

  body: BodyType;
  mileage: string;
  drive: DriveType;

  fuelConsumption: string;
  range: string;
  trunkVolume: string;

  rideCategories: readonly string[];
  rentPrice: string;
  price: string;
};