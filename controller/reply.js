const {Router} = require('express')
const router = Router()
const commentModel = require('../database/model/comment')
const replyModel = require('../database/model/reply')

// 添加回复
router.post('/reply', async (req, res, next) => {
  try {
    const { content, commentId, responder } = req.body
    const reviewer = req.session.user._id

    let reply
    const comment = await commentModel.findById(commentId)
    console.log(comment)
    if (comment) {
      reply = await replyModel.create({
        content,
        responder,
        reviewer
      })
      await comment.updateOne({$push: {reply: reply._id}})
      await comment.save()
      res.json({
        code: 200,
        data: reply,
        msg: '回复成功哦亲'
      })
    } else {
      res.json({
        code: 201,
        msg: '该条评论不存在或已被删哦亲'
      })
    }
  } catch (error) {
    next(error)
  }
})



module.exports = router