import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mycm() {
  const [products, setProducts] = useState([]);
  const [uniqueProductIds, setUniqueProductIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // 每頁顯示的資料數量

  // 找網頁的登入帳號
  const useract = localStorage.getItem('userInfo');
  // 確認 userInfo 的值不是空值（null）再進行 slice 操作
  const user = useract ? useract.slice(1, -1) : '';

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/mypro/${user}`);
        const products = response.data;
        setProducts(products);
        // Extract unique productIds
        const uniqueIds = Array.from(new Set(products.map((product) => product.productId)));
        setUniqueProductIds(uniqueIds);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [user]);
  
  // 輔助函數：限製商品名稱的字數並插入換行符
  function limitProductName(productName) {
    const maxChars = 6; // 最大字數限制
    if (productName.length <= maxChars) {
      return productName;
    }
    const truncated = productName.substr(0, maxChars);
    const remainder = productName.substr(maxChars);
    return (
      <>
        {truncated}
        <br />
        {remainder}
      </>
    );
  }

  // 計算當前頁面的資料
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = uniqueProductIds.slice(indexOfFirstProduct, indexOfLastProduct);

  // 換到下一頁
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // 換到上一頁
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="tbscss">
      <table className="order-table">
        <thead>
          <tr>
            <th>商品圖片</th>
            <th>商品</th>
            <th>租金</th>
            <th>押金</th>
            <th>總金額</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((productId) => {
            const productDetails = products.find((product) => product.productId === productId);
            if (!productDetails) return null;
            const { productName, rent, deposit, imageSrc, rentalStatus } = productDetails;
            // state === 0 就是未出租，反之為出租中
            // const statusText = state === 0 ? "未出租" : "出租中";
            return (
              <tr key={productId}>
                <td>
                  <img
                    id="proimg"
                    src={`http://localhost:8000/img/${imageSrc}`}
                    alt=""
                  />
                </td>
                <td>{limitProductName(productName)}</td>
                <td>{rent}</td>
                <td>{deposit}</td>
                <td>{rent + deposit}</td>
                {/* <td>{statusText}</td> */}
                <td>{rentalStatus}</td>
                <td>編輯</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btncon">
        <button id="back" onClick={prevPage} disabled={currentPage === 1}>
          上一頁
        </button>
        <button id="back" onClick={nextPage} disabled={currentProducts.length < productsPerPage}>
          下一頁
        </button>
      </div>
    </div>
  );
}

export default Mycm;