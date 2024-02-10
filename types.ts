// types.ts

export type Apartment = {
    _id: string;
    title: string;
    description: string;
    price: number;
    location:string;
    imageUrls: string[];
    // Add other properties as needed
  };
  
  export type HomeProps = {
    apartments: Apartment[];
  };
  