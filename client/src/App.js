
import Navbar from './Component/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Itempage from './pages/Itempage'
import { Route, Routes } from 'react-router-dom'
import Mainstates from './Context/Mainstates'
import Searchresult from './pages/Searchresult'
import Login from './Component/Login'
import Signup from './Component/Signup'

function App() {
  return (
    <>
      <Mainstates>
        <Navbar />
        
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/wishlist' element={<Wishlist />} />
            <Route exact path='/searchresult' element={<Searchresult />} />
            <Route exact path='/itempage' element={<Itempage />} />
            <Route exact path='/Login' element={ <Login/>} />
            <Route exact path='/SignUp' element={ <Signup/>} />
          </Routes>
       
      </Mainstates>
    </>
  );
}

export default App;
