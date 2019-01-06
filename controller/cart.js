const {
  Router
} = require('express')
const router = Router()
const cartModel = require('../database/model/cart')

router.post('/cart', async (req, res) => {
  try {
    let { product,productNum } = req.body;
    let user = req.session.user._id;
    let response = await cartModel.create({
      user,
      product,
      productNum,
      checked: true
    })
    res.json({
      code: 200,
      response,
      msg: '加入购物车成功'
    })
  } catch (error) {
    res.json({
      code: 400,
      msg: '请求参数有误'
    })
  }
})

router.get('/cart/user', async (req, res) => {
  try {
    let user = req.session.user._id
    const data = await cartModel.find({user})
      .populate({
        path: 'product'
      })
    res.json({
      code: 200,
      data
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/cartSettlement', async (req, res, next) => { // 删除轮播图
  try {
    const {
      ids
    } = req.body
    const deleteData = await cartModel.deleteMany({
      _id: {
        $in: ids
      }
    })
    if (deleteData.n) {
      res.json({
        code: 200,
        msg: `删除成功${deleteData.n}条数据`,
        deleteData
      })
    } else {
      res.json({
        code: 201,
        msg: '请先选择需要结算的商品'
      })
    }
    
  } catch (err) {
    next(err)
  }
})

module.exports = router