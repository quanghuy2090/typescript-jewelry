import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Section from "../components/Slide";
import { Users } from "../interfaces/User";
import { Products } from "../interfaces/Products";
import { Cart } from "../interfaces/Cart";

const Home = () => {
  const { state } = useContext(ProductContext);
  const [user, setUser] = useState({} as Users);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Products[]>(
    state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const currentProduct = 8;
  const firstIndexProduct = currentPage * currentProduct;
  const lastIndexProduct = firstIndexProduct - currentProduct;

  const totalProduct = filteredProducts.slice(
    lastIndexProduct,
    firstIndexProduct
  );

  useEffect(() => {
    setFilteredProducts(
      state.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, state.products]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
    console.log(!!user);
  }, []);

  const addToCart = (product: Products) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item: Cart) => item.id === product.id);
    if (index === -1) {
      cart.push({ ...product, quantity: 1 });
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Add Successfully!");
  };


  const totalPages = Math.ceil(filteredProducts.length / currentProduct);
  const numberPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Section />
      <div>
        <section className="shop_section layout_padding">
          <div className="container">
            <div className="heading_container heading_center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-5 w-50"
              />
              <h2>Latest Products</h2>
            </div>
            <div className="row">
              {totalProduct.map((item) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={item.id}>
                  <div className="box">
                    <div className="img-box">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.thumbnail} alt="" />
                      </Link>
                    </div>
                    <div className="detail-box">
                      <h6>
                        <Link to={`/product/${item.id}`}>{item.title}</Link>
                      </h6>
                      <h6>
                        Price:
                        <span> ${item.price}</span>
                      </h6>
                      <button
                        className="btn btn-auth"
                        onClick={
                          user?.email
                            ? () => addToCart(item)
                            : () => alert("Please login to add to cart")
                        }
                      >
                        Add to card
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="page text-center mt-4">
                <button
                  className="btn btn-light"
                  onClick={handlePrevious}
                  disabled={currentPage <= 1}
                >
                  Previous
                </button>
                {numberPages.map((page) => (
                  <button
                    key={page}
                    className={`btn btn-page ${
                      currentPage === page ? "btn-primary" : "btn-light"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="btn btn-light"
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
