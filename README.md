# Trabalho de API de Produtos

## Descrição

API REST desenvolvida com Node.js e Express para gerenciamento de produtos.
Permite listar, filtrar, ordenar e cadastrar produtos.

---

## Tecnologias utilizadas

* Node.js
* Express
* JavaScript

---

## Endpoints

---

### GET /api/produtos

**Descrição:**
Lista todos os produtos com suporte a filtros, ordenação e paginação.

**Exemplo de requisição:**

```
GET http://localhost:3000/api/produtos
```

**Query Params (opcional):**

* `categoria` → filtra por categoria
* `preco_min` → preço mínimo
* `preco_max` → preço máximo
* `ordem` → `preco` ou `nome`
* `direcao` → `asc` ou `desc`
* `pagina` → número da página
* `limite` → quantidade por página

**Resposta:**

```json
{
  "dados": [
    {
      "id": 1,
      "nome": "Gol",
      "preco": 20000,
      "categoria": "Carro",
      "estoque": 5
    },
    {
      "id": 2,
      "nome": "Palio",
      "preco": 25000,
      "categoria": "Carro",
      "estoque": 7
    },
    {
      "id": 3,
      "nome": "Silverado",
      "preco": 50000,
      "categoria": "Camionete",
      "estoque": 8
    },
    {
      "id": 4,
      "nome": "CBX 750",
      "preco": 45000,
      "categoria": "Moto",
      "estoque": 4
    }
  ],
  "paginacao": {
    "pagina_atual": 1,
    "itens_por_pagina": 10,
    "total_itens": 4,
    "total_paginas": 1
  }
}
```

---

### GET /api/produtos/:id

**Descrição:**
Retorna um produto específico pelo ID.

**Exemplo:**

```
GET http://localhost:3000/api/produtos/2
```

**Resposta:**

```json
{
  "id": 2,
  "nome": "Palio",
  "preco": 25000,
  "categoria": "Carro",
  "estoque": 7
}
```

---

### POST /api/produtos

**Descrição:**
Cria um novo produto.

**Exemplo de requisição:**

```
POST http://localhost:3000/api/produtos
```

**Body:**

```json
{
  "nome": "Civic",
  "preco": 80000,
  "categoria": "Carro",
  "estoque": 3
}
```

**Resposta:**

```json
{
  "id": 5,
  "nome": "Civic",
  "preco": 80000,
  "categoria": "Carro",
  "estoque": 3
}
```

**Status:** `201 Created`

---

## Validações implementadas

* Nome é obrigatório
* Nome deve ter no mínimo 3 caracteres
* Preço é obrigatório
* Preço deve ser um número maior que zero
* Estoque é obrigatório
* Estoque deve ser um número maior ou igual a zero
* Categoria é obrigatória

---

## Testes realizados

Os testes foram realizados utilizando o Postman.

### Testes feitos:

* Criação de produtos (POST)
* Listagem de produtos (GET)
* Busca por ID (GET)
* Teste de validações (erro 400)

---

## Capturas de tela

* POST criando produto com sucesso
 <img width="1080" height="890" alt="Captura de tela 2026-03-20 141553" src="https://github.com/user-attachments/assets/841661fe-2617-4ad6-aabe-c60d8cf18e69" />

<img width="1087" height="793" alt="Captura de tela 2026-03-20 141723" src="https://github.com/user-attachments/assets/aa5825fd-aa0e-4d24-907b-c08caab05d59" />
<img width="1080" height="767" alt="Captura de tela 2026-03-20 141702" src="https://github.com/user-attachments/assets/b65bc349-ae71-4df6-b23f-77e7cf7fb6f3" />
<img width="1082" height="758" alt="Captura de tela 2026-03-20 141643" src="https://github.com/user-attachments/assets/1b871790-6470-4a40-8c21-b70ba389e838" />
<img width="1091" height="796" alt="Captura de tela 2026-03-20 141620" src="https://github.com/user-attachments/assets/e313a6ac-35a6-49f7-a1ad-29cd680c5955" />
<img width="1077" height="825" alt="Captura de tela 2026-03-20 143527" src="https://github.com/user-attachments/assets/4c5c1056-4e2c-471a-b14d-06bc971a36f1" />

* GET listando produtos
* 
*<img width="258" height="846" alt="Captura de tela 2026-03-20 143708" src="https://github.com/user-attachments/assets/84390e44-e449-4d02-ab13-f693bcc8006b" />
<img width="300" height="553" alt="Captura de tela 2026-03-20 143727" src="https://github.com/user-attachments/assets/2a564268-af95-4ff7-9ce6-c52127e759d8" />

* Erro de validação (400 Bad Request)
<img width="1095" height="728" alt="Captura de tela 2026-03-20 141746" src="https://github.com/user-attachments/assets/c5c76fd7-7edf-4c1a-95fe-e3ad575b79da" />
---

## Collection do Postman

A collection utilizada nos testes está disponível no repositório:

* Arquivo: `postman_collection.json`
