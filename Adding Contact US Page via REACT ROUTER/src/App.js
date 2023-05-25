import './App.css';
import Header from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/layout/Footer';
import CartProvider from './components/Store/CartProvider'
import Routers from './components/Routers/Routers';


function App() {
  return (
    <Router>
      <CartProvider>
      <Header></Header>
      <Routers></Routers>
      <Footer></Footer>
     </CartProvider>
    </Router>
  );
}

export default App;
