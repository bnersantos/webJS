// Elementos HTML
const $list = document.getElementById('list');
const $error = document.getElementById('error');
const $spinner = document.getElementById('spinner');

const form = document.getElementById("postForm");
const output = document.getElementById("output");

const API = 'http://10.135.235.27:5002'; // API pública de testes

function showSpinner(show) {
    $spinner.style.display = show ? 'inline' : 'none';
    $spinner.textContent = "Salvo"
}

function showError(msg) {
    $error.textContent = msg || '';
}
// função para exibir os posts
function renderPosts(posts) {
    // innerhtml para modificar o elemento
    // .map transforma o json em html
    // for carro in carros é igual a post.map(p =>
    $list.innerHTML = posts.map(p => `
    <div class="card">
        <strong>#${p.id} — ${p.title}</strong>
        <p>${p.body}</p>
    </div>
  `).join('');
}

// função assíncrona que carrega os posts
async function getUsers() {
    showError('');
    try {
        // fazendo uma requisição GET
        const res = await fetch(`${API}/usuarios`);
        // verifica se deu algum erro na API
        if (!res.ok) {
            throw new Error(`Erro HTTP ${res.status}`);
        }
        // aguarda o retorno da API
        const data = await res.json();
        // chama função para exibir o resultado
        renderPosts(data);
    } catch (err) {
        showError(err.message ?? 'Falha ao buscar dados');
    }
}

// faz função assíncrona que cadastra um post
async function createUser() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // impede recarregar a página

        // pega os valores digitados nos campos
        const nome = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const select = document.getElementById("selectpaper").value;

        try {
            const response = await fetch("http://10.135.235.27:5002/usuarios", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({nome, email, password, select}),
            });

            if (!response.ok) {
                output.textContent = "Erro na requisição: " + response.status;
                return;
            }

            alert(`Post criado com sucesso`)
        } catch (err) {
            output.textContent = "Erro: " + err.message;
        }
    });
}

async function login() {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        console.log(response);
        alert(response)


        if (!response.ok) {
            throw new Error("Login falhou");
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token); // salva token
        alert(data.access_token);
    } catch (e) {
        console.log(e)
        alert("api")

        output.textContent = "Erro: " + e.message;
    }
}

async function createPostToken() {
    document.getElementById("btn").addEventListener("click", async (e) => {
        const token = localStorage.getItem("token"); // pegar o token

        if (!token) {
            output.textContent = "Realize o login novamente!";
            return;
        }

        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;
        const userId = document.getElementById("userId").value;

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`, // 🔑 Aqui vai o token
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, body, userId})
            });

            if (!response.ok) {
                output.textContent = "Erro: " + response.status;
                return;
            }

            const data = await response.json();
            // usar a resposta da api ...
        } catch (err) {
            output.textContent = "Erro: " + err.message;
        }
    });
}
// exercicio 2:
async function getProducts(){
    showError('');
    try {
        // fazendo uma requisição GET
        const res = await fetch(`https://dummyjson.com/products`);
        // verifica se deu algum erro na API
        if (!res.ok) {
            throw new Error(`Erro HTTP ${res.status}`);
        }
        // aguarda o retorno da API
        const data = await res.json();
        // chama função para exibir o resultado
        renderProducts(data);
    } catch (err) {
        showError(err.message ?? 'Falha ao buscar dados');
    }
}
function renderProducts(data) {
    // innerhtml para modificar o elemento
    // .map transforma o json em html
    // for carro in carros é igual a post.map(p =>
    $list.innerHTML = data.products.map(p => `
    <div id="card">
        <img src="${p.thumbnail}" alt="image">
        <strong>${p.title}</strong>
        <strong><p>R$${p.price}</p></strong>
        <p>Categoria: ${p.category}</p>
        <p>⭐: ${p.rating}/5</p>
        <p>Estoque: ${p.stock}</p>
    </div>
    `).join('');
}
