# Calculadora de Piso / Porcelanato

Calculadora web para estimar **área de ambiente**, **quantidade de caixas de porcelanato** e **custo total** da obra — tudo reativo, sem botões de calcular.

🔗 **Repositório:** [rafadsm/calculadora-piso](https://github.com/rafadsm/calculadora-piso)

---

## ✨ Recursos

- **Cálculo bidirecional da área**: digite quaisquer dois entre largura, comprimento ou m² — o terceiro é calculado automaticamente.
- **Área da peça**: largura × comprimento (em cm) → m² por peça.
- **Caixa flexível**: digite o m² da caixa **ou** a quantidade de peças — o outro se ajusta.
- **Resultados em tempo real**:
  - Preço por m² e por peça
  - Caixas necessárias (exato), peças necessárias, sobra na última caixa
  - Valor total e m² comprado
  - Versões com folga de **5%** e **10%** (área, caixas e valor)
- **Tema escuro**, responsivo, 100% client-side.

---

## 🛠 Stack

- HTML5
- CSS3 (sem frameworks)
- JavaScript puro (vanilla, sem dependências)

Sem build, sem `node_modules`, sem backend. Basta abrir o `index.html` no navegador.

---

## 🚀 Como rodar localmente

Clone o repositório e abra o arquivo:

```bash
git clone https://github.com/rafadsm/calculadora-piso.git
cd calculadora-piso
```

Depois é só abrir o `index.html` no navegador (ou usar a extensão *Live Server* do VS Code).

---

## 📋 Como usar

1. **Área do ambiente** — informe a largura e o comprimento, ou digite direto o m².
2. **Porcelanato** — informe as dimensões da peça (em cm). O m² por peça é calculado.
3. **Caixa** — preencha o m² da caixa ou o número de peças, e o preço da caixa.
4. Veja os resultados atualizando enquanto digita: caixas necessárias, sobras, valores totais e variações com folga.

---

## 📁 Estrutura

```
.
├── index.html    # estrutura e inputs
├── styles.css    # tema escuro, layout responsivo
├── app.js        # toda a lógica reativa
└── .gitignore
```

---

## 📄 Licença

MIT
