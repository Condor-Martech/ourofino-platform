# 02-PRD: Requisitos de Produto (Product Requirements Document)

## 1. Introdução

### Visão do Produto
Uma plataforma digital unificada para a Ouro Fino que centraliza a presença institucional, e-commerce e gestão da Estância, oferecendo uma experiência de usuário fluida e adminstração integrada.

### Público-Alvo
-   **Consumidor Final (B2C)**: Interessado em produtos Ouro Fino e visitação à Estância.
-   **Parceiros/B2B**: Revendedores e distribuidores (futuro).
-   **Administradores**: Equipe de marketing, vendas e operações da Estância.

---

## 2. Jornadas do Usuário

### J1: Compra de Ingressos para a Estância
1.  **Descoberta**: Usuário acessa "Estância" no menu.
2.  **Seleção**: Escolhe data no calendário (visualiza disponibilidade).
3.  **Carrinho**: Seleciona quantidade de ingressos (Adulto, Criança, Meia).
4.  **Checkout**: Faz login/cadastro rápido, paga via PIX/Cartão.
5.  **Recebimento**: Recebe e-mail com QR Code e vê ingresso na área "Meus Ingressos".
6.  **Acesso**: Apresenta QR Code na portaria da Estância.

### J2: Compra de Produtos no Ecommerce
1.  **Navegação**: Navega por categorias (Águas, Energéticos, etc.).
2.  **Detalhes**: Vê página de produto com informações nutricionais e opções.
3.  **Carrinho**: Adiciona itens, calcula frete.
4.  **Checkout**: Finaliza compra.
5.  **Acompanhamento**: Recebe atualizações de status do pedido.

### J3: Validação de Ingressos (Operador)
1.  **Login**: Acessa app/área restrita de validação.
2.  **Leitura**: Escaneia QR Code do visitante.
3.  **Resultado**: Vê status (Válido/Inválido/Já Utilizado) e libera entrada.

---

## 3. Regras de Negócio & Funcionalidades

### Módulo 1: Institucional
-   **Conteúdo Gerenciável**: Todas as páginas (Home, Sobre, Sustentabilidade) editáveis via CMS.
-   **SEO**: Campos obrigatórios de Meta Title, Description e OG Tags em todas as páginas.
-   **Blog**: Categorias, tags, autores e postagens relacionadas.

### Módulo 2: Ecommerce
-   **Catálogo**: Produtos simples e variáveis (packs).
-   **Estoque**: Controle de estoque integrado (MVP: controle manual no CMS).
-   **Preços**: Preços promocionais (De/Por).
-   **Frete**: Integração básica de cálculo (Correios/Melhor Envio) ou tabela fixa.
-   **Pagamento**: Gateway de pagamento (Pagar.me, Stripe ou similar - a definir na Tech Spec).

### Módulo 3: Estância (Ingressos)
-   **Capacidade Diária**: Limite configurável por dia (ex: 500 pessoas).
-   **Bloqueio de Agenda**: Dias fechados para manutenção ou eventos privados.
-   **Tipos de Ingresso**: Diferenciação de preços (Inteira, Meia, Promocional).
-   **Validade**: QR Code válido apenas para a data selecionada.
-   **Anti-Fraude**: QR Code único, inválido após o primeiro uso (leitura de entrada).

### Módulo 4: Backoffice (Admin)
-   **Dashboard**: Visão geral de vendas (Ecommerce vs Estância).
-   **Gestão de Pedidos**: Status de pagamento e envio.
-   **Relatórios**: Exportação de lista de visitantes do dia (Check-in list).

---

## 4. Fluxos e Casos de Uso

| ID | Caso de Uso | Ator | Descrição |
| :--- | :--- | :--- | :--- |
| **UC01** | Comprar Ingresso | Cliente | Seleciona data, paga e recebe QR Code. |
| **UC02** | Validar Ingresso | Operador | Lê QR Code e libera entrada. |
| **UC03** | Gerenciar Capacidade | Admin | Define limite de pessoas por dia. |
| **UC04** | Publicar Artigo | Mkt | Cria e publica conteúdo no blog. |
| **UC05** | Cadastrar Produto | Admin | Adiciona novo SKU ao catálogo. |

---

## 5. Requisitos Não-Funcionais
-   **Performance**: Core Web Vitals (LCP < 2.5s) em 3G.
-   **Disponibilidade**: 99.9% de uptime (considerando picos de venda).
-   **Segurança**: Dados de pagamento processados apenas pelo Gateway (PCI Compliance via tokenização).
-   **Mobile-First**: Interface otimizada para smartphones.

---
**Status**: 🟡 Em Aprovação
