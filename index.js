let tarefas = [];

const dados = localStorage.getItem("tarefas");

if (dados) {
  tarefas = JSON.parse(dados);
} else {
  tarefas = [
    { id: 1, titulo: "Estudar JS", concluida: false },
    { id: 2, titulo: "Treinar código", concluida: true },
  ];
}

function salvarDados() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function gerarNovoID(tarefas) {
  const novaId = tarefas.map((r) => r.id);

  const maiorId = novaId.reduce((acc, num) => {
    if (num > acc) {
      return num;
    } else {
      return acc;
    }
  }, 0);

  return maiorId + 1;
}

function adicionar(titulo) {
  const novaTarefa = {
    id: gerarNovoID(tarefas),
    titulo: titulo,
    concluida: false,
  };

  tarefas.push(novaTarefa);
  salvarDados();
}

function alternarStatus(id) {
  const tarefa = tarefas.find((t) => t.id === id);

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    salvarDados();
  } else {
    console.log("Tarefa não encontrada");
  }
}

function removerTarefa(id) {
  const tamanhoAntes = tarefas.length;

  tarefas = tarefas.filter((t) => t.id !== id);

  if (tarefas.length === tamanhoAntes) {
    console.log("Tarefa não encontrada");
  }

  salvarDados();
}

function mostrarTarefas() {
  const lista = document.getElementById("lista");

  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    const status = tarefa.concluida ? "✅" : "❌";

    li.textContent = `${tarefa.titulo} ${status}`;

    li.addEventListener("click", () => {
      alternarStatus(tarefa.id);
      mostrarTarefas();
    });

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "🗑️";

    botaoRemover.addEventListener("click", (e) => {
      e.stopPropagation();
      removerTarefa(tarefa.id);
      mostrarTarefas();
    });

    li.appendChild(botaoRemover);
    lista.appendChild(li);
  });
}

mostrarTarefas();

const input = document.getElementById("inputTarefa");
const botao = document.getElementById("btnAdicionar");

botao.addEventListener("click", () => {
  const valor = input.value;

  if (valor === "") return;

  adicionar(valor);
  mostrarTarefas();

  input.value = "";
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const valor = input.value;

    if (valor === "") return;

    adicionar(valor);
    mostrarTarefas();

    input.value = "";
  }
});



// const Dados = localStorage.getItem("tarefas");
// console.log(typeof Dados);

// const a = [
//   {id:1},
//   {id:5},
//   {id:3},
// ];

// const ids = a.map( b => b.id);
// console.log(ids)

// const maior = ids.reduce((acc,num) => {
//   if (num > acc) {
//     return num;
//   } else {
//     return acc;
//   }
// }, 0);
// console.log(maior)
