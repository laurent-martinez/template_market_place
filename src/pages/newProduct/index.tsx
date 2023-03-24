import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import {
  ref, uploadBytes, listAll, getDownloadURL,
} from 'firebase/storage';
import ProductCard from '@/components/ProductCard';
import { auth, db, storage } from '../../../firebase/firebase';

interface Product {
  id: number;
  image: string;
  title: string;
  rating: number;
  price: number;
  description: string;
}

function Admin() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [newText, setNewText] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newDescription, setNewDescription] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const productCollectionRef = collection(db, 'products');
  const [newImage, setNewImage] = useState<File | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setNewText(value);
        break;
      case 'rating':
        setNewRating(Number(value));
        break;
      case 'price':
        setNewPrice(Number(value));
        break;
      case 'description':
        setNewDescription(value);
        break;
      case 'category':
        setNewCategory(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgFolder = ref(storage, `productIMG/${newImage?.name}`);
      await uploadBytes(imgFolder, newImage);
      const imageUrl = await getDownloadURL(imgFolder);
      await addDoc(productCollectionRef, {
        title: newText,
        rating: newRating,
        price: newPrice,
        category: newCategory,
        description: newDescription,
        image: imageUrl,
        userId: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [productCollectionRef]);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
            Category:
            <input
              type="text"
              name="category"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            image:
            <input
              type="file"
              name="image"
              onChange={(event) => { setNewImage(event.target.files[0]); }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
            Rating:
            <input
              type="number"
              name="rating"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price:
            <input
              type="number"
              name="price"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description:
            <textarea
              name="description"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </form>
      <div className="flex overflow-x-scroll -mx-4 p-6">
        {products.map((product : Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Admin;
