// Proxy leve para os arquivos JSON do TSE (evita CORS e alivia o servidor com cache de borda).
// Variáveis opcionais na Vercel: TSE_ELEICAO (padrão 6258) e TSE_CICLO (padrão ele2026).
module.exports = async function handler(req, res) {
  const uf = String(req.query.uf || "br").toLowerCase();
  if (!/^[a-z]{2}$/.test(uf)) return res.status(400).json({ erro: "uf inválida" });
  const eleicao = process.env.TSE_ELEICAO || "6258";
  const ciclo = process.env.TSE_CICLO || "ele2026";
  const id = eleicao.padStart(6, "0");
  const url = `https://resultados.tse.jus.br/oficial/${ciclo}/${eleicao}/dados/${uf}/${uf}-c0001-e${id}-u.json`;
  try {
    const r = await fetch(url, { headers: { accept: "application/json" } });
    if (!r.ok) return res.status(r.status).json({ erro: `TSE respondeu ${r.status}`, url });
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate=40");
    res.status(200).send(await r.text());
  } catch (e) {
    res.status(502).json({ erro: "falha ao buscar no TSE", url });
  }
};
