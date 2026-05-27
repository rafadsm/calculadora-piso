const $ = (id) => document.getElementById(id);

const els = {
  areaL: $("area-largura"),
  areaC: $("area-comprimento"),
  areaM2: $("area-m2"),
  pecaL: $("peca-largura"),
  pecaC: $("peca-comprimento"),
  pecaM2: $("peca-m2"),
  caixaM2: $("caixa-m2"),
  caixaPecas: $("caixa-pecas"),
  caixaPreco: $("caixa-preco"),
  precoM2: $("preco-m2"),
  rPrecoM2: $("r-preco-m2"),
  rPrecoPeca: $("r-preco-peca"),
  rCaixas: $("r-caixas"),
  rPecas: $("r-pecas"),
  rSobra: $("r-sobra"),
  rTotal: $("r-total"),
  rM2Comp: $("r-m2-comprado"),
  r5Area: $("r5-area"),
  r5Caixas: $("r5-caixas"),
  r5Valor: $("r5-valor"),
  r10Area: $("r10-area"),
  r10Caixas: $("r10-caixas"),
  r10Valor: $("r10-valor"),
  limpar: $("limpar"),
};

const num = (el) => {
  const v = parseFloat(el.value);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

const fmtBRL = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const fmtNum = (v, d = 2) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

const setVal = (el, v) => {
  if (document.activeElement === el) return;
  el.value = v === 0 || !Number.isFinite(v) ? "" : +v.toFixed(4);
};

let lastAreaEdited = null;

["areaL", "areaC", "areaM2"].forEach((k) => {
  els[k].addEventListener("focus", () => (lastAreaEdited = k));
  els[k].addEventListener("input", () => {
    lastAreaEdited = k;
    recalcArea();
    recalcAll();
  });
});

function recalcArea() {
  const L = num(els.areaL);
  const C = num(els.areaC);
  const M = num(els.areaM2);

  if (lastAreaEdited === "areaL" || lastAreaEdited === "areaC") {
    if (L > 0 && C > 0) setVal(els.areaM2, L * C);
  } else if (lastAreaEdited === "areaM2") {
    if (M > 0 && L > 0 && document.activeElement !== els.areaC) {
      setVal(els.areaC, M / L);
    } else if (M > 0 && C > 0 && document.activeElement !== els.areaL) {
      setVal(els.areaL, M / C);
    }
  }
}

let lastPecaEdited = null;
["pecaL", "pecaC", "pecaM2"].forEach((k) => {
  els[k].addEventListener("focus", () => (lastPecaEdited = k));
  els[k].addEventListener("input", () => {
    lastPecaEdited = k;
    recalcPeca();
    recalcCaixa();
    recalcAll();
  });
});

function recalcPeca() {
  const Lcm = num(els.pecaL);
  const Ccm = num(els.pecaC);
  if (Lcm > 0 && Ccm > 0) {
    const m2 = (Lcm / 100) * (Ccm / 100);
    setVal(els.pecaM2, m2);
  }
}

let lastCaixaEdited = null;
["caixaM2", "caixaPecas"].forEach((k) => {
  els[k].addEventListener("focus", () => (lastCaixaEdited = k));
  els[k].addEventListener("input", () => {
    lastCaixaEdited = k;
    recalcCaixa();
    syncPrecoFromCaixaM2();
    recalcAll();
  });
});

function syncPrecoFromCaixaM2() {
  const cxM2 = num(els.caixaM2);
  const cxPreco = num(els.caixaPreco);
  const pM2 = num(els.precoM2);
  if (cxM2 <= 0) return;
  if (lastPrecoEdited === "precoM2" && pM2 > 0) {
    setVal(els.caixaPreco, pM2 * cxM2);
  } else if (cxPreco > 0) {
    setVal(els.precoM2, cxPreco / cxM2);
  }
}

function recalcCaixa() {
  const pecaM2 = num(els.pecaM2);
  const cxM2 = num(els.caixaM2);
  const cxPc = num(els.caixaPecas);

  if (pecaM2 <= 0) return;

  if (lastCaixaEdited === "caixaM2" && cxM2 > 0) {
    setVal(els.caixaPecas, Math.round(cxM2 / pecaM2));
  } else if (lastCaixaEdited === "caixaPecas" && cxPc > 0) {
    setVal(els.caixaM2, cxPc * pecaM2);
  } else if (cxM2 > 0 && cxPc === 0) {
    setVal(els.caixaPecas, Math.round(cxM2 / pecaM2));
  } else if (cxPc > 0 && cxM2 === 0) {
    setVal(els.caixaM2, cxPc * pecaM2);
  }
}

let lastPrecoEdited = null;
["caixaPreco", "precoM2"].forEach((k) => {
  els[k].addEventListener("focus", () => (lastPrecoEdited = k));
  els[k].addEventListener("input", () => {
    lastPrecoEdited = k;
    recalcPreco();
    recalcAll();
  });
});

function recalcPreco() {
  const cxM2 = num(els.caixaM2);
  const cxPreco = num(els.caixaPreco);
  const pM2 = num(els.precoM2);

  if (cxM2 <= 0) return;

  if (lastPrecoEdited === "caixaPreco" && cxPreco > 0) {
    setVal(els.precoM2, cxPreco / cxM2);
  } else if (lastPrecoEdited === "precoM2" && pM2 > 0) {
    setVal(els.caixaPreco, pM2 * cxM2);
  }
}

function recalcAll() {
  const areaM2 = num(els.areaM2);
  const pecaM2 = num(els.pecaM2);
  const cxM2 = num(els.caixaM2);
  const cxPc = num(els.caixaPecas);
  const cxPreco = num(els.caixaPreco);

  // preço por m² e por peça
  if (cxM2 > 0 && cxPreco > 0) {
    els.rPrecoM2.textContent = fmtBRL(cxPreco / cxM2);
  } else {
    els.rPrecoM2.textContent = "—";
  }
  if (cxPc > 0 && cxPreco > 0) {
    els.rPrecoPeca.textContent = fmtBRL(cxPreco / cxPc);
  } else {
    els.rPrecoPeca.textContent = "—";
  }

  const renderBloco = (areaNecessaria, elArea, elCaixas, elValor) => {
    if (areaNecessaria <= 0 || cxM2 <= 0) {
      if (elArea) elArea.textContent = "—";
      elCaixas.textContent = "—";
      if (elValor) elValor.textContent = "—";
      return null;
    }
    const caixas = Math.ceil(areaNecessaria / cxM2);
    if (elArea) elArea.textContent = `${fmtNum(areaNecessaria)} m²`;
    elCaixas.textContent = `${caixas}`;
    if (elValor) {
      elValor.textContent = cxPreco > 0 ? fmtBRL(caixas * cxPreco) : "—";
    }
    return caixas;
  };

  // exato
  const caixasExato = renderBloco(areaM2, null, els.rCaixas, null);
  if (caixasExato !== null) {
    const m2Comp = caixasExato * cxM2;
    const sobraM2 = m2Comp - areaM2;
    els.rM2Comp.textContent = `${fmtNum(m2Comp)} m²`;
    els.rSobra.textContent = `${fmtNum(sobraM2)} m²`;
    if (pecaM2 > 0) {
      const pecasNec = Math.ceil(areaM2 / pecaM2);
      els.rPecas.textContent = `${pecasNec}`;
    } else {
      els.rPecas.textContent = "—";
    }
    els.rTotal.textContent = cxPreco > 0 ? fmtBRL(caixasExato * cxPreco) : "—";
  } else {
    els.rPecas.textContent = "—";
    els.rSobra.textContent = "—";
    els.rTotal.textContent = "—";
    els.rM2Comp.textContent = "—";
  }

  // 5%
  renderBloco(areaM2 * 1.05, els.r5Area, els.r5Caixas, els.r5Valor);
  // 10%
  renderBloco(areaM2 * 1.10, els.r10Area, els.r10Caixas, els.r10Valor);
}

els.limpar.addEventListener("click", () => {
  document.querySelectorAll("input").forEach((i) => (i.value = ""));
  recalcAll();
});

recalcAll();
