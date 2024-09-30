import React, { useState, useEffect } from "react";
import { fetcher } from "../fetcher";

function ListOrder() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const Fetch = async () => {
      try {
        const res = await fetcher.get("/order/list");
        setOrderList(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    Fetch();
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      {orderList.length > 0 ? (
        orderList.map((order) => (
          <div
            key={order.id}
            className="w-full max-w-md p-4 mb-4 border border-gray-200 rounded-lg shadow-lg bg-white"
          >
            <div className="text-lg font-semibold text-gray-800">
              Order Date:{" "}
              <span className="font-normal">
                {new Date(order.orderDate).toLocaleString()}
              </span>
            </div>
            <div className="mt-2">
              <strong>Status:</strong>{" "}
              <span className="text-gray-600">
                {order.status || "No Status"}
              </span>
            </div>
            <div className="mt-2">
              <strong>Total Amount:</strong>{" "}
              <span className="text-gray-600">${order.totalAmount}</span>
            </div>
            <div className="mt-2">
              <strong>Customer:</strong>{" "}
              <span className="text-gray-600">
                {order.customer.name} (Age: {order.customer.age})
              </span>
            </div>
            <div className="mt-4">
              <strong>Order Items:</strong>
              {order.orderItems.length > 0 ? (
                <ul className="list-disc list-inside mt-2">
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item.name} - ${item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-600">No items in this order.</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No orders available.</p>
      )}
    </div>
  );
}

export { ListOrder };
