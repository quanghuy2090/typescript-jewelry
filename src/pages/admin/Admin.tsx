import { useContext } from "react";
import { Products } from "../../interfaces/Products";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

// type Props = {
//   product: Products[];
//   handleRemove: (id: number) => void;
// };

const Admin = () => {
  const { state, handleDelete } = useContext(ProductContext);
  return (
    <>
      <h2>Admin Page</h2>
      <Link to="/admin/add" className="btn btn-primary m-2">
        Add Product
      </Link>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr className="table-success">
            <th>No.</th>
            <th>Name</th>
            <th>Thumbnail</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((item) => (
            <tr key={item.id} className="table-secondary">
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <img src={item.thumbnail} width={100} height={100} alt="" />
              </td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>${item.price}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="btn btn-warning m-2 w-75"
                  onClick={() => {
                    handleDelete(item.id!);
                  }}
                >
                  Delete
                </button>
                <Link to={`/admin/update/${item.id}`} className="btn btn-info m-2">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
