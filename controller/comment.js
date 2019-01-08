const {Router} = require('express')
const router = Router()
const newsModel = require('../database/model/journalism')
const commentModel = require('../database/model/comment')

// 添加评论
router.post('/comment',async (req, res, next) => {
  try {
    const { content, newsId } = req.body
    const user = req.session.user._id

    let comment
    const journalism = await newsModel.findById(newsId)
    if (journalism) {
      comment = await commentModel.create({
        content,
        user,
        journalism: newsId
      })
      await journalism.updateOne({$push: {comment: comment._id}})

      res.json({
        code: 200,
        data: comment,
        msg: '评论成功'
      })
    } else {
      res.json({
        code: 201,
        msg: '该条新闻不存在或可能已被删'
      })
    }
  } catch (error) {
    next(error)
  }
})

// 获取新闻评论
router.get('/comment/:newsId', async (req,res,next) => {
  try {
    const newsId = req.params.newsId
    const data = await commentModel.find({journalism: newsId})
      .populate({
        path: 'user',
        select: 'username avatar'
      })
      .populate({
        path: 'journalism',
        select: 'content'
      })
      .populate({
        path: 'reply'
      })
      res.json({
        code: 200,
        msg : '请求成功',
        data
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router