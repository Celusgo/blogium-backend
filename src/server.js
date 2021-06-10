import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const posts = [];

const comments = [];

app.get("/posts", (req, res) => {
    res.send({posts, comments});
})

app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const thisPost = posts.filter(each => each.id === postId)
    res.send(thisPost[0]);
})

app.post("/posts", (req,res) => {
    let incomingPost = req.body;
    incomingPost = {...incomingPost, id: posts.length +1};
    if(incomingPost.title.length === 0 || incomingPost.content.length === 0 || incomingPost.coverUrl.length === 0){
        res.status(400).send("Pelo menos um campo ficou em branco. Por favor, preencha corretamente!");
        return;
    }
    posts.push(incomingPost);
    res.send(incomingPost);
});

app.post("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    let incomingNewComment = req.body;
    if(incomingNewComment.content.length === 0 || incomingNewComment.author.length === 0){
        res.status(400).send("Pelo menos um campo ficou em branco. Por favor, preencha corretamente!");
        return;
    }
    incomingNewComment = {...incomingNewComment, id: comments.length + 1, postId: postId};
    comments.push(incomingNewComment);
    res.send(incomingNewComment);
})

app.get("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    const thisPostComments = comments.filter(each => each.postId === postId);
    res.send(thisPostComments)
})


app.listen(4001, ()=>{
    console.log("Servidor rodando na porta 4001")
})