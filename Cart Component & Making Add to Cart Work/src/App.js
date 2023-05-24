import './App.css';
import Header from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

import CartProvider from './components/Store/CartProvider'

import Productlist from './components/products/productlist';

function App() {
  return (
    <Router>
      <CartProvider>
      <Header></Header>
     <Productlist></Productlist>
     </CartProvider>
    </Router>
  );
}

export default App;
