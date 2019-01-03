const {Router} = require('express')
const router = Router()
const messageModel = require('../database/model/message')

router.post('/message',async (req,res) => {
  try {
    if (req.session.user) {
      const {title,content} = req.body
      if (title == '' || content == ''){
        throw err
      }
      const data = await messageModel.create({
        title,
        content,
        author:req.session.user._id
      })

      res.json({
        code:200,
        data,
        msg:'留言成功'
      })
    } else {
      res.json({
        code:401,
        msg:'未登录状态不能发表留言'
      })
    }
  } catch (error) {
    res.json({
      code:400,
      msg:'请求参数有误'
    })
  }
})

router.get('/message', (req, res) => {
  let { pn = 1, size = 3 } = req.query
  pn = parseInt(pn)
  size = parseInt(size)

  messageModel.find()
    .skip((pn - 1) * size)
    .limit(size)
    .sort({ _id: -1 })
    .populate({
      path: 'author',
      select: '-password'
    })
    .then(data => {
      res.json({
        code: 200,
        data
      })
    })
})

router.post('/message/delete',(req,res) => {
  const {id} = req.body
  messageModel.findByIdAndDelete(id)
    .then(data => {
      res.json({
        code: 200,
        msg:'删除留言成功'
      })
    }).catch(err => {
      res.json({
        code: 400,
        err
      })
    })
})

module.exports = router