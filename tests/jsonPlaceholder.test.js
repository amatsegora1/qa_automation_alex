const api = require('../api/jsonPlaceholderClient');

describe('JSONPlaceholder API via custom client', () => {
  test('GET all posts', async () => {
    const res = await api.getPosts();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test('GET single post by ID', async () => {
    const res = await api.getPostById(1);
    expect(res.status).toBe(200);
    expect(res.data.id).toBe(1);
  });

  test('POST create new post', async () => {
    const newPost = {
      title: 'test title',
      body: 'test body',
      userId: 1
    };
    const res = await api.createPost(newPost);
    expect(res.status).toBe(201);
    expect(res.data).toMatchObject(newPost);
  });

  test('GET all users', async () => {
    const res = await api.getUsers();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data[0]).toHaveProperty('id');
  });

  test('POST create comment', async () => {
    const newComment = {
      name: 'Test',
      email: 'test@test.com',
      body: 'Some comment',
      postId: 1
    };
    const res = await api.createComment(newComment);
    expect(res.status).toBe(201);
    expect(res.data).toMatchObject(newComment);
  });
});
