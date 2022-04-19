const mysql = express('mysql')
const db = mysql.createPool({
    host : '127.0.0.1',
    user:'root',
    password:'admin123',
    database:'yeqing_schema'
})
module.exports = db