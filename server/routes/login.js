var express = require('express');
var router = express.Router();
var coon = require('./db');
var bcrypt = require('bcrypt');

//註冊
//驗證帳號
router.post('/api/register/account', (req, res) => {
  const query = 'SELECT * FROM userinfo WHERE account = ?'
  const { username } = req.body;
  coon.query(query, [username], (err, data) => {

    if (data.length > 0) {
      // 有重複帳號
      res.status(409).json({ error: '帳號已經存在' });
    } else {
      res.status(200).json({ message: '帳號可以使用' });
    }
  });


})
//驗證身分證
router.post('/api/register/validate', (req, res) => {
  const query = 'SELECT * FROM userinfo WHERE identityCard = ? OR email = ? OR phoneNumber = ?';
  const { identityCard, email, phoneNumber } = req.body;
  const duplicateData = {};

  coon.query(query, [identityCard, email, phoneNumber], (err, data) => {
    if (err) {
      
      res.status(500).json({ error: '伺服器內部錯誤' });
    } else {
      if (data.length > 0) {
        if (data.some((cheak) => cheak.identityCard === identityCard)) {
          duplicateData.identityCard = '身分證重複';
        }
        if (data.some((cheak) => cheak.email === email)) {
          duplicateData.email = 'email重複';
        }
        if (data.some((cheak) => cheak.phoneNumber === phoneNumber)) {
          duplicateData.phoneNumber = '手機號碼重複';
        }
        res.status(409).json({ error: '以下字段重複使用', duplicateData });
      } else {
        res.status(200).json({ message: '資訊可使用' });
      }
    }
  });
});

router.post('/api/register', async (req, res) => {
  const { aldata } = req.body;
  const a = 10;

  try {
    const salt = await bcrypt.genSalt(a);
    const hashedPassword = await bcrypt.hash(aldata.password, salt);
    const sql = `INSERT INTO userinfo (account, password, phoneNumber, identityCard, email, salt, nickname, gender, name, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    coon.query(
      sql,
      [
        aldata.username,
        hashedPassword,
        aldata.phoneNumber,
        aldata.identityCard,
        aldata.email,
        salt,
        aldata.nickname,
        aldata.gender,
        aldata.name,
        aldata.birthday,
      ],
      (error, results) => {
        if (error) {
          console.error('資料庫操作錯誤', error);
          res.status(500).send('資料庫操作錯誤');
        } else {
          console.log('資料插入成功');
          res.send('OK');
        }
      }
    );
  } catch (error) {
    console.error('加密密碼時發生錯誤', error);
    res.status(500).send('加密密碼時發生錯誤');
  }
});







//登入
router.post('/api/login', async (req, res) => {
  const { account, password } = req.body;
  const query = 'SELECT * FROM userinfo WHERE account = ?';

  coon.query(query, [account], async (err, results) => {
    if (err) {
      console.error('錯誤', err);
      res.status(500).send(' Server ErrorQQ');
    } else if (results.length > 0) {
      const hashedPassword = results[0].password;

      // 使用 bcrypt 进行密码验证
      try {
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
          //成功
          res.status(200).send('okkk');
        } else {
          //失败
          res.status(401).send('nooo');
        }
      } catch (error) {
        console.error('錯誤', error);
        res.status(500).send('錯誤QQ');
      }
    } else {
      // 用户不存在
      res.status(401).send('nooo');
    }
  });
});

module.exports = router