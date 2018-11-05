const {Router} = require('express')
const router = Router()
const userModel = require('../database/model/user')

router.post('/login', async (req, res) => {
  try {
    let { tel, password } = req.body;
    const userData = await userModel.findOne({ tel })
    if (!userData) {
      //邮箱即用户名不存在
      res.json({
        code: 401,
        msg: '该用户名不存在'
      })
    } else {
      if (password && password == userData.password) {
        req.session.user = userData;
        // console.log(req.session.user);
        let userMsg = {
          username: userData.username,
          email: userData.email,
          avatar: userData.avatar,
          tel:userData.tel
        };

        res.json({
          code: 200,
          userData: userMsg,
          msg: '登录成功'
        })
      } else {
        throw '密码错误'
      }
    }
  } catch (err) {
    res.json({
      code: 401,
      msg: '密码错误'
    })
  }
})

router.delete('/logout', (req, res) => {
  if (req.session.user) {
    req.session.user = null
    res.json({
      code: 200,
      msg: '退出登录成功'
    })
  } else {
    res.json({
      code: 403,
      msg: '登录状态过期，自动退出登录'
    })
  }
})

module.exports = router