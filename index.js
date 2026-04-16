let tarefas = [
  { id: 1, titulo: "Estudar JS", concluida: false },
  { id: 2, titulo: "Treinar código", concluida: true },
];

function adicionar(titulo) {
  const novaTarefa = {
    id: tarefas.length + 1,
    titulo: titulo,
    concluida: false,
  };

  tarefas.push(novaTarefa);
}

function alternarStatus(id) {
  const tarefa = tarefas.find((t) => t.id === id);

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
  } else {
    console.log("Tarefa não encontrada");
    return;
  }
}

function removerTarefa(id) {
  const tamanhoAntes = tarefas.length;

  tarefas = tarefas.filter((t) => t.id !== id);

  if (tarefas.length === tamanhoAntes) {
    console.log("Tarefa não encontrada");
  }
}

function mostrarTarefas() {
  const lista = document.getElementById("lista");

  lista.innerHTML = ""; // limpa antes de renderizar

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");

    const status = tarefa.concluida ? "✅" : "❌";

    li.addEventListener("click", () => {
      alternarStatus(tarefa.id);
      mostrarTarefas();
    });

    li.textContent = `${tarefa.titulo} ${status}`;

    lista.appendChild(li);
  });
}

mostrarTarefas()

const input = document.getElementById("inputTarefa");
const botao = document.getElementById("btnAdicionar");

botao.addEventListener("click", () => {
  const valor = input.value;

if(valor === "") return;

  adicionar(valor);
  mostrarTarefas();

  input.value = "";
});



