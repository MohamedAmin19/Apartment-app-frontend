
export type Apartment = {
    _id: string;
    title: string;
    description: string;
    price: number;
    location:string;
    imageUrls: string[];
  };
  
  export type HomeProps = {
    apartments: Apartment[];
  };
  