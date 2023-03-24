import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import plus from '../../../public/plus.webp';
import { db } from '../../../firebase/firebase';

interface Product {
  id: number;
  image: string;
  title: string;
  rating: number;
  price: number;
  description: string;
}

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const productCollectionRef = collection(db, 'products');

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
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <Link
        href="/newProduct"
        className="absolute bottom-5 right-5"
      >
        <Image src={plus} alt="plus sign" width={50} height={50} />
      </Link>
      <div className="flex flex-wrap -mx-4 p-6">
        {products.map((product : Product) => (
          <ProductCard key={product.id} product={product} bigScreen="md:w-1/2 lg:w-1/3 xl:w-1/4" />
        ))}
      </div>
    </div>
  );
}
