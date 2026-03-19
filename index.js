const express = require('express');
const app = express();

app.use(express.json());

// Controle de ID
let proximoId = 5;

// Dados em memória
let produtos = [
    { id: 1, nome: "Notebook Dell", preco: 3500, categoria: "Informática", estoque: 15 },
    { id: 2, nome: "Mouse Logitech", preco: 150, categoria: "Informática", estoque: 50 },
    { id: 3, nome: "Livro JavaScript", preco: 89, categoria: "Livros", estoque: 30 },
    { id: 4, nome: "Teclado Mecânico", preco: 450, categoria: "Informática", estoque: 20 }
];

// GET /api/produtos - Listar com filtros, ordenação e paginação
app.get('/api/produtos', (req, res) => {
    const { categoria, preco_max, preco_min, ordem, direcao, pagina = 1, limite = 10 } = req.query;
    
    let resultado = [...produtos]; // evita mutação do array original
    
    // Filtros
    if (categoria) resultado = resultado.filter(p => p.categoria === categoria);
    if (preco_max) resultado = resultado.filter(p => p.preco <= parseFloat(preco_max));
    if (preco_min) resultado = resultado.filter(p => p.preco >= parseFloat(preco_min));
    
    // Ordenação
    if (ordem === 'preco') {
        resultado.sort((a, b) => 
            direcao === 'desc' ? b.preco - a.preco : a.preco - b.preco
        );
    } else if (ordem === 'nome') {
        resultado.sort((a, b) => 
            direcao === 'desc' 
                ? b.nome.localeCompare(a.nome) 
                : a.nome.localeCompare(b.nome)
        );
    }
    
    // Paginação
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;
    const paginado = resultado.slice(inicio, inicio + limiteNum);
    
    res.json({
        dados: paginado,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});

// POST /api/produtos - Criar produto
app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria, estoque } = req.body;
    
    // Validação: campos obrigatórios
    if (!nome || preco == null || !categoria || estoque == null) {
        return res.status(400).json({
            erro: "Campos obrigatórios: nome, preco, categoria, estoque"
        });
    }
    
    // Validação: tipo
    if (typeof preco !== 'number' || typeof estoque !== 'number') {
        return res.status(400).json({
            erro: "Preço e estoque devem ser números"
        });
    }
    
    // Validação: regras de negócio
    if (preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser maior que zero"
        });
    }
    
    if (estoque < 0) {
        return res.status(400).json({
            erro: "Estoque não pode ser negativo"
        });
    }
    
    // Validação: nome
    if (nome.length < 3) {
        return res.status(400).json({
            erro: "Nome deve ter pelo menos 3 caracteres"
        });
    }
    
    // Criar produto
    const novoProduto = {
        id: proximoId++,
        nome,
        preco,
        categoria,
        estoque
    };
    
    produtos.push(novoProduto);
    
    res.status(201).json(novoProduto);
});

// GET /api/produtos/:id - Buscar por ID
app.get('/api/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    
    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }
    
    res.json(produto);
});

// Inicialização do servidor
app.listen(3000, () => {
    console.log('🚀 API rodando na porta 3000');
});