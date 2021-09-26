import multer from 'multer'

const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: 2 * 1024 * 1024, // setando 2MB como limite do arquivo
})

export default multerConfig
