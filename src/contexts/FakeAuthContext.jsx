import { createContext, useContext, useReducer } from "react";

const Authcontext = createContext();
const initialState = {
  user: null,
  isLoged: false,
};
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isLoged: true };

    case "logout":
      return {
        ...state,
        user: null,
        isLoged: false,
      };
    default:
      throw new Error("Unknow action");
  }
}
function FakeAuthProvider({ children }) {
  const [{ user, isLoged }, dispatch] = useReducer(reducer, initialState);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
    console.log(isLoged);
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <Authcontext.Provider
      value={{
        user,
        isLoged,
        login,
        logout,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}
function useFakeAuth() {
  const context = useContext(Authcontext);
  if (context === undefined) throw new Error("There has been an error");
  return context;
}
export { FakeAuthProvider, useFakeAuth };
