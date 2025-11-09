import { useState } from "react";
import Cartao from "./Cartao";
import FormularioTarefa from "./FormularioTarefa";

// Tipo de uma tarefa
interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  responsavel: string;
  prazo: string;
  coluna: string;
}

// Propriedades da coluna
interface PropsColuna {
  nome: string;
  tarefas: Tarefa[];
  coluna: string;
  aoAdicionarTarefa: (titulo: string, descricao: string, responsavel: string, prazo: string, coluna: string) => void;
  aoEditarTarefa: (id: number, titulo: string, descricao: string, responsavel: string, prazo: string) => void;
  aoExcluirTarefa: (id: number) => void;
  aoMoverTarefa: (id: number, novaColuna: string) => void;
}

// Componente de coluna do Kanban
const Coluna = ({ nome, tarefas, coluna, aoAdicionarTarefa, aoEditarTarefa, aoExcluirTarefa, aoMoverTarefa }: PropsColuna) => {
  // Estado para controlar se está mostrando o formulário
  const [mostrarFormulario, setarMostrarFormulario] = useState(false);
  // Estado para guardar a tarefa sendo editada
  const [tarefaEditando, setarTarefaEditando] = useState<number | null>(null);

  // Função para abrir o formulário
  const abrirFormulario = () => {
    setarMostrarFormulario(true);
  };

  // Função para fechar o formulário
  const fecharFormulario = () => {
    setarMostrarFormulario(false);
  };

  // Função para salvar nova tarefa
  const salvarTarefa = (titulo: string, descricao: string, responsavel: string, prazo: string) => {
    if (tarefaEditando) {
      aoEditarTarefa(tarefaEditando, titulo, descricao, responsavel, prazo);
      setarTarefaEditando(null);
    } else {
      aoAdicionarTarefa(titulo, descricao, responsavel, prazo, coluna);
    }
    fecharFormulario();
  };

  // Função para iniciar edição
  const iniciarEdicao = (id: number) => {
    setarTarefaEditando(id);
    setarMostrarFormulario(true);
  };

  // Função para excluir tarefa
  const excluir = (id: number) => {
    aoExcluirTarefa(id);
  };

  // Função para permitir soltar tarefa
  // Sem preventDefault, o drop não funcionaria (comportamento padrão do browser)
  const permitirSoltar = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Função quando solta a tarefa
  // Recupera o ID que foi armazenado no dataTransfer durante o drag start
  const aoSoltar = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("tarefaId");
    if (id) {
      aoMoverTarefa(Number(id), coluna);
    }
  };

  // Pega dados da tarefa sendo editada
  const tarefaParaEditar = tarefas.find((t) => t.id === tarefaEditando);

  return (
    <div className="flex-1 min-w-[300px]">
      <h2 className="text-foreground text-3xl font-bold mb-6 text-center">{nome}</h2>
      
      <div 
        className="space-y-3"
        onDragOver={permitirSoltar}
        onDrop={aoSoltar}
      >
        {tarefas.map((tarefa) => (
          <Cartao
            key={tarefa.id}
            id={tarefa.id}
            titulo={tarefa.titulo}
            descricao={tarefa.descricao}
            responsavel={tarefa.responsavel}
            prazo={tarefa.prazo}
            coluna={tarefa.coluna}
            aoEditar={iniciarEdicao}
            aoExcluir={excluir}
          />
        ))}

        {mostrarFormulario && (
          <FormularioTarefa
            aoCancelar={fecharFormulario}
            aoSalvar={salvarTarefa}
            coluna={coluna}
            tarefaInicial={tarefaParaEditar}
          />
        )}

        {!mostrarFormulario && (
          <button
            onClick={abrirFormulario}
            className="w-full py-8 border-2 border-dashed border-border rounded-lg hover:border-foreground transition-colors flex items-center justify-center"
          >
            <span className="text-foreground text-4xl">+</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Coluna;
