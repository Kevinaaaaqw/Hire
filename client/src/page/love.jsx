import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './lovetop.scss';

import LoveTop from '../components/love/lovetop';
import ProductLeft from '../components/product/productLeft';
import ProductCard from '../components/product/productCard';
import ProductSort from '../components/product/productSort';



function Love() {
    const [products, setProducts] = useState([]); //API
    const [sortMethod, setSortMethod] = useState(null); //排序
    const [sortDirection, setSortDirection] = useState('up'); //預設排序
  
    //取資料庫資料
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8000/api/products');
        const data = response.data;
        setProducts(data);
      };
      fetchProducts();
    }, []);
  
    //排序方法
    const handleSort = (method) => {
      if (method === sortMethod) {
        setSortDirection((sortDirection) =>
          sortDirection === 'up' ? 'down' : 'up'
        );
      } else {
        setSortMethod(method);
        setSortDirection('up');
      }
    };
  
    useEffect(() => {
      const sortingFunction = (a, b) => (sortDirection === 'up' ? a - b : b - a);
  
      const sortProducts = () => {
        if (sortMethod === 'rent') {
          setProducts((prevProducts) => [
            ...prevProducts.sort((a, b) => sortingFunction(a.rent, b.rent)),
          ]);
        } else if (sortMethod === 'latest') {
          setProducts((prevProducts) => [
            ...prevProducts.sort((a, b) =>
              sortingFunction(new Date(a.createTime), new Date(b.createTime))
            ),
          ]);
        }
      };
  
      sortProducts();
    }, [sortMethod, sortDirection]);
  
    //搜尋
    const [searchParams, setSearchParams] = useState({}); // 搜尋狀態
    const [filtere, setfiltere] = useState({}); //篩選
    const [filteredProducts, setFilteredProducts] = useState([]); // 過濾產品
    const handleSearchSubmit = (params) => {
      setSearchParams(params);
    };
    const handlefiltere = (filteres) => {
      setfiltere(filteres);
    };
    useEffect(() => {
      const filterProducts = () => {
        let filteredProducts = [...products];
  
        //金額過濾
        if (filtere.Lprice && filtere.Hprice) {
          filteredProducts = filteredProducts.filter((product) => {
            return (
              product.rent >= filtere.Lprice && product.rent <= filtere.Hprice
            );
          });
        }
  
        //運送方法
        // if (
        //   filtere.shippingMethod ||
        //   filtere.shippingMethod1 ||
        //   filtere.shippingMethod2 ||
        //   filtere.shippingMethod3
        // ) {
        //   filteredProducts = filteredProducts.filter((product) => {
        //     const shippingMethods = [
        //       filtere.shippingMethod,
        //       filtere.shippingMethod1,
        //       filtere.shippingMethod2,
        //       filtere.shippingMethod3,
        //     ];
  
        //     return shippingMethods.some((method) => {
        //       if (method && product.shippingMethod.includes(method)) {
        //         return true;
        //       }
        //       return false;
        //     });
        //   });
        // }
  
        //出租狀態過濾
        if (filtere.rentalStatus || filtere.rentalStatus1) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.rentalStatus === filtere.rentalStatus ||
              product.rentalStatus === filtere.rentalStatus1
          );
        }
  
        //關鍵字過濾
        if (searchParams.productName) {
          filteredProducts = filteredProducts.filter((product) =>
            product.productName.includes(searchParams.productName)
          );
        }
  
        //類別區域過濾
        const types = [
          'cityCounty',
          'area',
          'productCategoryID',
          'productCategoryChild',
        ];
        types.forEach((type) => {
          if (searchParams[type]) {
            filteredProducts = filteredProducts.filter(
              (product) => product[type] === searchParams[type]
            );
          }
        });
  
        setFilteredProducts(filteredProducts);
      };
  
      filterProducts();
    }, [searchParams, products, filtere]);
  
    //分頁
    const [currentPage, setCurrentPage] = useState(1); // 當前頁數
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    // 根據當前頁數來計算需要顯示的產品卡片
    const itemsPerPage = 9;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  
    return (
      <>
       {/* <Navbar2/> */}
        <LoveTop onSearchSubmit={handleSearchSubmit} />
        <div className="container">
          <div className="product">
            <div className="rental">
              <ProductLeft onfiltereSubmit={handlefiltere} />
              <ProductSort onSort={handleSort} />
              <div className="rental-body">
                <div className="row rental-goods" id="list-wrapper">
                  {displayedProducts.map((product) => (
                    <Link key={product.productId} target="_blank" className="col-md-4 pd-link" to={`/productItem/${product.productId}`}>
                      <ProductCard  product={product} />
                    </Link>
                  ))}
                </div>
                <Pagination
                  defaultCurrent={currentPage}
                  total={filteredProducts.length}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <Footer/> */}
      </>
    );
  }

  export default Love;