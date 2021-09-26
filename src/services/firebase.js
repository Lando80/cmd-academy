import admin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'

const serviceAccount = require('../config/firebaseKey.json')

const BUCKET = 'cmd-academy.appspot.com'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
})

const bucket = admin.storage().bucket()

const uploadImage = (req, res, next) => {
  if (!req.file) return next()

  if (!req.file.mimetype.includes('image'))
    return res.status(400).json({ error: 'Only image files are allowed' })

  const FOLDER = req.route.path.split('/')[1]

  const image = req.file

  // renomeando o arquivo com um id unico
  const fileName = `${uuidv4()}.${image.originalname.split('.').pop()}`

  const file = bucket.file(`${FOLDER}/${fileName}`)

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  })

  stream.on('error', (e) => {
    console.log(e)
    return res
      .status(500)
      .json({ error: 'Internal server error. Try again later.' })
  })

  stream.on('finish', async () => {
    try {
      // tornar o arquivo publico
      await file.makePublic()

      // obter a url do arquivo
      req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${FOLDER}/${fileName}`

      next()
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ error: 'Internal server error. Try again later.' })
    }
  })

  stream.end(image.buffer)
}

module.exports = uploadImage
