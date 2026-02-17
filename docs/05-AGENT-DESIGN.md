# 05-AGENT-DESIGN: Arquitetura de Agentes Multi-Agentes

## 1. Visão Geral

Para executar o projeto Ouro Fino em 8 semanas, utilizaremos uma arquitetura de Agentes de IA especializados. Cada agente terá responsabilidades claras, templates de prompt definidos e guardrails de qualidade.

---

## 2. Agentes

### 2.1. Frontend Agent (Agent-FE)
*   **Responsabilidade**: Implementar interfaces Astro + React, estilização (TailwindCSS) e animações.
*   **Inputs**: PRD (Jornadas), Wireframes (se houver), Design System.
*   **Outputs**: Componentes `.astro`, `.tsx`, testes de UI.
*   **Prompt Template**:
    > "Você é um especialista em Astro e TailwindCSS. Crie o componente [NOME] seguindo o Design System. Use Framer Motion para [ANIMAÇÃO]. Garanta acessibilidade WCAG 2.1 e responsividade mobile-first."
*   **Guardrails**:
    -   Não hardcode textos (use i18n/CMS).
    -   Use apenas classes utilitárias do Tailwind (evite `style` inline).
    -   Valide props com TypeScript.

### 2.2. Backend/Payload Agent (Agent-BE)
*   **Responsabilidade**: Configurar Payload CMS, Collections, APIs customizadas e integrações (Redis/Postgres).
*   **Inputs**: Tech Spec (Schema), Regras de Negócio.
*   **Outputs**: Configurações de Collections, Hooks, Endpoints Express.
*   **Prompt Template**:
    > "Configure uma Collection [NOME] no Payload CMS. Campos: [LISTA]. Implemente um Hook 'beforeChange' para [REGRA]. Garanta que índices de banco de dados sejam criados para [CAMPOS DE BUSCA]."
*   **Guardrails**:
    -   Sempre valide dados de entrada (Zod/Joi).
    -   Trate erros com blocos try-catch e logger.
    -   Documente APIs via Swagger/OpenAPI.

### 2.3. QA Agent (Agent-QA)
*   **Responsabilidade**: Criar testes E2E (Playwright), unitários e roteiros de teste manual.
*   **Inputs**: Código fonte, PRD (Critérios de Aceite).
*   **Outputs**: Scripts de teste, Relatórios de Bugs.
*   **Prompt Template**:
    > "Analise o fluxo [FLUXO] descrito no PRD. Escreva um teste Playwright que simule um usuário feliz e dois casos de erro (input inválido e falha de rede)."
*   **Guardrails**:
    -   Testes devem ser independentes e idempotentes.
    -   Cubra 100% dos caminhos críticos (Checkout, Reserva).

### 2.4. Analytics Agent (Agent-DATA)
*   **Responsabilidade**: Instrumentar código com GTM e PostHog.
*   **Inputs**: Analytics Spec, Componentes Frontend.
*   **Outputs**: `dataLayer.push()` snippets, Configuração GTM (JSON).
*   **Prompt Template**:
    > "Adicione o evento [NOME_EVENTO] ao clique do botão [BOTÃO]. Certifique-se de capturar as propriedades [PROPS] do estado do componente."
*   **Guardrails**:
    -   Nomes de eventos devem seguir estritamente o `snake_case`.
    -   Não exponha PII (Dados Pessoais) sem hashing.
    -   Verifique se o Data Layer está limpo antes de novos pushes.

### 2.5. DevOps Agent (Agent-OPS)
*   **Responsabilidade**: CI/CD, Infraestrutura as Code (IaC), Monitoramento.
*   **Inputs**: Tech Spec (Infra), Dockerfiles.
*   **Outputs**: GitHub Actions Workflows, arquivos Terraform/Pulumi, Configuração Sentry.
*   **Prompt Template**:
    > "Crie um workflow do GitHub Actions para [SERVIÇO]. Deve rodar lint, testes e, se passar, fazer deploy em [AMBIENTE] somente na branch main."
*   **Guardrails**:
    -   Segredos nunca devem ser commitados (use Secrets Vault).
    -   Princípio do menor privilégio em IAM.
    -   Habilite logs de auditoria.

---

## 3. Fluxo de Trabalho e Handoffs

1.  **Planejamento**: PM (Humano) -> Define Task.
2.  **Dev (FE/BE)**: Agent-FE/Agent-BE implementa feature.
3.  **Instrumentação**: Agent-DATA adiciona tracking.
4.  **Validação**: Agent-QA roda testes.
5.  **Deploy**: Agent-OPS automatiza release.

| De | Para | Artefato de Handoff |
| :--- | :--- | :--- |
| **Agent-BE** | **Agent-FE** | Documentação API (Swagger) + Mock Data |
| **Agent-FE** | **Agent-DATA** | Lista de seletores de elementos p/ GTM |
| **Agent-QA** | **Agent-OPS** | Script de Smoke Test p/ Pipeline |
