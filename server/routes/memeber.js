var express = require('express');
var router = express.Router();
var coon = require('./db');

router.get('/api/members/:account', (req, res) => {
    const memberData = req.body;
    const selectQuery = `SELECT * FROM userinfo WHERE account = ?`;

    coon.query(
        "SELECT * FROM userinfo WHERE account=?",
        [req.params.account],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    );
});


router.put('/api/members/account', (req, res) => {
    const updatedData = req.body;
    console.log(updatedData);


    const update = `UPDATE userinfo 
    SET name = ?,
    birthday = ?,
    nickname = ?, 
    gender = ?,
    identityCard = ?,
    phoneNumber = ?,
    email = ?
    WHERE account = ?`;
    coon.query(update, [
        req.body.name,
        updatedData.birthday,
        updatedData.nickname,
        updatedData.gender,
        updatedData.identityCard,
        updatedData.phoneNumber,
        updatedData.email,
        updatedData.account
    ], (err, result) => {
        if (err) {
            console.error('数据库错误:', err);
            res.status(500).json({ message: '数据库错误' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json(updatedData);
            } else {
                res.status(404).json({ message: '用户不存在' });
            }
        }
    });
});


module.exports = router