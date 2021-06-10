import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const posts = [];

const comments = [];

app.get("/posts", (req, res) => {
    res.send(posts);
})

app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const thisPost = posts.filter(each => each.id === postId)
    res.send(thisPost[0]);
})

app.post("/posts", (req,res) => {
    let incomingPost = req.body;
    incomingPost = {...incomingPost, id: posts.length +1,  commentCount: 0}
    posts.push(incomingPost);
    res.send(incomingPost);
});

app.post("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    let incomingNewComment = req.body;
    incomingNewComment = {...incomingNewComment, id: comments.length + 1, postId: postId};
    comments.push(incomingNewComment);
    res.send(incomingNewComment);
})

app.get("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    const thisPostComments = comments.filter(each => each.postId == postId);
    res.send(thisPostComments)
})


app.listen(4001, ()=>{
    console.log("Servidor rodando na porta 4001")
})