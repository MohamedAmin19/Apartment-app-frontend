import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/AddApartment.module.css';

// Define a type for your form data with an index signature
type FormData = {
  title: string;
  location: string;
  price: string;
  description:string;
  imageUrls: File | null;
};

const AddApartment = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    location: '',
    price: '',
    description:'',
    imageUrls: null,
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'imageUrls') { // Corrected from 'image' to 'imageUrls'
      setFormData({ ...formData, [name]: files?.[0] ?? null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'imageUrls' && value) { // Check if the key is 'imageUrls' and has a file
        data.append('images', value); // Assuming your backend expects the file under the 'image' field
      } else if (value !== null) {
        data.append(key, value.toString()); // Convert all non-null values to string to handle non-file fields
      }
    });
  
    // Proceed with the axios request
    try {
      console.log(data);
      const response = await axios.post('http://localhost:3001/apartments', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response); // Log the successful response
      router.push('/'); // Navigate back to the home page on success
    } catch (error: any) {
      console.error('Error adding apartment:', error.response ? error.response.data : error);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1>Add New Apartment</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="file"
          name="imageUrls"
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add Apartment</button>
      </form>
    </div>
  );
};

export default AddApartment;
