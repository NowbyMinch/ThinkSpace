# ThinkSpace - Front-end Engineering & Product Strategy

<p align="center">
  <img src="https://img.shields.io/badge/Status-Project_Completed-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Award-2nd_Place_National-gold?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs"/>
</p>

> **🏆 Projeto Premiado:** 2º lugar nacional na **FEMIC Jovem** (Categoria: Ciências Exatas e da Terra).
> **🚀 Foco Técnico:** IA Generativa Contextual, Arquitetura de Micro-comunidades e Gestão de Produtividade Acadêmica.

O **ThinkSpace** é uma plataforma colaborativa que utiliza Inteligência Artificial para otimizar o aprendizado acadêmico. Como **Co-idealizador e Líder de Front-end**, fui responsável por toda a implementação técnica da interface e pela integração com os serviços de backend, além de colaborar na definição do design e idealizar o conceito de comunidade.

---

## 🏗 Engenharia e Complexidade Técnica

### 1. Engine de IA Contextual & Geração de Materiais
A implementação de IA no ThinkSpace transforma inputs brutos em ferramentas pedagógicas estruturadas:

* **Outputs Pedagógicos Gerados:** A IA processa o contexto (PDFs, Temas ou Tópicos) e organiza a saída em três formatos prontos para o estudo:
    * **Flashcards:** Pares de pergunta e resposta otimizados para memorização ativa.
    * **Quizzes:** Testes de múltipla escolha para validação imediata do conhecimento.
    * **Resumos:** Sínteses estruturadas dos pontos fundamentais do conteúdo.
* **AI Tutor Chat (Interação Direta):** Implementei um chat contextual dentro de cada material gerado. O usuário pode tirar dúvidas específicas sobre o conteúdo que acabou de ser criado, exigindo gerenciamento de estado persistente e contexto delimitado.
* **AI Guard (Moderação de Conteúdo):** Colaborei na lógica de filtragem via IA para as interações sociais, garantindo que postagens e mensagens sejam estritamente educativas e seguras.
* **UX Assíncrona:** Desenvolvi toda a lógica de feedback visual (Skeletons/Spinners) para lidar com o tempo de processamento das LLMs, garantindo que o usuário tenha uma experiência fluida mesmo durante operações pesadas.

### 2. Gestão de Tempo e Notificações (Calendário Inteligente)
Desenvolvi um ecossistema de produtividade para organização de rotinas e combate à procrastinação:
* **Lembretes Personalizados:** Interface de calendário funcional que permite a criação de eventos vinculados a tópicos de estudo e descrições personalizadas.
* **Sistema de Notificações In-App:** Implementação de lógica de agendamento onde o usuário define o momento exato do alerta. As notificações são processadas e exibidas na dashboard inicial, garantindo que prazos acadêmicos não sejam perdidos.
* **Persistência de Agendamentos:** Gerenciamento de estados para exibição dinâmica de alertas futuros, mantendo o usuário orientado sobre suas próximas sessões de estudo.

### 3. Arquitetura de Salas de Estudo (Micro-comunidades)
Idealizei e implementei a lógica de organização descentralizada da plataforma:
* **Espaços Colaborativos:** Qualquer usuário pode criar e gerenciar **Salas de Estudo** temáticas (ex: Geometria, Neurociência). 
* **Fluxo de Conteúdo Híbrido:** Dentro de cada sala, implementei um sistema de postagens duplo: mensagens para interação direta/dúvidas e compartilhamento de **Materiais Inteligentes prontos** (Flashcards, Quizzes e Resumos), permitindo o consumo imediato por outros membros.
* **Hierarquia de Dados:** Organização estratégica em **Matérias** que agrupam materiais gerados, facilitando a navegação e a taxonomia do aprendizado.

### 4. Analytics & Data Visualization
Transformei dados brutos de interação em insights acadêmicos:
* **Métricas de Rendimento:** Lógica para processar e exibir porcentagens de acerto/erro, tarefas diárias realizadas e rendimento semanal através de componentes de visualização de dados.

---

## ✨ Funcionalidades em Destaque

* 🤖 **AI Material Factory:** Criação de materiais via PDF, temas globais ou tópicos específicos.
* 💬 **AI Tutor Chat:** Tutor dedicado para tirar dúvidas dentro do próprio material gerado.
* 📅 **Smart Planner:** Calendário com lembretes agendados e notificações internas em tempo real.
* 🏫 **Study Rooms:** Salas temáticas para colaboração e compartilhamento de conteúdos prontos.
* 📈 **Performance Tracking:** Acompanhamento detalhado da evolução acadêmica e taxas de acerto.

---

## 🛠 Ecossistema Técnico

### Front-end Stack
<p>
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs"/>
  <img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=000"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss"/>
</p>

### Integração & Design
<p>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios"/>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git"/>
</p>

---

## 📬 Contato
Guilherme Monteiro Ramos - [LinkedIn](https://www.linkedin.com/in/guilherme-monteiro-7a1359247) | [E-mail](mailto:guilhermemonteiroramos2007@gmail.com)
