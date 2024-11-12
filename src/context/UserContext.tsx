import React, { createContext, useEffect, useReducer } from "react";
import { Users } from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import instace from "../service/instace";
import UserReducer from "../reducers/UserReduce";

type UserContextType = {
  state: {
    user: Users[];
    selectedUser?: Users;
  };
  handleDelete: (id: number | string) => void;
  getDetail: (id: number | string) => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

type Children = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Children) => {
  const nav = useNavigate();

  const [state, dispatch] = useReducer(UserReducer, { user: [] });

  useEffect(() => {
    (async () => {
      const { data } = await instace.get(`/users`);
      dispatch({ type: "SET_USER", payload: data });
    })();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure?")) {
      await instace.delete("/users/" + id);
      dispatch({ type: "REMOVE_USER", payload: id });
      setTimeout(()=> {
        window.location.href = '/admin/user'
      },300)
    }
  };

  const getDetail = async (id: number | string) => {
    const { data } = await instace.get(`/users/${id}`);
    dispatch({ type: "SET_SELECTED_USER", payload: data });
  };

  return (
    <UserContext.Provider value={{ state, handleDelete, getDetail }}>
      {children}
    </UserContext.Provider>
  );
};
