import express, {Request, Response} from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req : Request, res : Response)=> {
    res.send("Olá express!!!");
});

app.get("/saudacao/:nome", (req : Request, res : Response) => {
    const nome = req.params.nome;
    //res.send("Olá " + nome);
    res.json({
        mensagem: `Olá ${nome}!`
    });
});

app.post("/saudacao", (req: Request, res: Response)=>{
    const {nome} = req.body;

    res.json({
        mensagem: `Olá ${nome}!`
    })
});

app.listen(PORT, () => {
    console.log("Servidor executando em localhost");
});