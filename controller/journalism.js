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
    let count = await journalismModel.count()
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
          total: count,
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
      .populate({
        path: 'comment'
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

router.post('/journalism/delete',(req,res) => {
  const {id} = req.body
  journalismModel.findByIdAndDelete(id)
    .then(data => {
      res.json({
        code: 200,
        msg:'删除新闻成功'
      })
    }).catch(err => {
      res.json({
        code: 400,
        err
      })
    })
})

router.patch('/journalism/:_id',async (req,res,next) => {
  try {
    const {_id} = req.params
    let {
      title,
      content,
      img
    } = req.body;
    const data = await newsModel.findById({_id})
    const updateData = await data.updateOne({
      $set: {
        title,
        content,
        img
      }
    })
    res.json({
      code: 200,
      msg: '新闻信息修改成功',
      data: updateData
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router