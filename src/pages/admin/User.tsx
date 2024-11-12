import { useContext } from "react";
//import { Users } from "../../interfaces/User";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

// type Props = {
//   product: Products[];
//   handleRemove: (id: number) => void;
// };

const User = () => {
  const { state, handleDelete } = useContext(UserContext);
  return (
    <>
      <h2>Admin Page</h2>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr className="table-success">
            <th>No.</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.user.map((item) => (
            <tr key={item.id} className="table-secondary">
              <td>{item.id}</td>
              <td>{item.email}</td>
              {/* <td>{item.password}</td> */}
              <td>
                <button
                  className="btn btn-warning m-2 w-75"
                  onClick={() => {
                    handleDelete(item.id!);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default User;
