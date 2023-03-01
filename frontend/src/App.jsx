import { Route, Routes } from "react-router";
import AdminNavigationBar from "./components/adminNavigationBar";
import InfoBlock from "./components/infoBlock";
import NavigationBar from "./components/navigationBar";
import About from "./pages/about";
import Admin from "./pages/admin";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Login from "./pages/login";
import Menu from "./pages/menu";
import Orders from "./pages/orders";
import ProductListing from "./pages/productListing";
import Profile from "./pages/profile";
import SignUp from "./pages/signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavigationBar />
              <Home />
              <InfoBlock />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <NavigationBar />
              <SignUp />
              <InfoBlock />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <NavigationBar />
              <Login />
              <InfoBlock />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <NavigationBar />
              <Profile />
              <InfoBlock />
            </>
          }
        />
        <Route
          path="/menu"
          element={
            <>
              <NavigationBar />
              <Menu />
              <InfoBlock />
            </>
          }
        />
        <Route
          path="/orders/*"
          element={
            <>
              <NavigationBar />
              <Orders />
              <InfoBlock />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <NavigationBar />
              <Cart />
              <InfoBlock />
            </>
          }
        />

        <Route
          path="/products/:productId"
          element={
            <>
              <NavigationBar />
              <ProductListing />
              <InfoBlock />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <NavigationBar />
              <About />
              <InfoBlock />
            </>
          }
        />
        <Route
          path="/admin/*"
          element={
            <>
              <AdminNavigationBar />
              <Admin />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
