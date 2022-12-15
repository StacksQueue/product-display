export interface Product {
  id?: Number;
  title: string;
  description: string;
  price: number | string;
  discountPercentage: Number;
  rating: Number;
  stock: Number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
