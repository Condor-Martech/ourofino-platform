# 01-POC: Prova de Conceito (Proof of Concept)

## Objetivo
Validar a viabilidade técnica e arquitetural dos componentes de maior risco do projeto Ouro Fino antes do desenvolvimento em escala.

---

## Escopo da POC

A POC focará em três pilares críticos que representam os maiores riscos técnicos e de negócio:

1.  **Motor de Reservas da Estância (Alta Concorrência)**
2.  **Integração Payload CMS + Astro (Ecommerce)**
3.  **Validação de Ingressos Offline/Online (QR Code)**

---

## 1. Motor de Reservas (Estância)

### Risco
Overbooking em dias de alta demanda (feriados, eventos) devido à concorrência de acessos simultâneos.

### Validação Necessária
Implementar um protótipo do sistema de **travamento de slots** usando Redis.

### Implementação da POC
-   **Backend**: Endpoint `POST /api/reservations/lock`.
-   **Lógica**:
    1.  Recebe `date`, `timeslot`, `quantity`.
    2.  Verifica disponibilidade no Redis (`INCR` atômico ou Lua script).
    3.  Se `current + quantity <= limit`, retorna OK e define TTL de 15 minutos.
    4.  Se não, retorna erro de "Esgotado".
-   **Teste de Carga**: Simular 1000 requisições simultâneas para o mesmo slot para garantir consistência.

---

## 2. Integração Payload CMS + Astro

### Risco
Complexidade na sincronização de estado do carrinho e renderização híbrida (SSG + SSR) para produtos.

### Validação Necessária
Confirmar o fluxo de "Adicionar ao Carrinho" e "Checkout" com persistência de sessão.

### Implementação da POC
-   **Payload**: Configurar coleção `Products` e `Orders`.
-   **Astro**:
    -   Página de Produto (SSG) com dados vindos do Payload API.
    -   Componente de Carrinho (Ilha interativa - React/Preact) persistindo estado no `localStorage` e sincronizando com backend via API.
-   **Fluxo**:
    1.  Listar produto.
    2.  Adicionar ao carrinho.
    3.  Criar "Draft Order" no Payload.

---

## 3. Validação de Ingressos (QR Code)

### Risco
Latência na validação na portaria e segurança contra fraudes (duplicação de QR).

### Validação Necessária
Sistema de assinatura digital e validação rápida.

### Implementação da POC
-   **Geração**:
    -   Criar JWT assinado contendo `ticket_id`, `date`, `user_id`.
    -   Gerar QR Code a partir deste JWT.
-   **Validação (App/PWA)**:
    -   Ler QR Code.
    -   Validar assinatura JWT (offline capability).
    -   Consultar status no banco (online check) para prevenir reuso ("double spend").
-   **Métrica de Sucesso**: Tempo de validação < 500ms.

---

## Critérios de Aprovação da POC

| Componente | Critério de Sucesso | Status |
| :--- | :--- | :--- |
| **Reservas** | Zero overbooking em teste de carga (1k req/s). | 🔴 Pendente |
| **Ecommerce** | Ciclo completo: Ver Produto -> Carrinho -> Draft Order criado. | 🔴 Pendente |
| **QR Code** | Validação bem-sucedida de token assinado e rejeição de token reutilizado. | 🔴 Pendente |

---

## Próximos Passos
Após a validação destes pontos, iniciar a implementação das Epics conforme o [Plano de Execução](./06-TASK-PLAN.md).
