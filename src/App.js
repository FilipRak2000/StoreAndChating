import "./App.css";
import Menu from "./components/Menu/Menu";
import Logo from "./components/Header/Logo";
import Layout from "./components/Layout/Layout";
import AuthContext from "./context/authContext";
import { useEffect, useReducer} from "react";
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
import MyProfile from "./pages/Profile/Profile";
import { ChatContextProvider } from "./context/chatContext";



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logo = <Logo />;
  const menu = <Menu />;
  const content = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/myfiles"
        element={state.user ? <MyFiles /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/profile"
        element={state.user ? <MyProfile /> : <Navigate to={"/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/pricing" element={<Pricing/>} />
      <Route path="/register" element={<Register/>} />
      <Route
        path="/myfriends"
        element={state.user ? <MyFriends /> : <Navigate to={"login"} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: state.user,
          login: (user) => dispatch({ type: "login", user }),
          logout: () => dispatch({ type: "logout" }),
        }}
      >
        <ChatContextProvider>
        <Layout logo={logo} menu={menu} content={content} />
        </ChatContextProvider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
