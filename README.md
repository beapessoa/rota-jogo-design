# Rota do Enem — Quiz

Implementação em React + TypeScript do protótipo `Quiz App v6.dc.html`: um quiz gamificado
de preparação para o ENEM, com modo solo e duelo 1x1, roleta de matérias, XP, streak e ranking.

Este repositório tem duas pastas:

- **[`react/`](react)** — o código-fonte (o projeto de verdade). É aqui que qualquer mudança deve
  ser feita.
- **[`html/`](html)** — o mesmo app já compilado para HTML/CSS/JS puro, pronto pra rodar sem precisar
  instalar nada. É gerado a partir da pasta `react/`, então **não edite os arquivos dentro de `html/`
  diretamente** — qualquer alteração feita lá se perde na próxima vez que o build for gerado de novo.

## Rodando a versão React (desenvolvimento)

```bash
cd react
npm install
npm run dev
```

Abra `http://localhost:5173`. O layout é mobile-first, mas se adapta bem a telas largas
(o "app" fica centralizado como um cartão em telas ≥720px).

## Abrindo a versão HTML pronta

A pasta `html/` não pode ser aberta com duplo clique no `index.html` — o navegador bloqueia o
carregamento dos arquivos por causa do `file://`. Ela precisa ser servida por um mini servidor local:

```bash
npx serve -s html
```

(o `-s` garante que dar refresh em qualquer tela, tipo `/quiz` ou `/ranking`, funcione). Depois é só
abrir o link que aparecer no terminal.

## Gerando a versão HTML de novo

Sempre que o código em `react/` mudar, regenere `html/` com:

```bash
cd react
npm run build
rm -rf ../html
cp -R dist/. ../html/
```

## Estrutura (dentro de `react/src`)

- `pages/` — uma tela por rota
- `state/` — reducer, contexto e persistência do perfil
- `data/` — banco de perguntas, matérias e ranking (mock, sem backend)
- `components/` — layout compartilhado (frame do app, tab bar, barra do quiz, sheet de "jogar")
- `public/images/` — assets extraídos do protótipo original

## Decisões de escopo

- **Sem backend**: login, ranking de outros jogadores e o oponente do duelo são simulados no cliente,
  igual ao protótipo original.
- **Tema escuro**: o protótipo tinha a lógica de dark mode pronta mas nenhum botão para ativá-la;
  por decisão do time, só o tema claro foi implementado nesta versão.
- **Foto de perfil**: o protótipo usava um widget interno da ferramenta de design para upload/reframe
  de imagem; aqui foi substituído por um upload simples (clique ou arraste um arquivo).
