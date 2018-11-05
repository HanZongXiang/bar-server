const { Router } = require('express')
const router = Router()
const journalismModel = require('../database/model/journalism')

router.post('/journalism', async (req, res) => {
  try {
    if (req.session.user) {
      const { title, content } = req.body
      console.log(req.body);
      if (title == '' || content == '' || title == undefined || content == undefined) {
        throw err
      }
      const data = await journalismModel.create({
        title,
        content,
        uploader: req.session.user._id
      })

      res.json({
        code: 200,
        data,
        msg: '上传新闻成功'
      })
    } else {
      res.json({
        code: 401,
        msg: '未登录状态不能添加新闻'
      })
    }
  } catch (error) {
    res.json({
      code: 400,
      msg: '请求参数有误'
    })
  }
})

module.exports = router