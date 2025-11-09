import { useState, useEffect } from "react";
import Coluna from "@/components/Coluna";

// Tipo de uma tarefa
interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  responsavel: string;
  prazo: string;
  coluna: string;
}

// Componente principal do Kanban
const Index = () => {
  // Estado para guardar todas as tarefas
  const [tarefas, setarTarefas] = useState<Tarefa[]>([]);

  // Carrega tarefas do localStorage quando o componente inicia
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      setarTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  // Salva tarefas no localStorage sempre que mudar
  // Nota: useEffect sem dependência poderia causar loop infinito, por isso precisa de [tarefas]
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = (
    titulo: string,
    descricao: string,
    responsavel: string,
    prazo: string,
    coluna: string
  ) => {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
      descricao,
      responsavel,
      prazo,
      coluna,
    };
    setarTarefas([...tarefas, novaTarefa]);
  };

  // Função para editar uma tarefa
  const editarTarefa = (
    id: number,
    titulo: string,
    descricao: string,
    responsavel: string,
    prazo: string
  ) => {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, titulo, descricao, responsavel, prazo };
      }
      return tarefa;
    });
    setarTarefas(tarefasAtualizadas);
  };

  // Função para excluir uma tarefa
  const excluirTarefa = (id: number) => {
    const tarefasRestantes = tarefas.filter((tarefa) => tarefa.id !== id);
    setarTarefas(tarefasRestantes);
  };

  // Função para mover tarefa entre colunas
  const moverTarefa = (id: number, novaColuna: string) => {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, coluna: novaColuna };
      }
      return tarefa;
    });
    setarTarefas(tarefasAtualizadas);
  };

  // Filtra as tarefas de cada coluna
  const tarefasAfazer = tarefas.filter((t) => t.coluna === "afazer");
  const tarefasFazendo = tarefas.filter((t) => t.coluna === "fazendo");
  const tarefasFeito = tarefas.filter((t) => t.coluna === "feito");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          <Coluna
            nome="A Fazer"
            tarefas={tarefasAfazer}
            coluna="afazer"
            aoAdicionarTarefa={adicionarTarefa}
            aoEditarTarefa={editarTarefa}
            aoExcluirTarefa={excluirTarefa}
            aoMoverTarefa={moverTarefa}
          />
          
          <div className="w-px bg-border" />

          <Coluna
            nome="Fazendo"
            tarefas={tarefasFazendo}
            coluna="fazendo"
            aoAdicionarTarefa={adicionarTarefa}
            aoEditarTarefa={editarTarefa}
            aoExcluirTarefa={excluirTarefa}
            aoMoverTarefa={moverTarefa}
          />

          <div className="w-px bg-border" />

          <Coluna
            nome="Feito"
            tarefas={tarefasFeito}
            coluna="feito"
            aoAdicionarTarefa={adicionarTarefa}
            aoEditarTarefa={editarTarefa}
            aoExcluirTarefa={excluirTarefa}
            aoMoverTarefa={moverTarefa}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
