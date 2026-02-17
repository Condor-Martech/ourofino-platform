# 06-TASK-PLAN: Plano de Execução de 8 Semanas

## Visão Geral
Roadmap agressivo para entrega do MVP em 2 meses, com paralelismo entre Frontend e Backend facilitado pela arquitetura Headless.

---

## Cronograma Macro (Roadmap)

| Semana | Foco Principal | Entregáveis Chave |
| :--- | :--- | :--- |
| **S1** | **Setup & POCs** | Repo setup, CI/CD básico, POCs (Reserva/QR) aprovadas. |
| **S2** | **Backend Foundation** | Payload CMS configurado, Modelagem de Dados, Auth Setup. |
| **S3** | **Frontend Foundation** | Design System (Tailwind), Componentes Base, Home Institucional. |
| **S4** | **Ecommerce Core** | Catálogo, Carrinho, Integração API de Produtos. |
| **S5** | **Estância Module** | Motor de Reservas (Redis), Calendário, Seleção de Ingressos. |
| **S6** | **Checkout & Pagamentos** | Integração Gateway, Fluxo de Checkout Unificado, Geração de QR. |
| **S7** | **Apps Satélites & Analytics** | App Validador (PWA), Dashboards PostHog, Testes E2E. |
| **S8** | **QA, Bugfix & Launch** | Stress Test, Homologação Final, Deploy em Produção. |

---

## Detalhamento Semanal

### Semana 1: Setup & Validação de Riscos
- [x] [OPS] Configurar repositório Monorepo.
- [x] [OPS] Pipeline CI/CD Hello World (Vercel).
- [x] [BE-POC] Implementar e validar endpoint de travamento de slots (Redis).
- [x] [BE-POC] Gerar e validar assinatura de QR Code (JWT Offline).

### Semana 2: Backend Core (Payload CMS)
- [x] [BE] Configurar Payload CMS + PostgreSQL.
- [x] [BE] Criar Collections: Users, Media, Pages (Institucional).
- [x] [BE] Criar Collections: Products, Categories (Ecommerce).
- [x] [BE] Criar Collections: Events, Tickets (Estância).

### Semana 3: Frontend Base & Institucional
- [x] [FE] Setup Astro + Tailwind + Framer Motion.
- [x] [FE] Implementar Header, Footer e Layout Base.
- [x] [FE] Páginas Institucionais (Home, Sobre) consumindo Payload API.
- [x] [QA] Testes visuais dos componentes base.

### Semana 4: Ecommerce - Descoberta e Carrinho
- [x] [FE] Página de Listagem de Produtos (PLP) com filtros.
- [x] [FE] Página de Detalhe de Produto (PDP) com variações.
- [x] [FE] Componente de Carrinho (Slide-over) com persistência local.
- [x] [BE] Endpoints de cálculo de frete (mock ou integração real).

### Semana 5: Estância - Agendamento
- [ ] [FE] Interface de Calendário e Seleção de Horários.
- [ ] [BE] Integrar endpoint de travamento de slots com frontend.
- [ ] [FE] Fluxo de seleção de ingressos.
- [ ] [DATA] Instrumentar funil de reserva.

### Semana 6: Checkout & Pagamento
- [ ] [BE] Integração com Gateway de Pagamento, pode ser feita para a pessoa definir a integradora, mas pelo default integra coom a Stripe.
- [ ] [FE] Checkout Page, tipo One Checkout Page (Dados Pessoais + Pagamento).
- [ ] [BE] Webhook de processamento de pagamento.
- [ ] [BE] Worker de geração de ingressos (pós-pagamento).

### Semana 7: Validação e Operação
- [ ] [FE] PWA para Operadores (Leitor de QR Code).
- [ ] [BE] Endpoint de validação/baixa de ingressos.
- [ ] [DATA] Configurar GTM e Dashboards PostHog.
- [ ] [QA] Testes de Carga no fluxo de validação.

### Semana 8: Go-Live
- [ ] [QA] Regressão completa.
- [ ] [OPS] Setup de Domínios e SSL.
- [ ] [OPS] Warm-up de Cache.
- [ ] [MKT] Validação de SEO e Tags.
- [ ] **LANÇAMENTO**.

---

## Definição de Pronto (DoD - Definition of Done)
1.  Código commitado na branch `main`.
2.  Pipeline de CI/CD verde (Build + Testes).
3.  Feature validada em ambiente de Staging.
4.  Analytics (eventos) verificados no DebugView.
5.  Documentação atualizada (se houve mudança de regra).
