const { Router } = require('express')
const router = Router()
const musicModel = require('../database/model/music')

let musicSize = 10

function getMusicSize() {
  musicModel.find({}, { _id: 1 }).then(data => {
    musicSize = data.length;
  })
}
getMusicSize()
setInterval(getMusicSize, 1000 * 60 * 10)

router.post('/music', async (req, res) => {
  try {
    if (req.session.user) {
      const { title, artist,src,pic,lrc } = req.body
      if (src == '') {
        throw err
      }
      const data = await musicModel.create({
        title,
        artist,
        src,
        pic,
        lrc,
        uploader: req.session.user._id
      })

      res.json({
        code: 200,
        data,
        msg: '添加音乐成功'
      })
    } else {
      res.json({
        code: 401,
        msg: '未登录状态不能添加音乐'
      })
    }
  } catch (error) {
    res.json({
      code: 400,
      msg: '请求参数有误'
    })
  }
})

router.get('/music', (req, res) => {
  let { pn = 1, size = 12 } = req.query
  pn = parseInt(pn)
  size = parseInt(size)

  musicModel.find()
    .skip((pn - 1) * size)
    .limit(size)
    // .sort({_id:-1})
    .populate({
      path: 'author',
      select: '-password'
    })
    .then(data => {
      res.json({
        code: 200,
        count: musicSize,
        data,
      })
    })
})

module.exports = router