# ThinkSpace - Front-end Core & Product Design

<p align="center">
  <img src="https://img.shields.io/badge/Status-Project_Completed-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Award-2nd_Place_National-gold?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs"/>
</p>

> **🏆 Projeto Premiado:** 2º lugar nacional na **FEMIC Jovem** (Categoria: Ciências Exatas e da Terra).
> **🚀 Diferencial:** Engenharia de interface escalável, integração com pipelines de IA e arquitetura social de alta complexidade.

O **ThinkSpace** é uma plataforma educacional de alta complexidade que une gamificação e IA, desenvolvida para transformar a forma como estudantes organizam, produzem e compartilham materiais de estudo. Como **Co-idealizador e Líder de Front-end**, atuei na concepção estratégica do produto e na arquitetura completa da camada de cliente, focando em performance, lógica científica e usabilidade multiplataforma.

---

## 📺 Demonstração em Vídeo
Confira a plataforma em ação e as principais funcionalidades implementadas:
[**ASSISTIR VÍDEO NO YOUTUBE**](LINK_DO_SEU_VIDEO_AQUI)

---

## 🏗 Engenharia de Software e Decisões de Arquitetura

### 1. Arquitetura Front-end & Escalabilidade
* **Modularização com Atomic Design:** Implementação de uma biblioteca de componentes proprietária, garantindo consistência visual e reduzindo o débito técnico em futuras expansões.
* **Performance & UX:** Aplicação de **Optimistic Updates** em interações sociais (curtidas/comentários) para eliminar a percepção de latência, e uso de **Server Components (Next.js)** para otimizar o SEO e o First Contentful Paint.
* **Gerenciamento de Estado Complexo:** Orquestração de estados globais e locais para gerenciar métricas de gamificação em tempo real, garantindo uma interface reativa e performática.

### 2. Ecossistema de IA e Dados
* **Processamento de Linguagem Natural (NLP):** Design de interface para fluxos assíncronos de geração de conteúdo. Implementei padrões de tratamento de erro e estratégias de **polling/loading states** para garantir que o processamento de arquivos PDF fosse transparente e fluido para o usuário.
* **Integração de APIs com Resiliência:** Uso de instâncias customizadas do Axios com **Interceptors**, permitindo a renovação automática de sessões e tratamento centralizado de HTTP Status Codes.

### 3. Visão de Produto e Social Engine
* **Lógica de Comunidade:** Desenvolvimento de um sistema de "Feed Social" dinâmico com suporte a filtragem por tópicos de interesse, salvamento de estado e descoberta de conteúdo global.
* **Analytics de Alta Performance (Data Vis):** Construção de Dashboards com lógica de agregação de dados no lado do cliente, transformando registros brutos de atividade em métricas visuais de progresso semanal e taxas de acerto.

---

## 🔥 Funcionalidades Implementadas

* 🤖 **AI Studio:** Interface avançada para geração de materiais (Flashcards, Quizzes e Resumos) via documentos PDF ou tópicos.
* 👥 **Community Hub:** Sistema de busca, salas temáticas e compartilhamento global de materiais gerados.
* 📊 **Analytics Dashboard:** Visualização de desempenho acadêmico, rankings internos e métricas de rendimento semanal.
* 📅 **Planner & Notificações:** Sistema visual de pendências com alertas em tempo real e filtros de categoria.

---

## 🛠 Stack Tecnológica

- **Core:** `Next.js (App Router)`, `TypeScript`, `React.js`.
- **Estilização:** `Tailwind CSS (Design System)`, `Lucide Icons`.
- **Backend & IA:** `Flask (Python)`, `MySQL`, `Hugging Face API`.
- **Comunicação:** `Axios (Interceptors)` / `Fetch API`.
- **Ferramentas:** `Docker`, `Figma`, `Vercel`.

---

## 🏆 Impacto e Reconhecimento
Validado por uma banca técnica nacional, o projeto conquistou o **2º lugar na FEMIC Jovem**. O destaque foi a **maturidade da arquitetura front-end** e a inovação no módulo de comunidade, provando capacidade de entrega de soluções prontas para o usuário final com tecnologias de ponta.

---

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/thinkspace-frontend](https://github.com/seu-usuario/thinkspace-frontend)
