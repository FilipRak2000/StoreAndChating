import "./App.css";
import Menu from "./components/Menu/Menu";
import Logo from "./components/Header/Logo";
import About from "./components/About/About";
import Layout from "./components/Layout/Layout";
import AuthContext from "./context/authContext";
import { useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { reducer, initialState } from "./reducer";
import Home from "./pages/Home/Home";
import MyFiles from "./pages/MyFiles/MyFiles";
import Profile from "./components/Profile/Profile";
import MyFriends from "./pages/MyFriends/MyFriends";
import NotFound from "./pages/404/404";
import Login from "./pages/Auth/Login/Login";
import Pricing from "./pages/Pricing/Pricing";
import Register from "./pages/Auth/Register/Register";


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logo = <Logo />;
  const menu = <Menu />;
  const content = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/myfiles"
        element={state.Auth ? <MyFiles /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/profile"
        element={state.Auth ? <Profile /> : <Navigate to={"/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/pricing" element={<Pricing/>} />
      <Route path="/register" element={<Register/>} />
      <Route
        path="/myfriends"
        element={state.Auth ? <MyFriends /> : <Navigate to={"login"} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isAuth: state.Auth,
          login: () => dispatch({ type: "login" }),
          logout: () => dispatch({ type: "logout" }),
        }}
      >
        <Layout logo={logo} menu={menu} content={content} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
