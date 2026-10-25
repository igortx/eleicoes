# Apuração 2º turno 2026

- `index.html`: página (mapa por estado + exterior).
- `api/tse.js`: proxy dos arquivos JSON do TSE (Vercel Function).

Deploy: importar o repositório na Vercel (sem build). Variáveis opcionais: TSE_ELEICAO (6258), TSE_CICLO (ele2026).
Modo ao vivo: ligado em *.vercel.app; em domínio próprio, use ?live na URL.
Antes de divulgar: conferir parse() no index.html com um JSON real (/api/tse?uf=sp).
