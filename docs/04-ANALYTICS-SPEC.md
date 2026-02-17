# 04-ANALYTICS-SPEC: Especificação de Analytics e Dados

## 1. Visão Geral

Implementação robusta de coleta de dados para orientar decisões de negócio e marketing. A arquitetura utiliza **Google Tag Manager (GTM)** como camada de abstração e **PostHog** como ferramenta principal de Product Analytics, além do **GA4** (via GTM).

---

## 2. Taxonomia de Eventos (Event Taxonomy)

Padronização: `snake_case` para nomes de eventos e propriedades.

### 2.1. Eventos Globais
| Evento | Gatilho | Propriedades Críticas |
| :--- | :--- | :--- |
| `page_view` | Carregamento de nova rota. | `path`, `title`, `referrer`, `user_id` (se logado). |
| `error_captured` | Erro de JS ou API. | `error_message`, `component`, `stack_trace` (truncado). |

### 2.2. Ecommerce
| Evento | Gatilho | Propriedades Críticas |
| :--- | :--- | :--- |
| `product_view` | Visualização de PDP. | `product_id`, `name`, `price`, `category`. |
| `add_to_cart` | Clique no botão "Comprar". | `product_id`, `quantity`, `value`. |
| `checkout_start` | Início do fluxo de pagamento. | `cart_total`, `items_count`. |
| `purchase` | Sucesso no pagamento. | `order_id`, `revenue`, `tax`, `shipping`. |

### 2.3. Estância (Ingressos)
| Evento | Gatilho | Propriedades Críticas |
| :--- | :--- | :--- |
| `ticket_selection` | Seleção de data/quantidade. | `event_date`, `ticket_type`, `quantity`. |
| `reservation_created` | Bloqueio temporário (lock) ok. | `reservation_id`, `expires_at`. |
| `ticket_purchase` | Compra de ingresso concluída. | `ticket_ids`, `event_date`, `total_attendees`. |

### 2.4. Operacional (App Validação)
| Evento | Gatilho | Propriedades Críticas |
| :--- | :--- | :--- |
| `qr_scanned` | Leitura de código QR. | `scan_result` (success/fail), `error_reason`. |
| `qr_validated` | Validação positiva (entrada). | `ticket_id`, `validator_id`, `timestamp`. |

---

## 3. Camada de Dados (dataLayer)

A aplicação deve empurrar dados para o `window.dataLayer` **antes** do carregamento do snippet do GTM ou imediatamente após interações.

Exemplo de Payload `purchase`:
```javascript
window.dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: "T12345",
    value: 59.90,
    tax: 0,
    shipping: 15.00,
    currency: "BRL",
    items: [
      {
        item_id: "SKU_12345",
        item_name: "Água Ouro Fino Premium 500ml",
        price: 5.99,
        quantity: 10
      }
    ]
  }
});
```

---

## 4. Mapeamento GTM & PostHog

### Google Tag Manager
-   **Tags**:
    -   GA4 Config & Eventos.
    -   PostHog HTML Snippet (inicialização).
    -   PostHog Event Capture (via Custom HTML ou Template).
-   **Triggers**:
    -   Custom Event: Nome exato da taxonomia (`purchase`, `add_to_cart`).
-   **Variables**:
    -   Data Layer Variables para todas as propriedades críticas.

### PostHog
-   **Captura**: Automática de Pageviews e Clicques (Autocapture) + Eventos Customizados via GTM.
-   **Identificação**:
    -   Chamada explicita `posthog.identify(user_id)` após login ou cadastro.
    -   `posthog.group('company', company_id)` se B2B.

---

## 5. Plano de Implementação
1.  Criar conta GTM e Container Web.
2.  Configurar GA4 e PostHog no GTM.
3.  Desenvolvedor Frontend implementa `dataLayer.push()` conforme taxonomia.
4.  Setup de painéis (Dashboards) no PostHog para monitoramento de funis.
