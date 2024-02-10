/* eslint-disable @next/next/no-img-element */

import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Apartment } from '../../types';
import styles from '../../styles/ApartmentDetails.module.css';
import Link from 'next/link';


interface ApartmentDetailsProps {
  apartment: Apartment;
}

//Apartment details page
const ApartmentDetails = ({ apartment }: ApartmentDetailsProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{apartment.title}</h1>
      {apartment.imageUrls.length > 0 ? (
        <img src={apartment.imageUrls[0]} alt={apartment.title} className={styles.image} />
      ) : (
        <img src="/download.jpg" alt="Image" className={styles.image} />
      )}
      <p className={styles.description}>{apartment.location}</p>
      <p className={styles.description}>{apartment.description}</p>
      <p className={styles.price}>${apartment.price}</p>
      <Link href="/" passHref>
        <button className={styles.backButton}>Back to Apartments</button>
      </Link>
    </div>
  );
};

//Getting data from backend
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid apartment ID');
    }

    const response = await axios.get<Apartment>(`http://localhost:3001/apartments/${id}`);
    const apartment = response.data;

    return {
      props: { apartment },
    };
  } catch (error) {
    console.error('Error fetching apartment details:', error);
    return {
      notFound: true,
    };
  }
};

export default ApartmentDetails;
