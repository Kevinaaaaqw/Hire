import React from 'react';
import Appealbtn from './actbtn/appealbtn';
import Cancelbtn from './actbtn/cancelbtn';
import { Link } from 'react-router-dom';

const OrderDetailCommon = ({ tradeitemId, tradeitems, type, handleBack, showCancelBtn }) => {
  // 根据 tradeitemId 过滤出包含相同 tradeitemId 的详细信息
  const details = tradeitems.filter((tradeitem) => tradeitem.tradeitemId === tradeitemId);
  const uniqueAccounts = Array.from(new Set(details.map((detail) => detail[type])));

  return (
    <div className="tbscss">
      {uniqueAccounts.map((account) => {
        const products = details.filter((detail) => detail[type] === account);
        const { state } = products[0]; // 获取第一个产品的状态

        // 判斷資料的state，決定要顯示什麼button
        let buttonComponent = null;
        if (state === 3) {
          buttonComponent = <Appealbtn />;
        } else if (state === 0 && showCancelBtn) {
          buttonComponent = <Cancelbtn tradeitemId={tradeitemId} />;
        }

        return (
          <div key={account}>
            <div id="trititle">
              <div id="tridet">
                <p>
                  {type === 'account' ? '承租人' : <Link to={`http://localhost:3000/productSeller/${account}`}><img className='proimg' src='/images/icon/user-interface 4.png' alt=''></img></Link>}
                  {account}
                </p>
                <p>訂單編號 {tradeitemId}</p>
              </div>
              {buttonComponent}
            </div>
            <table className="order-table">
              <thead>
                <tr>
                  <th>商品圖片</th>
                  <th>商品</th>
                  <th>預約日期</th>
                  <th>歸還日期</th>
                  <th>天數</th>
                  <th>租金(天)</th>
                  <th>押金</th>
                  <th>總金額</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <img
                        id="proimg"
                        src={`http://localhost:8000/img/${item.imageSrc}`}
                        alt=""
                      />
                    </td>
                    <td>{limitProductName(item.productName)}</td>
                    <td>{new Date(item.rentStart).toLocaleDateString()}</td>
                    <td>{new Date(item.rentEnd).toLocaleDateString()}</td>
                    <td>{calculateDays(item.rentStart, item.rentEnd)}</td>
                    <td>{item.rent}</td>
                    <td>{item.deposit}</td>
                    <td>{calculateDays(item.rentStart, item.rentEnd) * item.rent + item.deposit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
      <button id="back" onClick={handleBack}>
        返回
      </button>
    </div>
  );
};

// 輔助函數：限制商品名稱的字數並插入換行符
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

// 輔助函數：計算日期之間的天數差
function calculateDays(rentStart, rentEnd) {
  const start = new Date(rentStart);
  const end = new Date(rentEnd);
  const timeDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // 计算天数

  return timeDiff;
}

export default OrderDetailCommon;