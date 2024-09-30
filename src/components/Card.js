import React from 'react';
import { useCart } from './CartProvider';

const Card = ({ product }) => {
  const {addToCart} = useCart();
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        className="w-full object-cover h-48"
        src={product.image_url}
        alt={product.name}
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl text-gray-900 mb-2">{product.name}</h2>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-lg font-semibold text-gray-900">Price: ${product.price}</p>
        {product.discount && (
          <p className="text-lg font-semibold text-green-500">
            Discount: {product.discount}
          </p>
        )}
        <p className={`text-lg font-semibold ${product.stock === "In Stock" ? 'text-green-500' : 'text-red-500'}`}>
          Stock: {product.stock}
        </p>
        <button className='border-2 bg-black text-white p-1 rounded-md' onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
      
    </div>
  );
};

export { Card };
