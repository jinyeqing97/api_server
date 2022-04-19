const db = require('../db/index')
const { regUser } = require('./user')


exports.getArticleCates = (req,res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql,(err,results) => {
        if (err) return res.cc(err)
        res.send({
            status:0,
            message:'获取文章分类列表成功！',
            data:results,
        })
    }) 
}
exports.addArticleCates = (req,res) => {
    const sql = 'select * form ev_article_cate where name = ? or alias = ? '
    db.query(sql,[req.body.name,req.body.alias],(err,results) => {
        if (err ) return res.cc(err)
        // 不同目录下一个是名称一个是别名
        if (results.length ===2) return res.cc('分类名称与别名都被占用，请更换后再试')
        // 相同目录下别名和名称都被占用
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc('分类名称与别名被占用，请修改重试')
        } 
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用请修改再试！')
        if (results.length === 1 && results[0].alias === req.body.alias ) return res.cc('别名被占用，请修改再试')
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql,req.body,(err,results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功',0)
        })
    })
}
exports.deleteCateById = (req,res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id = ? '
    db.query(sql,res.params.id,(err,results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章分类成功',0)
    })
}
exports.getArticleById = (req,res) => {
    const sql = 'select * from ev_ev_article_cate where id = ?'
    db.query(sql,req.params.id,(err,results) => {
        if (err) return res.cc(err)
        if (results.length !==1) return res.cc('获取文章分类数据失败！')
        res.send({
            status:0,
            message:'获取文章分类数据成功！',
            data:results[0],
        })
    })
}
exports.updateArticleById = (req,res) => {
    const sql = 'select * from ev_article_cate where Id <>? and name =? or alias = ?'
    db.query(sql,[req.body.id,req.body.name,,req.body.alias] , (req,req) => {
        if (err) return res.cc(err)
        if (results.length == 2) return res.cc('分类名称和分类别名被占用，请更改后重试！')
        if (results.length == 1 && results[0].name == req.body.name) return res.cc('分类名称被占用，请修改后重试！')
        if (results.length == 1 && results[0].alias == req.body.alias) return res.cc('别名被占用，请修改后重试！')
        const sql = 'update ev_article_cate set ? where id = ?'
        db.query(sql,[req.body,req.body.id] , (err, results) => {
            if (err) return res.cc(err)
            if (affectedRows !== 1) return res.cc('更改分类名称和别名失败！')
            res.cc('更改分类名称和别名成功！')
    })
    })
}