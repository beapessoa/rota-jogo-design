# Rota do Enem — Quiz

Implementação em React + TypeScript do protótipo `Quiz App v6.dc.html`: um quiz gamificado
de preparação para o ENEM, com modo solo e duelo 1x1, roleta de matérias, XP, streak e ranking.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [react-router-dom](https://reactrouter.com) — uma rota por tela (login, home, roleta, quiz, resultado, ranking, perfil, ajustes)
- CSS Modules (sem framework de UI) — fiel à identidade visual do protótipo original
- Estado global via `useReducer` + Context, com o perfil (login, XP, streak, avatar, ajustes) persistido em `localStorage`

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`. O layout é mobile-first, mas se adapta bem a telas largas
(o "app" fica centralizado como um cartão em telas ≥720px).

## Build

```bash
npm run build
```

## Estrutura

- `src/pages/` — uma tela por rota
- `src/state/` — reducer, contexto e persistência do perfil
- `src/data/` — banco de perguntas, matérias e ranking (mock, sem backend)
- `src/components/` — layout compartilhado (frame do app, tab bar, barra do quiz, sheet de "jogar")
- `public/images/` — assets extraídos do protótipo original

## Decisões de escopo

- **Sem backend**: login, ranking de outros jogadores e o oponente do duelo são simulados no cliente,
  igual ao protótipo original.
- **Tema escuro**: o protótipo tinha a lógica de dark mode pronta mas nenhum botão para ativá-la;
  por decisão do time, só o tema claro foi implementado nesta versão.
- **Foto de perfil**: o protótipo usava um widget interno da ferramenta de design para upload/reframe
  de imagem; aqui foi substituído por um upload simples (clique ou arraste um arquivo).
