import { useState, useContext, useEffect } from "react";
import { Cart } from "../interfaces/Cart";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const CartPage = () => {
  const nav = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showQRCode, setShowQRCode] = useState(true);
  const { state } = useContext(UserContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [cart, setCart] = useState<Cart[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((acc: number, item: Cart) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalPrice(Math.round(total * 100) / 100);
    }
  }, []);
  const handlePayment = () => {
    const bill = { state, cart, totalPrice, customerInfo };
    
    let billsArray = JSON.parse(localStorage.getItem("bills") || "[]");
    billsArray.push(bill);
    
    localStorage.setItem("bills", JSON.stringify(billsArray));
    
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to the cart before ordering.");
      return;
    } else {
      localStorage.removeItem("cart");
      setShowQRCode(false);
      alert("Thanh toan thanh cong!");
      nav("/order");
    }
  };

  const removeFromCart = (id: string | number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };


  return (
    <div className="container cart">
      <h1 className="m-3">Cart</h1>
      <table className="table table-striped table-bordered ">
        <thead>
          <tr>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sum</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item: Cart) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td><img src={item.thumbnail} alt="" width={80} /></td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-auth"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h1>No Cart !</h1>
          )}
        </tbody>
      </table>
      <div>
        <div className="cart-total mt-5">
          <h3 className="me-3">Total:</h3>
          <h3>  ${totalPrice || ""}</h3>
        </div>
        <h4>Customer Information</h4>
        <div className="container">
          <div className="">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              className="form-control mb-2"
            />
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              className="form-control mb-2"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
        </div>
        <span>
          <button className="btn btn-auth" onClick={() => handlePayment()}>
            Thanh toan
          </button>
          {showQRCode && <img src="/images/qrcode-default.png" width={200} />}
        </span>
      </div>
    </div>
  );
};
export default CartPage;
