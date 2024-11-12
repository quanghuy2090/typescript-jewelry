import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { Users } from "../interfaces/User";
import { Products } from "../interfaces/Products";
import { Cart } from "../interfaces/Cart";

const ProductDetail = () => {
  const { state, getDetail } = useContext(ProductContext);
  const { id } = useParams();
  if (id) {
    useEffect(() => {
      getDetail(id);
    }, [id]);
  }
  const [user, setUser] = useState({} as Users);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
    console.log(!!user);
  }, []);

  const addToCart = (product: Products) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item: Cart) => item.id === product.id);

    if (index === -1) {
      cart.push({ ...product, quantity: quantity });
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Add Successfully!");
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="container pro_detail">
        {" "}
        {state.selectedProduct && <h1>{state.selectedProduct.title}</h1>}
        {/* content */}
        <section className="py-5">
          <div className="container">
            <div className="row gx-5">
              <div className="col-lg-6">
                <div className="rounded-4 d-flex justify-content-center">
                  {state.selectedProduct && (
                    <img
                      width={400}
                      className="rounded-4 img-detail"
                      data-type="image"
                      src={state.selectedProduct.thumbnail}
                    />
                  )}
                </div>
                {/* thumbs-wrap.// */}
                {/* gallery-wrap .end// */}
              </div>
              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <div className="mb-3 price-detail">
                    {state.selectedProduct && (
                      <h1>${state.selectedProduct.price}</h1>
                    )}
                    
                  </div>

                  {state.selectedProduct && (
                    <h5 className="des-detail">{state.selectedProduct.description}</h5>
                  )}

                  <hr />
                  <div className="row mb-4"></div>
                  <div className="d-flex align-items-center justify-content-start mb-3">
                    <button
                      className="btn btn-quantity btn-auth me-2"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <h3 className="m-3">{quantity}</h3>
                    <button
                      className="btn btn-quantity btn-auth ms-2"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  {state.selectedProduct && (
                    <a
                      href="#"
                      className="btn btn-auth d-flex justify-content-start shadow-0 "
                      onClick={
                        user?.email
                          ? () => addToCart(state.selectedProduct!)
                          : () => alert("Please login to add to cart")
                      }
                    >
                      Add to cart
                    </a>
                  )}
                </div>
              </main>
            </div>
          </div>
        </section>
        {/* content */}
      </div>

      {/* <h1>Chi tiet san pham</h1>
      {state.selectedProduct && <h2>{state.selectedProduct.title}</h2>}
      {state.selectedProduct && <img src={state.selectedProduct.thumbnail} alt="" />}
    </div> */}
    </>
  );
};

export default ProductDetail;
