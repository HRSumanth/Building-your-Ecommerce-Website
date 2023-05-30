import './App.css';
import Header from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/layout/Footer';
import CartProvider from './components/Store/CartProvider'
import Routers from './components/Routers/Routers';
import { AuthContextProvider } from './components/Store/AuthContext';


function App() {
  return (
    <Router>
      <CartProvider>
        <AuthContextProvider>
          <Header></Header>
          <Routers></Routers>
          <Footer></Footer>
        </AuthContextProvider>
     </CartProvider>
    </Router>
  );
}

export default App;
