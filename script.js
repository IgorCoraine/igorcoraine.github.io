// Repositórios fixados no perfil do GitHub.
// A API REST não lista os fixados (só a GraphQL, que exige token), então a lista fica aqui.
// Os dados abaixo são o fallback: na carga da página eles são atualizados pela API pública.
const USUARIO = 'IgorCoraine';

const FIXADOS = [
  { name: 'TIA_Add-In_VCI_Git_Connector', description: 'This TIA Add-In allows you to connect your VCI workspace to a Git repository', language: 'C#' },
  { name: 'AIdashboard', description: 'Painel animado em tempo real das sessões do Claude Code, visto no celular pela rede local', language: 'JavaScript' },
  { name: 'UnifiedSystems_Connection_Pool', description: 'A connection pool to communicate a Unified PC Runtime to a SQL Server Database', language: 'JavaScript' },
  { name: 'gitForNoobs', description: 'Git graphical interface for users unfamiliar with Git', language: 'Python' },
  { name: 'MyPasses', description: 'Self hosting password manager', language: 'HTML' },
  { name: 'fileSharingJS', description: 'program to share files using express (Upload and Download)', language: 'JavaScript' }
];

// Mesmas cores que o GitHub usa para cada linguagem
const CORES_LINGUAGEM = {
  'C#': '#7355dd',
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
  'HTML': '#e34c26',
  'TypeScript': '#3178c6',
  'CSS': '#563d7c'
};

document.addEventListener('DOMContentLoaded', carregarRepositorios);

async function carregarRepositorios() {
  const lista = document.getElementById('repos');

  // Mostra o fallback na hora; a API só refina os dados
  renderizar(lista, FIXADOS);

  const atualizados = await Promise.all(FIXADOS.map(buscarRepositorio));
  renderizar(lista, atualizados);
}

// Busca os dados atuais de um repositório; se falhar (ex.: limite da API), mantém o fallback
async function buscarRepositorio(repo) {
  try {
    const resposta = await fetch(`https://api.github.com/repos/${USUARIO}/${repo.name}`);
    if (!resposta.ok) throw new Error(`Status ${resposta.status}`);

    const dados = await resposta.json();
    return {
      name: dados.name,
      description: dados.description || repo.description,
      language: dados.language || repo.language,
      stars: dados.stargazers_count,
      forks: dados.forks_count
    };
  } catch (erro) {
    console.warn(`Não foi possível atualizar ${repo.name}:`, erro);
    return repo;
  }
}

function renderizar(lista, repos) {
  lista.replaceChildren(...repos.map(criarCartao));
}

function criarCartao(repo) {
  const item = document.createElement('li');

  const link = document.createElement('a');
  link.className = 'repo';
  link.href = `https://github.com/${USUARIO}/${repo.name}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  const nome = document.createElement('span');
  nome.className = 'repo-nome';
  nome.textContent = repo.name;

  const descricao = document.createElement('p');
  descricao.className = 'repo-descricao';
  descricao.textContent = repo.description || 'Sem descrição';

  const rodape = document.createElement('div');
  rodape.className = 'repo-rodape';

  if (repo.language) {
    const linguagem = document.createElement('span');
    const bolinha = document.createElement('span');
    bolinha.className = 'repo-cor';
    bolinha.style.background = CORES_LINGUAGEM[repo.language] || '#8b949e';
    linguagem.append(bolinha, repo.language);
    rodape.append(linguagem);
  }

  if (repo.stars) {
    const estrelas = document.createElement('span');
    estrelas.innerHTML = '<i class="fa fa-star-o"></i> ';
    estrelas.append(repo.stars);
    rodape.append(estrelas);
  }

  if (repo.forks) {
    const forks = document.createElement('span');
    forks.innerHTML = '<i class="fa fa-code-fork"></i> ';
    forks.append(repo.forks);
    rodape.append(forks);
  }

  link.append(nome, descricao, rodape);
  item.append(link);
  return item;
}
