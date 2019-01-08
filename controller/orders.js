const {
  Router
} = require('express')
const router = Router()
const orderModel = require('../database/model/order')

router.post('/order', async (req, res) => {
  try {
    const { product, nums } = req.body
    const data = await orderModel.create({
      product,
      buyer: req.session.user._id,
      nums
    })
    res.json({
      code: 200,
      data,
      msg: '订单信息创建成功'
    })
  } catch (error) {
    res.json({
      code: 400,
      msg: '请求参数有误'
    })
  }
})

router.get('/order', async (req, res, next) => {
  try {
    let count = await orderModel.count()
    let {page = 1,page_size = 10} = req.body
    const data = await orderModel.find()
      .populate({
        path: 'uploader'
      })
      .populate({
        path: 'product'
      })
      .limit(page_size)
      .skip(page)

      res.json({
        code: 200,
        data,
        total: count,
        msg: '订单信息获取成功'
      })
  } catch (error) {
    
  }
})

module.exports = router