# ThinkSpace - Front-end Core & Product Design

> **🏆 Projeto Premiado:** 2º lugar nacional na **FEMIC Jovem** (Categoria: Ciências Exatas e da Terra).
> ** Diferencial:** Engenharia de interface escalável, integração com IA e arquitetura social.

O **ThinkSpace** é uma plataforma educacional de alta complexidade que une gamificação e IA, desenvolvida para transformar a forma como estudantes organizam, produzem e compartilham materiais de estudo. Concebida como um produto digital completo, integra estudo individual, colaboração em comunidade e geração inteligente de conteúdo com IA em um único ecossistema.

A solução reúne planejamento acadêmico, interação social e recursos de Inteligência Artificial, proporcionando uma experiência de aprendizado personalizada, dinâmica e orientada a desempenho. Como **Co-idealizador e Líder de Front-end**, atuei na concepção estratégica do produto e na arquitetura completa da camada de cliente, focando em performance, lógica científica e usabilidade multiplataforma.

---

## Engenharia e Execução Técnica (Foco em Contratação)

### 1. Arquitetura e Componentização
* **Atomic Design:** Estruturação de componentes reutilizáveis e escaláveis para garantir a consistência visual e facilitar a manutenção do sistema.
* **Gerenciamento de Estado Complexo:** Implementação de fluxos de dados dinâmicos para garantir que as interações de gamificação e métricas sejam atualizadas em tempo real, sem a necessidade de refresh (UX Fluida).
* **Roteamento Dinâmico:** Utilização do **Next.js App Router** para criação de rotas dinâmicas e otimizadas para Salas de Estudo e perfis de usuários.

### 2. Integração E2E (End-to-End) & IA
* **Consumo de APIs REST:** Implementação de uma camada de serviços robusta utilizando **Interceptors** para tratamento global de erros, gerenciamento de tokens e autenticação.
* **Pipeline de IA:** Desenvolvimento da lógica de upload de documentos e estratégia de **polling/tratamento de dados** para exibição assíncrona de Flashcards e Quizzes gerados via IA.
* **Segurança e Fluxo:** Integração de fluxos de autenticação protegidos (Middlewares) e proteção de rotas privadas no lado do cliente.

### 3. Ideação e Estratégia de Produto (Product-Minded)
* **Concepção da Comunidade:** Idealizei do zero todo o módulo de rede social e colaboração, criando a lógica de salas temáticas, compartilhamento de materiais e engajamento.
* **Multiplataforma por Design:** Codificação de layouts adaptáveis (Mobile-first) com foco em usabilidade, garantindo performance consistente em qualquer dispositivo.
* **Social Engine:** Desenvolvimento do sistema de Feed, incluindo interações de curtidas, comentários e salvamento com feedback visual instantâneo (**Optimistic Updates**).

---

## Funcionalidades Implementadas

* 🤖 **AI Studio:** Interface avançada para geração de materiais via documentos, tópicos ou assuntos.
* 👥 **Community Hub:** Sistema de busca, salas temáticas e descoberta de conteúdos globais.
* 📊 **Analytics Dashboard:** Componentes gráficos para visualização de desempenho e rankings internos.
* 📅 **Planner & Notificações:** Sistema visual de pendências com filtros de categoria e alertas em tempo real.

---

## Stack Tecnológica

* **Core:** Next.js (App Router), TypeScript, React.js.
* **Estilização:** Tailwind CSS (Design System).
* **Comunicação:** Axios (Interceptors) / Fetch API.
* **Deploy & CI/CD:** Vercel.

---

## Impacto e Reconhecimento
Validado por uma banca técnica nacional, o projeto conquistou o **2º lugar na FEMIC Jovem (Ciências Exatas e da Terra)**. O destaque foi a maturidade da arquitetura front-end e a inovação no módulo de comunidade, provando capacidade de entrega de soluções complexas, escaláveis e prontas para o usuário final.

---

## Como Executar

1. Clone o repositório: `git clone https://github.com/seu-usuario/thinkspace-frontend`
2. Instale as dependências: `npm install`
3. Configure o `.env.local` e rode: `npm run dev`

---

## 📩 Contato
Guilherme Monteiro Ramos - [LinkedIn](http://www.linkedin.com/in/guilherme-monteiro-7a1359247) | [E-mail](mailto:guilhermemr2011j@gmail.com)
