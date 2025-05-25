import { Request, Response } from "express";
import bancoDeDados from "../../bancoDeDados";
import TTarefa from "../tipos/TTarefa";
import Tarefa from "../modelos/Tarefa";
import { BadRequestError, NotFoundError } from "./erros";

export default class TarefasControlador {
  listar(_req: Request, res: Response) {
    const tarefasCadastradas = bancoDeDados.tarefas;
    return res.status(200).json(tarefasCadastradas);
  }

  criar(req: Request, res: Response) {
    try {
      
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      throw new BadRequestError ("O nome e a descricao são Obrigatorios")
    }

    const tarefaExiste: boolean = bancoDeDados.tarefas.some(
      (tarefa) => tarefa.nome === nome
    );

    if (tarefaExiste) {
      return res.status(409).json({ mensagem: "O nome já existe" });
    }

    const novaTarefa: TTarefa = new Tarefa(nome, descricao);

    bancoDeDados.tarefas.push(novaTarefa);

    return res.status(201).json(novaTarefa);
    } catch (error) {
      console.log(error)
      if(error instanceof BadRequestError || error instanceof NotFoundError){
        return res.status(error.statuscode).json({"mensagem": error.message})
      }
      return res.status(500).json({"mensagem":"Erro interno do servidor"})
    }
    
  }
}
