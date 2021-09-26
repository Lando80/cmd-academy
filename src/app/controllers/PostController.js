import knex from '../../database/connection'
import { existsOrError } from '../utils/validations.js'

class PostController {
  // TODO: FUNCAO DE UPAR A IMAGEM NO FIREBASE E PEGAR A URL
  async save(req, res) {
    try {
      const { firebaseUrl } = req.file ? req.file : ''

      const { title, content, tags } = req.body
      const author_id = req.userId

      existsOrError(title, 'Título do post não informado!')
      existsOrError(content, 'Conteúdo do post não informado!')

      const post = {
        title,
        content,
        tags,
        url_image: firebaseUrl,
        author_id,
      }

      await knex('posts').insert(post)

      return res.status(201).send(post)
    } catch (msg) {
      return res.status(400).send(msg)
    }
  }

  async index(req, res) {
    const { search } = req.query

    try {
      const posts = search
        ? await knex('posts').select('*').where('tags', 'like', `%${search}%`)
        : await knex('posts').select('*')

      if (posts.length === 0)
        return res.status(404).json({ error: 'No search results.' })

      return res.status(200).json(posts)
    } catch (error) {
      return res.status(500).send(error)
    }
  } // return all posts if a search string is not provided

  async indexAll(req, res) {
    //   TODO: VERIFY IF AN USER HAVE THE USER_ID, IF NOT, RESPONSE IT
    const { user_id } = req.params

    try {
      const posts = await knex('posts')
        .select('*')
        .where({ author_id: user_id })

      if (posts.length === 0) {
        return res.status(404).json({ error: 'This user has no posts yet.' })
      }

      return res.status(200).json(posts)
    } catch (error) {
      return res.status(400).send(error)
    }
  } // return all posts of an user

  async show(req, res) {
    try {
      const post_id = req.params.post_id

      const post = await knex('posts')
        .select('*')
        .where({ id: post_id })
        .first()

      if (post.length === 0) throw 'Post not found.'

      return res.status(200).json(post)
    } catch (error) {
      return res.status(404).json({ error: 'Post not found.' })
    }
  } // return a single post

  async update(req, res) {
    try {
      const { title, content, tags } = req.body
      const post_id = req.params.post_id
      const user_id = req.userId

      const post = await knex('posts')
        .select('*')
        .where({ id: post_id, author_id: user_id })
        .first()

      if (!post) throw 'O usuário não é o autor do post.'

      post.title = title || post.title
      post.content = content || post.content
      post.tags = tags || post.tags

      await knex('posts').update(post).where({ id: post.id })

      return res.status(200).json(post)
    } catch (error) {
      return res.status(404).json({ error: 'Post not found.' })
    }
  }

  async delete(req, res) {
    try {
      const post_id = req.params.post_id
      const user_id = req.userId

      const result = await knex('posts')
        .where({ id: post_id, author_id: user_id })
        .del()

      if (result === 0) throw 'O usuário não é o autor do post.'

      return res
        .status(200)
        .json({ message: 'The post was successfully deleted.' })
    } catch (error) {
      return res.status(404).json({ error: 'Post not found.' })
    }
  }
}

export default new PostController()
