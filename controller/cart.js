const {
  Router
} = require('express')
const router = Router()
const cartModel = require('../database/model/cart')

router.post('/cart', async (req, res) => {
  try {
    let { product,total } = req.body;
    let user = req.session.user._id;
    let response = await cartModel.create({
      user,
      product,
      total
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

router.delete('/cart', async (req,res,next) => {
  try {
    let user = req.session.user._id
    const data = await cartModel.deleteMany({user})
    res.json({
      code: 200,
      data
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router