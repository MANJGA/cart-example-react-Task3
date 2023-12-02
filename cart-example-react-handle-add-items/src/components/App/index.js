import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from '../MainPage';
import CartPage from '../CartPage';
import './app.css';
import Product from "../Product";

const App = () => {
  return <Router>
    <Routes>
      <Route
        path="/"
        exact
        element={<MainPage />}
      />
      <Route
        path="/cart"
        exact
        element={<CartPage />
        }
      />
      <Route
        path="/products/:id"
        exact
        element={<Product />}
      />
    </Routes>
  </Router>
}

export default App;