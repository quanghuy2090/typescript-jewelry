import React, { createContext, useEffect, useReducer } from "react";
import { Products } from "../interfaces/Products";
import { useNavigate } from "react-router-dom";
import instace from "../service/instace";
import ProductReducer from "../reducers/ProductReduce";
import { productSchema } from "../ultis/validation";

type ProductContextType = {
  state: {
    products: Products[];
    selectedProduct?: Products;
  };
  handleDelete: (id: number | string) => void;
  onSubmit: (product: Products) => void;
  getDetail: (id: number | string) => void;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

type Children = {
  children: React.ReactNode;
};

export const ProductProvider = ({ children }: Children) => {
  const nav = useNavigate();

  const [state, dispatch] = useReducer(ProductReducer, { products: [] });

  useEffect(() => {
    (async () => {
      const { data } = await instace.get(`/products`);
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure?")) {
      await instace.delete("/products/" + id);
      dispatch({ type: "REMOVE_PRODUCT", payload: id });
    }
  };

  const getDetail = async (id: number | string | undefined) => {
		const { data } = await instace.get(`/products/${id}`);
		dispatch({ type: "SET_SELECTED_PRODUCT", payload: data });
		return data;
	};

  const onSubmit = async (data: Products) => {
    try {
      if (data.id) {
        const res = await instace.patch(`/products/${data.id}`, data);
        dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
      } else {
        const res = await instace.post(`/products`, data);
        dispatch({ type: "ADD_PRODUCT", payload: res.data });
      }
      nav("/admin/product");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <ProductContext.Provider
      value={{ state, handleDelete, onSubmit, getDetail }}
    >
      {children}
    </ProductContext.Provider>
  );
};
