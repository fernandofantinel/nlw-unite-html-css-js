// os dados dos participantes abaixo são fictícios

let participantes = [
  {
    nome: "Laura Mendes",
    email: "laura@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 10, 20),
    dataCheckIn: new Date(2024, 3, 4, 9, 30)
  },
  {
    nome: "Rafaela Oliveira",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 13, 45),
    dataCheckIn: new Date(2024, 3, 5, 10, 15)
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: null
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 12, 15),
    dataCheckIn: new Date(2024, 2, 27, 10, 20)
  },
  {
    nome: "Maria Souza",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 9, 45),
    dataCheckIn: null
  },
  {
    nome: "João Santos",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 11, 20),
    dataCheckIn: new Date(2024, 2, 29, 9, 10)
  },
  {
    nome: "Amanda Oliveira",
    email: "amanda@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 14, 30),
    dataCheckIn: new Date(2024, 2, 30, 12, 40)
  },
  {
    nome: "Lucas Martins",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 16, 10),
    dataCheckIn: new Date(2024, 3, 1, 8, 55)
  },
  {
    nome: "Patrícia Lima",
    email: "patricia@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 8, 20),
    dataCheckIn: new Date(2024, 3, 2, 11, 15)
  },
  {
    nome: "Gabriel Silva",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 15, 45),
    dataCheckIn: new Date(2024, 3, 3, 14, 30)
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
    <tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector("tbody")
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    p => p.email == participante.email
  )

  if(participanteExiste) {
    alert("Email já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  if(!confirm("Tem certeza que deseja fazer o check-in?")) {
    return
  }

  const participante = participantes.find(
    p => p.email == event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}