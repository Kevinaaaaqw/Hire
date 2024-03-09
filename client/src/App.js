import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery'
import 'jquery-ui/dist/jquery-ui'
import 'jquery-ui-css/jquery-ui'



// 其他引入的組件

//#
import Home from './page/home';
import Navbar2 from './components/Home/navbar2/navbar2';
import Footer from './components/Home/footer/footer';

//阿條
import Up from './components/up/up'; //快速上架
import Login from './components/login/login';
import Registration from './components/register/register';
import MemberCenter from './components/PersonalData/Personaldata';

//日立
import Product from './page/product'; //商品一覽
import ProductItem from './page/productItem'; //商品頁面
import ProductSeller from './page/productSeller'; //賣家頁面
import ProductCollect from './page/productCollect'; //收藏

//酋長
import Cart from "./components/cart/index";

//阿宋
import Aboutus from './page/aboutus';
import Order from './page/order';
import Cmmgmt from './page/cmmgmt';

import NotFound from './page/NotFound';

const App = () => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);



  return (
    <>
      <Router>

        {show && <Navbar2 />}
        {/* <Navbar2 /> */}
        <Routes>
          <Route path="/RegistrationForm" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

          <Route path="/up" element={<Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegistrationForm" element={<Registration />} />
          <Route path="/Member" element={<MemberCenter />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/product" element={<Product />} />
          <Route path='/productItem/:id' element={<ProductItem />} />
          <Route path='/productSeller/:account' element={<ProductSeller />} />
          <Route path='/productCollect/:account' element={<ProductCollect />} />

          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cmmgmt" element={<Cmmgmt />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        {show && <Footer />}
        {/* <Footer /> */}
      </Router>
    </>
  );
};

export default App;