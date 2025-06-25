export const produtos = [ 
  { 
    id: 1, 
    nome: "Feijoada Tradicional", 
    preco: 27.90, 
    tipo: "os-mais-pedidos",   
    descricao: "Este prato individual de 500g é feito com carne seca, lombo, costelinha, calabresa e paio. Acompanha couve refogada, farofa crocante e torresmo.",
    imagem: "src/images/feijoada-tradicional.jpg", 
    adicionalPromocional: [
      { nome: "Feijoada por R$18,90", preco: 18.90, imagem: "src/images/feijoada-tradicional.jpg" },
      { nome: "Strogonoff Premium por R$18,90", preco: 18.90, imagem: "src/images/strogonoff.jpg" }
    ], 
    adicionalBebidas: [
      { nome: "Guaraná Antarctica 200ml", preco: 3.50, imagem: "src/images/guarana-antarctica-200ml.jpg" },
      { nome: "Guaraná Antarctica 1l", preco: 10.50, imagem: "src/images/guarana-antarctica-1litro.jpg" },
      { nome: "Coca-Cola 350ml", preco: 8.90, imagem: "src/images/coca-350.jpg" },
      { nome: "Coca-Cola 2l", preco: 20.90, imagem: "src/images/coca-2l.jpg" }
    ],
    adicionalTalheres: [
      { nome: "Talher descartável", preco: 1.99, imagem: "src/images/garfo-faca.jpg" }
    ]
  },
  { 
    id: 2, 
    nome: "Strogonoff de Frango", 
    preco: 27.90, 
    tipo: "os-mais-pedidos", 
    descricao: "Frango suculento ao molho cremoso. Acompanha arroz soltinho e batata palha.",
    imagem: "src/images/strogonoff.jpg", 
    adicionalBebidas: [
      { nome: "Guaraná Antarctica 200ml", preco: 3.50, imagem: "src/images/guarana-antarctica-200ml.jpg" },
      { nome: "Guaraná Antarctica 1l", preco: 10.50, imagem: "src/images/guarana-antarctica-1litro.jpg" },
      { nome: "Coca-Cola 350ml", preco: 8.90, imagem: "src/images/coca-350.jpg" },
      { nome: "Coca-Cola 2l", preco: 20.90, imagem: "src/images/coca-2l.jpg" }
    ],
    adicionalTalheres: [
      { nome: "Talher descartável", preco: 1.99, imagem: "src/images/garfo-faca.jpg" }
    ]
  },
  { 
    id: 3, 
    nome: "Feijoada Premium 500ml + Guaraná 200ml Grátis", 
    preco: 46.90, 
    tipo: "os-mais-pedidos", 
    descricao: "Feijoada completa com arroz, couve, torresmo, banana empanada, vinagrete e farofa de bacon. Acompanha Guaraná 200ml.",
    imagem: "src/images/feijoada-500.jpg",
    adicionalBebidas: [
      { nome: "Guaraná Antarctica 200ml", preco: 3.50, imagem: "src/images/guarana-antarctica-200ml.jpg" },
      { nome: "Guaraná Antarctica 1l", preco: 10.50, imagem: "src/images/guarana-antarctica-1litro.jpg" },
      { nome: "Coca-Cola 350ml", preco: 8.90, imagem: "src/images/coca-350.jpg" },
      { nome: "Coca-Cola 2l", preco: 20.90, imagem: "src/images/coca-2l.jpg" }
    ],
    adicionalTalheres: [
      { nome: "Talher descartável", preco: 1.99, imagem: "src/images/garfo-faca.jpg" }
    ]
  },
  { 
    id: 4, 
    nome: "Combo Casal - Feijoada Premium + Guaraná 1L", 
    preco: 79.90, 
    tipo: "os-mais-pedidos", 
    descricao: "Feijoada Premium (1 litro) + acompanhamentos + Guaraná 1L. Serve 2 pessoas.",
    imagem: "src/images/feijoada-casal.jpg", 
    adicionalBebidas: [
      { nome: "Guaraná Antarctica 200ml", preco: 3.50, imagem: "src/images/guarana-antarctica-200ml.jpg" },
      { nome: "Guaraná Antarctica 1l", preco: 10.50, imagem: "src/images/guarana-antarctica-1litro.jpg" },
      { nome: "Coca-Cola 350ml", preco: 8.90, imagem: "src/images/coca-350.jpg" },
      { nome: "Coca-Cola 2l", preco: 20.90, imagem: "src/images/coca-2l.jpg" }
    ],
    adicionalTalheres: [
      { nome: "Talher descartável", preco: 1.99, imagem: "src/images/garfo-faca.jpg" }
    ]
  },
  { 
    id: 5, 
    nome: "Feijoada Magra", 
    preco: 27.90, 
    tipo: "feijoada-magra", 
    descricao: "Feijoada magra com carne seca, lombo, costelinha, calabresa, paio, couve, farofa e torresmo.",
    imagem: "src/images/feijoada-tradicional.jpg",
    adicionalPromocional: [
      { nome: "Feijoada por R$18,90", preco: 18.90, imagem: "src/images/feijoada-tradicional.jpg" },
      { nome: "Strogonoff Premium por R$18,90", preco: 18.90, imagem: "src/images/strogonoff.jpg" }
    ], 
    adicionalBebidas: [
      { nome: "Guaraná Antarctica 200ml", preco: 3.50, imagem: "src/images/guarana-antarctica-200ml.jpg" },
      { nome: "Guaraná Antarctica 1l", preco: 10.50, imagem: "src/images/guarana-antarctica-1litro.jpg" },
      { nome: "Coca-Cola 350ml", preco: 8.90, imagem: "src/images/coca-350.jpg" },
      { nome: "Coca-Cola 2l", preco: 20.90, imagem: "src/images/coca-2l.jpg" }
    ],
    adicionalTalheres: [
      { nome: "Talher descartável", preco: 1.99, imagem: "src/images/garfo-faca.jpg" }
    ]
  },
  { 
    id: 10, 
    nome: "Parmegiana de Contra Filé com Macarronada", 
    preco: 42.00, 
    tipo: "parmegiana", 
    descricao: "Parmegiana de Contra Filé com molho sugo e macarronada penne.",
    imagem: "src/images/parmegiana-macarrao-contrafile.jpg",
    adicionalPromocional: [
      { nome: "Arroz Branco", preco: 16.00, imagem: "src/images/arroz-branco.jpg" }
    ],
    adicionalBebidas: [
      { nome: "Guaraná Antarctica 200ml", preco: 3.50, imagem: "src/images/guarana-antarctica-200ml.jpg" },
      { nome: "Guaraná Antarctica 1l", preco: 10.50, imagem: "src/images/guarana-antarctica-1litro.jpg" },
      { nome: "Coca-Cola 350ml", preco: 8.90, imagem: "src/images/coca-350.jpg" },
      { nome: "Coca-Cola 2l", preco: 20.90, imagem: "src/images/coca-2l.jpg" }
    ],
    adicionalTalheres: [
      { nome: "Talher descartável", preco: 1.99, imagem: "src/images/garfo-faca.jpg" }
    ]
  },
  { 
    id: 11, 
    nome: "Parmegiana de Frango com Macarronada", 
    preco: 42.00, 
    tipo: "parmegiana", 
    descricao: "Filé de frango à parmegiana com macarronada ao sugo.",
    imagem: "src/images/parmegiana-macarrao-frango.jpg",
    adicionalPromocional: [
      { nome: "Arroz Branco", preco: 16.00, imagem: "src/images/arroz-branco.jpg" }
    ],
    adicionalBebidas: [
      { nome: "Guaraná Antarctica 200ml", preco: 3.50, imagem: "src/images/guarana-antarctica-200ml.jpg" },
      { nome: "Guaraná Antarctica 1l", preco: 10.50, imagem: "src/images/guarana-antarctica-1litro.jpg" },
      { nome: "Coca-Cola 350ml", preco: 8.90, imagem: "src/images/coca-350.jpg" },
      { nome: "Coca-Cola 2l", preco: 20.90, imagem: "src/images/coca-2l.jpg" }
    ],
    adicionalTalheres: [
      { nome: "Talher descartável", preco: 1.99, imagem: "src/images/garfo-faca.jpg" }
    ]
  }
];