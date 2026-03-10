import express, {Request, Response} from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

type Tarefa = {
    id: number,
    titulo: string,
    concluida: boolean
}

let tarefas: Tarefa[] = [
    {id: 1, titulo: "Estudar Express", concluida: false},
    {id: 2, titulo: "Estudar para Prova", concluida: false}
];

app.get("/tarefas", (req: Request, res: Response) =>{
    res.json(tarefas);
});

app.get("/tarefas/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const tarefa = tarefas.find(t => t.id == id);

    if(!tarefa) {
        return res.status(404).json({erro: "Tarefa não encontrada"});
    }

    res.json(tarefa);
});

app.post("/tarefas", (req: Request, res: Response) => {
    const {titulo} = req.body;

    const novaTarefa: Tarefa = {
        id: tarefas.length + 1,
        titulo: titulo,
        concluida: false
    }

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const tarefa = tarefas.find(t => t.id == id);

    if(!tarefa) {
        return res.status(404).json({erro : "Tarefa não encontrada"});
    }

    const {titulo, concluida} = req.body;

    tarefa.titulo = titulo ?? tarefa.titulo,
    tarefa.concluida = concluida ?? tarefa.concluida

    res.json(tarefa);
});

app.delete("/tarefas/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    tarefas = tarefas.filter(t => t.id !== id);

    res.json({
        mensagem: "Tarefa Removida"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor executando em localhost:${PORT}`);
});

