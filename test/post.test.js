const request = require("supertest");
const app = require("../src/app");



describe("Post Routes", () => {

    it("should create a new post", async () => {
        const response = await request(app)
            .post("/posts")
            .send({ title: "First post", content: "Hello world!", author: "venkat" });


        expect(response.status).toBe(201)
        expect(response.body.data).toHaveProperty("title", "First post")
        expect(response.body.data).toHaveProperty("content", "Hello world!")
        expect(response.body.data).toHaveProperty("author", "venkat")
    })

    it("should not create a post without title", async () => {
        const response = await request(app)
            .post("/posts")
            .send({ content: "Hello world!", author: 'venkat' })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Title, content, and author are required')
    })

    it("should not create a post without content", async () => {
        const response = await request(app)
            .post('/posts')
            .send({ title: "First post", author: 'venkat' })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Title, content, and author are required')


    })

    it("should not create a post without author", async () => {
        const response = await request(app)
            .post('/posts')
            .send({ title: "First post", content: "Hello world!" })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Title, content, and author are required')
    })

    it("should get all posts", async () => {
        const response = await request(app).get("/posts")

        expect(response.status).toBe(200)
        expect(response.body.data).toBeInstanceOf(Array)


    })

    it("should get a post by ID", async () => {
        const post = { title: 'First post', content: "Hello world!", author: "venkat" }
        const createResponse = await request(app).post('/posts').send(post)

        const postId = createResponse.body.data.id;

        const response = await request(app).get(`/posts/${postId}`)

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty("id", postId)
        expect(response.body.data).toHaveProperty("title", "First post")
        expect(response.body.data).toHaveProperty("content", "Hello world!")
        expect(response.body.data).toHaveProperty("author", "venkat")

    })

    it("should return 404 for a non-existent post ID", async () => {
        const response = await request(app).get("/posts/9999999")

        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Post not found')
    })

    it("should update a post by ID", async () => {
        const post = { title: "First post", content: "Hello world!", author: "venkat" }
        const createResponse = await request(app).post('/posts').send(post)

        const postId = createResponse.body.data.id;
        const updatePost = {
            title: "Second post",
            content: "Hello!",
            author: "ganesh"
        }

        const response = await request(app).put(`/posts/${postId}`).send(updatePost)

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty("title", "Second post")
        expect(response.body.data).toHaveProperty("content", "Hello!")
        expect(response.body.data).toHaveProperty("author", "ganesh")
    })

    it("should return 404 when trying to update non_exist post ID", async () => {
        const response = await request(app).put('/posts/9999').send({ author: "venkata ganesh" });

        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Post not found')
    })

    it("should delete a post by ID", async () => {
        const post = { title: "First post", content: "Hello world!", author: "venkat" }
        const createResponce = await request(app).post('/posts').send(post)

        const postId = createResponce.body.data.id

        const response = await request(app).delete(`/posts/${postId}`)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Post deleted successfully')
    })

    it("should return 404 when trying to delete non-exist post ID", async () => {
        const response = await request(app).delete('/posts/99999999')

        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Post not found')
    })

})
