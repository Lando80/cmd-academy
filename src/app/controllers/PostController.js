import knex from '../../database/connection'

class PostController {
  async save(req, res, next) {
    try {
      const { firebaseUrl } = req.file ? req.file : ''
      const { title, content, tags } = req.body
      const author_id = req.userId

      if (!title || !content)
        return res
          .status(400)
          .json({ error: 'Title and content are required.' })

      const post = {
        title,
        content,
        tags,
        url_image: firebaseUrl,
        author_id,
      }

      await knex('posts').insert(post)

      return res.status(201).json(post)
    } catch (error) {
      next(error)
    }
  }

  // TODO: ADICIONAR LIMITES DE POSTS RETORNADOS
  async index(req, res, next) {
    try {
      const posts = await knex('posts').select('*')

      if (posts.length === 0)
        return res.status(404).json({ error: 'No search results.' })

      return res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  } // return all posts if a search string is not provided

  async indexAll(req, res, next) {
    try {
      const { user_id } = req.params

      if (!(await knex('users').where({ id: user_id }).first()))
        return res.status(400).json({ error: 'User not exists.' })

      const posts = await knex('posts')
        .select('*')
        .where({ author_id: user_id })

      if (posts.length === 0)
        return res.status(404).json({ error: 'This user has no posts yet.' })

      return res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  } // return all posts of an user

  async show(req, res, next) {
    try {
      const post_id = req.params.post_id

      const post = await knex('posts').where({ id: post_id }).first()

      if (!post) return res.send({ error: 'Post not found.' })

      return res.json(post)
    } catch (error) {
      next(error)
    }
  } // return a single post

  async update(req, res, next) {
    try {
      const { title, content, tags } = req.body

      const post_id = req.params.post_id
      const user_id = req.userId

      const post = await knex('posts')
        .where({ id: post_id, author_id: user_id })
        .first()

      if (!post) return res.status(404).json({ error: 'Post not found.' })

      post.title = title || post.title
      post.content = content || post.content
      post.tags = tags || post.tags

      await knex('posts').update(post).where({ id: post.id })

      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const post_id = req.params.post_id
      const user_id = req.userId

      const result = await knex('posts')
        .where({ id: post_id, author_id: user_id })
        .del()

      if (result === 0)
        return res.status(404).json({ error: 'Post not found.' })

      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default new PostController()
