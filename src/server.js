import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const posts = [];

app.get("/posts", (req, res) => {
    res.send(posts);
})

app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const thisPost = posts.filter(i => i.id === postId)
    res.send(thisPost[0]);
})

app.post("/posts", (req,res) => {
    let incomingPost = req.body;
    incomingPost = {...incomingPost, id: posts.length +1,  commentCount: 0}
    posts.push(incomingPost);
    res.send(incomingPost);
});


app.listen(4001, ()=>{
    console.log("Servidor rodando na porta 4001")
})