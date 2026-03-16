const knex = require('../../db');

async function getPublishedPostsWithCategoriesAndTags() {
  return knex
    .raw(
      `
    WITH post_tags AS (
      SELECT jsonb_agg(to_jsonb(tags) - 'created_at') AS tags, pt.post_id
      FROM tags
            JOIN posts_tags pt ON tags.id = pt.tag_id
      GROUP BY pt.post_id
      ),

    post_categories AS (
      SELECT array_agg(categories.name) AS categories, pc.post_id
      FROM categories
             JOIN posts_categories pc ON categories.id = pc.category_id
      GROUP BY pc.post_id
      )

    SELECT posts.id AS post_id, title, content, published_at, post_tags.tags, post_categories.categories, u.name AS author
    FROM posts
        LEFT JOIN post_tags ON posts.id = post_tags.post_id
        LEFT JOIN post_categories ON posts.id = post_categories.post_id
        JOIN users u ON posts.user_id = u.id
    WHERE posts.published_at <= NOW()
    ORDER BY posts.created_at DESC
    `,
      []
    )
    .then(query => query.rows);
}

async function getPostsWithCategoriesAndTags() {
  return knex
    .raw(
      `
    WITH post_tags AS (
      SELECT jsonb_agg(to_jsonb(tags) - 'created_at') AS tags, pt.post_id
      FROM tags
            JOIN posts_tags pt ON tags.id = pt.tag_id
      GROUP BY pt.post_id
      ),

    post_categories AS (
      SELECT array_agg(categories.name) AS categories, pc.post_id
      FROM categories
             JOIN posts_categories pc ON categories.id = pc.category_id
      GROUP BY pc.post_id
      )

    SELECT posts.id AS post_id, title, content, published_at, post_tags.tags, post_categories.categories, u.name AS author
    FROM posts
        LEFT JOIN post_tags ON posts.id = post_tags.post_id
        LEFT JOIN post_categories ON posts.id = post_categories.post_id
        JOIN users u ON posts.user_id = u.id
    ORDER BY posts.created_at DESC
    `,
      []
    )
    .then(query => query.rows);
}

async function getCategoryList() {
  const categories = await knex('categories').select('id', 'name');
  return categories;
}

async function getTagList() {
  const tags = await knex('tags').select('id', 'name');
  return tags;
}

async function addPost({
  title,
  content,
  publishedAt,
  userId,
  category: categoryId,
  tags: tagIds = [],
}) {
  return knex.transaction(async trx => {
    const [postId] = await knex('posts')
      .transacting(trx)
      .insert({
        title,
        content,
        user_id: userId,
        published_at: publishedAt || new Date(),
      })
      .returning('id');
    if (categoryId) {
      await knex('posts_categories')
        .transacting(trx)
        .insert({
          post_id: postId,
          category_id: categoryId,
        });
    }
    if (!Array.isArray(tagIds)) {
      tagIds = [tagIds]; // eslint-disable-line no-param-reassign
    }
    const tagsToAdd = tagIds.map(tagId =>
      Object.assign({ post_id: postId, tag_id: Number(tagId) })
    );
    await knex.batchInsert('posts_tags', tagsToAdd).transacting(trx);
  });
}

async function deletePost({ id }) {
  await knex('posts_categories')
    .where({ post_id: id })
    .del();
  await knex('posts_tags')
    .where({ post_id: id })
    .del();
  const [post] = await knex('posts')
    .where({ id })
    .del()
    .returning(['id']);
  return post;
}
async function editPost({ title, content, publishedAt, postId, category, tags = [] }) {
  return knex.transaction(async trx => {
    await knex('posts')
      .where({ id: postId })
      .transacting(trx)
      .update({
        title,
        content,
        published_at: publishedAt || new Date(),
        updated_at: new Date(),
      })
      .returning('id');

    await knex('posts_categories')
      .transacting(trx)
      .where({ post_id: postId })
      .delete();

    await knex('posts_categories')
      .transacting(trx)
      .insert({
        post_id: postId,
        category_id: category,
      });

    if (typeof tags !== 'object') {
      tags = [tags];
    }

    const tagsToAdd = tags.map(tagId => Object.assign({ post_id: postId, tag_id: Number(tagId) }));
    await knex('posts_tags')
      .transacting(trx)
      .where({ post_id: postId })
      .delete();

    await knex.batchInsert('posts_tags', tagsToAdd).transacting(trx);
  });
}

async function getPostDetails(id) {
  return knex
    .raw(
      `
      WITH post_tags AS (
        SELECT jsonb_agg(to_jsonb(tags) - 'created_at') AS tags, pt.post_id
        FROM tags
              JOIN posts_tags pt ON tags.id = pt.tag_id
        GROUP BY pt.post_id
        ),

      post_categories AS (
        SELECT array_agg(categories.name) AS categories, pc.post_id
        FROM categories
              JOIN posts_categories pc ON categories.id = pc.category_id
        GROUP BY pc.post_id
        )

      SELECT posts.id AS post_id, title, content, published_at, post_tags.tags, post_categories.categories, u.name AS author      
      FROM posts
          LEFT JOIN post_tags ON posts.id = post_tags.post_id
          LEFT JOIN post_categories ON posts.id = post_categories.post_id
          JOIN users u ON posts.user_id = u.id
      WHERE posts.id = ?
      ORDER BY posts.created_at DESC
      `,
      [id]
    )
    .then(query => query.rows);
}

module.exports = {
  getPostsWithCategoriesAndTags,
  getPublishedPostsWithCategoriesAndTags,
  getCategoryList,
  getTagList,
  addPost,
  deletePost,
  editPost,
  getPostDetails,
};
