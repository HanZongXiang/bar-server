const { Router } = require('express')
const router = Router()
const journalismModel = require('../database/model/journalism')

router.post('/journalism', async (req, res) => {
  try {
    if (req.session.user) {
      const { title, content,img } = req.body
      console.log(req.body);
      if (title == '' || content == '' || title == undefined || content == undefined) {
        throw err
      }
      const data = await journalismModel.create({
        title,
        content,
        img,
        uploader: req.session.user._id
      })

      res.json({
        code: 200,
        data,
        msg: '添加新闻成功'
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

router.get('/journalisms',async (req,res,next) => {
  try {
    let {
      page = 1, page_size = 10
    } = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)

    journalismModel.find()
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        _id: -1
      })
      .populate({
        path: 'uploader',
        select: '-password'
      })
      .then(data => {
        res.json({
          code: 200,
          data
        })
      })
  } catch (error) {
    next(error)
  }
})

router.get('/journalisms/:id', async (req, res, next) => {
  try {
    const {
      id
    } = req.params
    const data = await journalismModel.findById(id)
      .populate({
        path: 'uploader',
        select: '-password'
      })
      

    res.json({
      code: 200,
      msg: '获取单条新闻成功',
      data
    })
    await data.updateOne({
      $inc: {
        readnums: 1
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router