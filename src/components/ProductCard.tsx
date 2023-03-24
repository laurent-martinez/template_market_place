import { deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react';
import { db } from '../../firebase/firebase';

function ProductCard({
  product, bigScreen,
}) {
  return (
    <div className={`w-full  ${bigScreen} p-4 relative`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative pb-2/3">
          <Image
            className="object-cover w-full h-[300px]"
            src={product.image}
            alt={product.title}
            width={1024}
            height={1024}
          />
        </div>
        <div className="py-4 px-6">
          <div className="flex flex-row justify-between">
            <h3 className="text-gray-800 font-semibold text-lg mb-2">{product.title}</h3>
            <div className="flex items-center mb-2">
              <div className="mr-2 text-yellow-400">
                <svg
                  className="fill-current w-4 h-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15.983l-6.16 3.557 1.483-7.303-4.672-4.042 7.222-.99L12 2.017l3.127 6.188 7.222.99-4.672 4.042 1.483 7.303z"
                  />
                </svg>
              </div>
              <div className="text-gray-600 text-sm">{product.rating}</div>
            </div>
          </div>
          <div className="font-bold text-xl mb-2">
            {product.price}
            {' '}
            €
          </div>
          <p className="text-gray-600 text-base">{product.description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => deleteDoc(doc(db, 'products', product.id))}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline absolute top-0 right-0"
      >
        Delete
      </button>
    </div>
  );
}

export default ProductCard;
