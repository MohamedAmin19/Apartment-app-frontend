/* eslint-disable @next/next/no-img-element */
// pages/index.tsx

import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Apartment, HomeProps } from '../types';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home = ({ apartments }: HomeProps) => {
  const router = useRouter();

  //handle when clicking on an apartment
  const handleApartmentClick = (id: string) => {
    router.push(`/apartments/${id}`);
  };

  return (
    <div className={styles.container}>
      <Link href="/add-apartment" passHref>
        <button className={styles.addButton}>Add Apartment</button>
      </Link>
      <div className={styles.gridContainer}>
        {apartments.map(apartment => (
          <div key={apartment._id} className={styles.card} onClick={() => handleApartmentClick(apartment._id)}>
            {apartment.imageUrls.length > 0 ? (
              <img src={apartment.imageUrls[0]} alt={apartment.title} className={styles.cardImage} />
            ) : (
              <img src="/download.jpg" alt="Image" className={styles.cardImage} />
            )}
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>{apartment.title}</h2>
              <p className={styles.cardPrice}>${apartment.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//Getting data from backend
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const response = await axios.get<Apartment[]>('http://localhost:3001/apartments');
    const apartments = response.data;
    return {
      props: { apartments },
    };
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return {
      props: { apartments: [] },
    };
  }
};

export default Home;
