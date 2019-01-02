const { Router } = require('express')
const router = Router()
const userModel = require('../database/model/user')

router.get('/user', async (req,res) => {
  let count = await userModel.count()
  let { pn = 1, size = 10 } = req.query
  pn = parseInt(pn)
  size = parseInt(size)

  userModel.find()
    .skip((pn - 1) * size)
    .limit(size)
    .populate({
      path: 'author',
      select: '-password'
    })
    .then(data => {
      res.json({
        code: 200,
        total: count,
        data
      })
    })
})

router.get('/user/:id', (req, res) => {
  const { id } = req.params
  userModel.findById(id)
    .then(data => {
      res.json({
        code: 200,
        data
      })
    }).catch(err => {
      res.json({
        code: 400,
        err
      })
    })
})

router.get('/forget/:tel', async (req, res) => {
  try {
    const { tel } = req.params
    const data = await userModel.find({tel}).select('-password')
    res.json({
      code: 200,
      data,
      msg: '根据手机号获取信息成功'
    })
  } catch (error) {
    res.json({
      code: 400,
      msg: '请求参数有误',
      error
    })
  }
})

router.post('/forget/changePass', async (req, res) => {
  try {
    const { password, user } = req.body
    const userInfo = await userModel.findById(user)
    userInfo.set({password})
    await userInfo.save()
    res.json({
      code: 200,
      msg: '修改密码成功'
    })
  } catch (error) {
     res.json({
       code: 500,
       msg: '服务器错误，请稍后再试'
     })
  }
})


router.post('/user/delete',(req,res) => {
  const {id} = req.body
  userModel.findByIdAndDelete(id)
    .then(data => {
      res.json({
        code: 200,
        msg:'删除成功'
      })
    }).catch(err => {
      res.json({
        code: 400,
        err
      })
    })
})

//修改个人信息
router.put('/user/editUser',async (req,res) => {
  let {avatar,desc,email,username} = req.body
  const userInfo = await userModel.findById(req.session.user._id,{password:0})
  userInfo.set({ avatar, desc, email, username })
  try {
    const data = await userInfo.save()
    res.json({
      code:200,
      msg:'个人信息修改成功',
      data
    })
  } catch (error) {
    res.json({
      code:400,
      msg:'修改失败，请稍后重试'
    })
  }
})

module.exports = router