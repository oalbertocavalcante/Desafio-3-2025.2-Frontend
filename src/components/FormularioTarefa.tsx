import { useState, useEffect } from "react";
import usuario from "@/assets/usuario.png";
import calendario from "@/assets/calendario.png";

// Tipo de uma tarefa
interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  responsavel: string;
  prazo: string;
  coluna: string;
}

// Propriedades do formulário
interface PropsFormulario {
  aoCancelar: () => void;
  aoSalvar: (titulo: string, descricao: string, responsavel: string, prazo: string) => void;
  coluna: string;
  tarefaInicial?: Tarefa;
}

// Componente de formulário para criar nova tarefa
const FormularioTarefa = ({ aoCancelar, aoSalvar, coluna, tarefaInicial }: PropsFormulario) => {
  // Estados para guardar os valores dos campos
  const [titulo, setarTitulo] = useState("");
  const [descricao, setarDescricao] = useState("");
  const [responsavel, setarResponsavel] = useState("");
  const [prazo, setarPrazo] = useState("");

  // Preenche campos se estiver editando
  useEffect(() => {
    if (tarefaInicial) {
      setarTitulo(tarefaInicial.titulo);
      setarDescricao(tarefaInicial.descricao);
      setarResponsavel(tarefaInicial.responsavel);
      setarPrazo(tarefaInicial.prazo);
    }
  }, [tarefaInicial]);

  // Define a cor do formulário baseado na coluna
  const pegarCor = () => {
    if (coluna === "afazer") return "bg-afazer";
    if (coluna === "fazendo") return "bg-fazendo";
    if (coluna === "feito") return "bg-feito";
    return "bg-card";
  };

  // Função chamada quando clica em salvar
  const aoClicarSalvar = () => {
    aoSalvar(titulo, descricao, responsavel, prazo);
  };

  return (
    <div className={`${pegarCor()} rounded-lg p-4 mb-3`}>
      <input
        type="text"
        placeholder="Título da tarefa"
        value={titulo}
        onChange={(e) => setarTitulo(e.target.value)}
        className="w-full bg-transparent border-b border-border text-foreground mb-3 p-2 focus:outline-none"
      />

      <div className="flex items-center gap-2 mb-3">
        <img src={usuario} alt="Usuário" className="w-5 h-5" />
        <input
          type="text"
          placeholder="Responsável"
          value={responsavel}
          onChange={(e) => setarResponsavel(e.target.value)}
          className="flex-1 bg-transparent border-b border-border text-foreground p-1 focus:outline-none text-sm"
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <img src={calendario} alt="Calendário" className="w-5 h-5" />
        <input
          type="date"
          value={prazo}
          onChange={(e) => setarPrazo(e.target.value)}
          className="flex-1 bg-transparent border-b border-border text-foreground p-1 focus:outline-none text-sm"
        />
      </div>

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setarDescricao(e.target.value)}
        className="w-full bg-transparent border-b border-border text-foreground mb-4 p-2 focus:outline-none text-sm"
      />

      <div className="flex justify-center gap-4">
        <button
          onClick={aoCancelar}
          className="w-12 h-12 rounded-full bg-background hover:bg-card flex items-center justify-center text-foreground text-2xl"
        >
          ✕
        </button>
        <button
          onClick={aoClicarSalvar}
          className="w-12 h-12 rounded-full bg-background hover:bg-card flex items-center justify-center text-foreground text-2xl"
        >
          ✓
        </button>
      </div>
    </div>
  );
};

export default FormularioTarefa;
