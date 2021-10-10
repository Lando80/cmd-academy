import knex from '../../database/connection'
import { existsOrError } from '../utils/validations'

class PostController {
  async save(req, res, next) {
    try {
      const author_id = req.userId

      const { firebaseUrl } = req.file ? req.file : ''
      const { title, content } = req.body

      const post = {
        title,
        content,
        url_image: firebaseUrl,
        author_id,
      }

      await knex('tb_posts').insert(post)

      return res.status(201).json(post)
    } catch (error) {
      next(error)
    }
  }
  // TODO: ADICIONAR PAGINAÇÃO DE POSTS
  async index(req, res, next) {
    try {
      const posts = await knex('tb_posts')
        .join('tb_users', 'tb_users.id', '=', 'tb_posts.author_id')
        .select(
          'tb_posts.*',
          'users.name AS author_name',
          'users.url_Avatar AS author_avatar'
        )
        .orderBy('id', 'desc')

      if (posts.length === 0)
        return res.status(404).json({ error: 'No posts yet.' })

      return res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  } // return all posts

  async indexAll(req, res, next) {
    try {
      const { user_id } = req.params

      if (!(await knex('tb_users').where({ id: user_id }).first()))
        return res.status(400).json({ error: 'User not exists.' })

      const posts = await knex('tb_posts')
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

      const post = await knex('tb_posts').where({ id: post_id }).first()

      if (!post) return res.send({ error: 'Post not found.' })

      return res.json(post)
    } catch (error) {
      next(error)
    }
  } // return a single post

  async update(req, res, next) {
    try {
      const post = await knex('tb_posts')
        .where({ id: post_id, author_id: user_id })
        .first()

      if (!post) return res.status(404).json({ error: 'Post not found.' })

      const { title, content } = req.body

      const post_id = req.params.post_id
      const user_id = req.userId
      let tags = req.body.tags

      existsOrError(tags, 'Post tags are required.')

      const formattedTags = tags.replace(/\ /g, '').split(',') //remove os espacos e as virgulas

      if (formattedTags.length > 3)
        return res.status(400).json({ error: 'Tags limit is 3.' })

      tags = String(formattedTags)

      post.title = title || post.title
      post.content = content || post.content
      post.tags = tags || post.tags

      await knex('tb_posts').update(post).where({ id: post.id })

      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const post_id = req.params.post_id
      const user_id = req.userId

      const result = await knex('tb_posts')
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
