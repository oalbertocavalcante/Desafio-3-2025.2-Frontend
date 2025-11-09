import calendario from "@/assets/calendario.png";
import usuario from "@/assets/usuario.png";

// Propriedades do cartão de tarefa
interface PropsCartao {
  id: number;
  titulo: string;
  descricao: string;
  responsavel: string;
  prazo: string;
  coluna: string;
  aoEditar: (id: number) => void;
  aoExcluir: (id: number) => void;
}

// Componente que mostra um cartão de tarefa
const Cartao = ({ id, titulo, descricao, responsavel, prazo, coluna, aoEditar, aoExcluir }: PropsCartao) => {
  // Define a cor do cartão baseado na coluna
  const pegarCor = () => {
    if (coluna === "afazer") return "bg-afazer";
    if (coluna === "fazendo") return "bg-fazendo";
    if (coluna === "feito") return "bg-feito";
    return "bg-card";
  };

  // Função para começar a arrastar
  // Armazena o ID da tarefa no dataTransfer para recuperar ao fazer drop
  const aoIniciarArraste = (e: React.DragEvent) => {
    e.dataTransfer.setData("tarefaId", id.toString());
  };

  return (
    <div 
      className={`${pegarCor()} rounded-lg p-4 mb-3 cursor-move`}
      draggable
      onDragStart={aoIniciarArraste}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-foreground font-bold">{titulo}</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => aoEditar(id)}
            className="text-foreground text-sm hover:opacity-70"
          >
            ✏️
          </button>
          <button 
            onClick={() => aoExcluir(id)}
            className="text-foreground text-sm hover:opacity-70"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <img src={usuario} alt="Usuário" className="w-5 h-5" />
        <span className="text-foreground text-sm">{responsavel}</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <img src={calendario} alt="Calendário" className="w-5 h-5" />
        <span className="text-foreground text-sm">{prazo}</span>
      </div>

      <p className="text-foreground text-sm">{descricao}</p>
    </div>
  );
};

export default Cartao;
