const { Router } = require('express')
const router = Router()
const goodsModel = require('../database/model/goods')

router.post('/goods', async (req, res) => {
  try {
    if (req.session.user) {
      const {
        name,
        img,
        price,
        desc,
        heat
      } = req.body
      if (name == '' || img == '' || price == '') {
        throw err
      }
      const data = await goodsModel.create({
        name,
        price,
        img,
        desc,
        heat,
        uploader: req.session.user._id
      })

      res.json({
        code: 200,
        data,
        msg: '添加商品成功'
      })
    } else {
      res.json({
        code: 401,
        msg: '未登录状态不能添加商品'
      })
    }
  } catch (error) {
    res.json({
      code: 400,
      msg: '请求参数有误'
    })
  }
})

router.get('/goods', async (req, res, next) => {
  try {
    let count = await goodsModel.count()
    let {
      page = 1, page_size = 10
    } = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)

    goodsModel.find()
      .skip((page - 1) * page_size)
      .limit(page_size)
      // .sort({
      //   _id: -1
      // })
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

router.post('/goods/delete', (req, res) => {
  const {
    id
  } = req.body
  goodsModel.findByIdAndDelete(id)
    .then(data => {
      res.json({
        code: 200,
        msg: '删除商品成功'
      })
    }).catch(err => {
      res.json({
        code: 400,
        err
      })
    })
})

module.exports = router