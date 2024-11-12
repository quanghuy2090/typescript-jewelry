import { useState, useEffect } from "react";
import { Order } from "../interfaces/Order";
//import { Cart } from "../interfaces/Cart";

const OrderPage = () => {
  const [bill, setBill] = useState<Order[]>([]);

  useEffect(() => {
    const savedBill = localStorage.getItem("bills");
    if (savedBill) {
      setBill(JSON.parse(savedBill));
    }
  }, []);
  console.log(bill);

  const removeItemFromOrder = (orderId: number, itemId: number | string) => {
    const updatedBill = bill.map((order) => {
      if (order.id === orderId) {
        const updatedItems = order.cart.filter((item) => item.id !== itemId);
        return { ...order, items: updatedItems };
      }
      return order;
    });

    const filteredBill = updatedBill.filter((order) => order.cart.length > 0);

    setBill(filteredBill);
    localStorage.setItem("bills", JSON.stringify(filteredBill));
    alert("Item removed from order successfully");
  };

  return (
    <div className="container mt-5">
      <h2 className="m-5">Order</h2>
      {bill.length === 0 ? (
        <p className="">No orders found.</p>
      ) : (
        <div>
          {bill.map((order) => (
            <div key={order.id} className="order">
              <div className="">
                <h4 className="d-flex justify-content-start align-item-center">
                  Order ID: {order.id}
                </h4>
                <h5 className="d-flex justify-content-start align-item-center">
                  Date: {order.date}
                </h5>
                <p className="d-flex justify-content-start align-item-center">
                  Name: {order.cart.length > 0 ? order.cart[0].name : 'N/A'}
                </p>
                <p className="d-flex justify-content-start align-item-center">
                  Address: {order.cart.length > 0 ? order.cart[0].address : 'N/A'}
                </p>
                <p className="d-flex justify-content-start align-item-center">
                  Phone Number: {order.cart.length > 0 ? order.cart[0].phone : 'N/A'}
                </p>
              </div>
              <table className="table mt-2 mb-2 table-bordered">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cart.map((item) => (
                    <tr key={item.title}>
                      <td>{item.title}</td>
                      <td>
                        <img
                          width={100}
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${item.price * item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            removeItemFromOrder(order.id, item.id!)
                          }
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
