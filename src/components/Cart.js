import React, { useEffect, useState } from 'react';
import { useCart } from './CartProvider';
import { fetcher } from '../fetcher';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({ name: '', age: '' });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = Date.now()
    
    const totalPrice = getTotalPrice();

    const form = new FormData();

    form.append("orderDate", now);
    form.append("status", 'PENDING');
    form.append("totalAmount", `${totalPrice}`);
    

    const orderForm = new FormData();

    orderForm.append("order", new Blob([JSON.stringify(form)], {
      type: "application/json"
    }));

    orderForm.append("customer", new Blob([JSON.stringify(formData)], {
      type: "application/json"
    }));

    orderForm.append("orderItem", new Blob([JSON.stringify(cart)], {
      type: "application/json"
    }));

    try {
      fetcher.post('/order/create', orderForm, {
      headers: {
          "Content-Type": "multipart/form-data",
        }
    }).then(res => {
      console.log(res);
    })
    }catch(err) {
      console.log(err.message);
    }finally {
      clearCart();
      clearData();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
            <div className="text-right">
              <p>Total: ${item.price * item.quantity}</p>
              <button 
                className="ml-2 text-red-500" 
                onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Fill out your details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
            <input 
              type="number" 
              name="age" 
              id="age" 
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );

  function clearData() {
    setFormData({ name: '', age: '' })
  }
};

export { Cart };
