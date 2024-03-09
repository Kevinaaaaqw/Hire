const express = require('express');
const router = express.Router();
const coon = require('./db');

router.use(express.json());

router.get('/api/mypro/:account', function (req, res) {
  const account = req.params.account;
  console.log(req.params)
  const query = `
    SELECT p.productId, p.rent, p.deposit, p.productName, p.rentalStatus, p.state, i.imageSrc
    FROM product AS p
    INNER JOIN imagemap AS i ON p.productId = i.productId
    WHERE p.productAccount = ? 
  `;
  coon.query(query, [account], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Route to insert data into "product" table
router.post('/api/mypro', function (req, res) {
  const formData = req.body; // This will contain the form data sent from the frontend
  console.log(formData);

  const {
    productName, rent, deposit, rentalStatus, productAccount, productCategoryChild,
    cityCounty, area, productDetail
    // Add other form fields here if needed...
  } = formData;

  // Insert data into "product" table
  const productInsertQuery = `
    INSERT INTO product (productName, rent, deposit, rentalStatus, productAccount, productCategoryChild, cityCounty, area, productDetail)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  coon.query(
    productInsertQuery,
    [
      productName, rent, deposit, rentalStatus, productAccount, productCategoryChild,
    cityCounty, area, productDetail
    ],
    function (error, productResults) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Assuming you have the newly inserted productId in "productResults.insertId"
        const productId = productResults.insertId;

        // Insert data into "imagemap" table
        const imageInsertQuery = `
          INSERT INTO imagemap (imageSrc, productId)
          VALUES (?, ?)
        `;

        coon.query(
          imageInsertQuery,
          ['your_image_src', productId], // Replace 'your_image_src' with the actual image source
          function (error, imageResults) {
            if (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              // Assuming you have the newly inserted imageId in "imageResults.insertId"
              const imageId = imageResults.insertId;

              // Insert data into "productcategorymap" table
              const categoryInsertQuery = `
                INSERT INTO productcategorymap (productCategoryChild, productCategoryId)
                VALUES (?, ?)
              `;

              coon.query(
                categoryInsertQuery,
                [productCategoryChild, 'your_product_category_id'], // Replace 'your_product_category_id' with the actual product category ID
                function (error, categoryResults) {
                  if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                    res.json({ message: 'Data received and saved to database.' });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});;

router.get("/api/myorder/:account", function (req, res) {
  const account = req.params.account;
  const query = `
    SELECT t.tradeitemId, t.account, t.productAccount, t.state, m.rentStart, m.rentEnd, p.productName, p.rent, p.deposit, i.imageSrc
    FROM tradeitem AS t
    INNER JOIN tradeitemmap AS m ON t.tradeitemId = m.tradeitemId
    INNER JOIN product AS p ON m.productId = p.productId
    INNER JOIN imagemap AS i ON p.productId = i.productId
    WHERE t.account = ?
    GROUP BY p.productId
    ORDER BY t.tradeitemId
  `;
  coon.query(query, [account], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

router.get('/api/myrent/:productAccount', function (req, res) {
  const productAccount = req.params.productAccount;
  const query = `
    SELECT t.tradeitemId, t.account, t.productAccount, t.state, m.rentStart, m.rentEnd, p.productName, p.rent, p.deposit, i.imageSrc
    FROM tradeitem AS t
    INNER JOIN tradeitemmap AS m ON t.tradeitemId = m.tradeitemId
    INNER JOIN product AS p ON m.productId = p.productId
    INNER JOIN imagemap AS i ON p.productId = i.productId
    WHERE t.productAccount = ?
    GROUP BY p.productId
    ORDER BY t.tradeitemId
  `;
  coon.query(query, [productAccount], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

router.post("/api/cancelOrder", function (req, res) {
  const { tradeitemId } = req.body;
  // 檢查 tradeitemId 的值
  console.log("Received tradeitemId:", tradeitemId);

  const updateQuery = "UPDATE tradeitem SET state = 4 WHERE tradeitemId = ?";
  coon.query(updateQuery, [tradeitemId], function (error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Order canceled successfully" });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    }
  });
});

router.post('/api/agreeOrder', function (req, res) {
  const { tradeitemId } = req.body;

  // 使用 JOIN 來執行兩個更新動作
  const updateQuery = `
    UPDATE tradeitem AS t
    JOIN tradeitemmap AS tm ON t.tradeitemId = tm.tradeitemId
    JOIN product AS p ON tm.productId = p.productId
    SET t.state = 1,
        p.rentalStatus = "出租中"
    WHERE t.tradeitemId = ?
  `;

  coon.query(updateQuery, [tradeitemId], function (error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error occurred while updating tradeitem and product' });
    } else {
      res.status(200).json({ message: 'Order canceled successfully' });
    }
  });
});

module.exports = router;