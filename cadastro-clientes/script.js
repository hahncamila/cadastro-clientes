
let clientes = [];

// Adicionar cliente


function adicionarCliente() {
    const nome = document.getElementById('c-nome').value;
    const email = document.getElementById('c-email').value;
    const telefone = document.getElementById('c-phone').value;

    if (nome && email && telefone) {
        const cliente = {
            nome: nome,
            email: email,
            telefone: telefone
        };

        clientes.push(cliente);

        document.getElementById('c-nome').value = '';
        document.getElementById('c-email').value = '';
        document.getElementById('c-phone').value = '';

        atualizarTabela();

    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

document.getElementById('btnSalvar').addEventListener('click', adicionarCliente);

// Atualizar tabela de clientes

function atualizarTabela() {
    const tabela = document.querySelector('table');

    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th class="acao"></th>
                <th class="acao"></th>
            </tr>
        </thead>
    `;

    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td class="acao"><button onclick="editarCliente('${cliente.nome}')">Editar</button></td>
            <td class="acao"><button onclick="excluirCliente('${cliente.nome}')">Excluir</button></td>
        `;
        tabela.appendChild(row);
    });
}


// Filtrar clientes

function searchClientes() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredClientes = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(searchText) ||
        cliente.email.toLowerCase().includes(searchText) ||
        cliente.telefone.toLowerCase().includes(searchText)
    );

    const tabela = document.getElementById('clientesTable');
    tabela.innerHTML = '';

    filteredClientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td class="acao"><button onclick="editarCliente('${cliente.nome}')">Editar</button></td>
            <td class="acao"><button onclick="excluirCliente('${cliente.nome}')">Excluir</button></td>
        `;
        tabela.appendChild(row);
    });
}

document.getElementById('btnSearch').addEventListener('click', searchClientes);


// Editar cliente

function editarCliente(nome) {
    const cliente = clientes.find(c => c.nome === nome);
    if (cliente) {
    
        document.getElementById('c-nome').value = cliente.nome;
        document.getElementById('c-email').value = cliente.email;
        document.getElementById('c-phone').value = cliente.telefone;

        clientes = clientes.filter(c => c.nome !== nome);

    }
}

//Excluir cliente

function excluirCliente(nome) {
    const confirmacao = confirm(`Tem certeza que deseja excluir o cliente ${nome}?`);

    if (confirmacao) {
        clientes = clientes.filter(c => c.nome !== nome);

        atualizarTabela();
    }
}



