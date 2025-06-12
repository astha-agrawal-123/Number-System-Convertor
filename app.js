document.addEventListener("DOMContentLoaded", function () {
  const convertBtn = document.querySelector(".result-btn");
  if (convertBtn) convertBtn.addEventListener("click", convertDecimal);

  const pageMode = detectMode();

  function detectMode() {
    if (location.pathname.includes("hex")) return "hex";
    if (location.pathname.includes("octal")) return "octal";
    return "binary"; // default
  }

  function convertDecimal() {
    let decimal = parseInt(document.getElementById("number").value);
    if (isNaN(decimal)) {
      alert("Please enter a valid decimal number.");
      return;
    }

    let converted;
    if (pageMode === "hex") {
      converted = decimal.toString(16).toUpperCase();
    } else if (pageMode === "octal") {
      converted = decimal.toString(8);
    } else {
      converted = decimal.toString(2);
    }

    const h1 = document.createElement("h1");
    h1.innerHTML = `Converted Value: ${converted}`;
    const container = document.querySelector(".results-container");
    container.innerHTML = "";
    container.append(h1);
  }
});

document
  .querySelector(".calculator button")
  .addEventListener("click", calculate);

function calculate() {
  const val1 = document.getElementById("binary1").value.trim();
  const val2 = document.getElementById("binary2").value.trim();
  const operation = document.querySelector(
    'input[name="operation"]:checked'
  ).value;
  const mode = detectMode();

  let num1 = convertToDecimal(val1, mode, "Number 1");
  if (num1 === null) return;

  let num2 = convertToDecimal(val2, mode, "Number 2");
  if (num2 === null) return;

  let resultDecimal;
  switch (operation) {
    case "add":
      resultDecimal = num1 + num2;
      break;
    case "subtract":
      resultDecimal = num1 - num2;
      break;
    case "and":
      resultDecimal = num1 & num2;
      break;
    case "or":
      resultDecimal = num1 | num2;
      break;
    default:
      resultDecimal = 0;
  }

  let resultConverted;
  if (mode === "hex") {
    resultConverted = resultDecimal.toString(16).toUpperCase();
  } else if (mode === "octal") {
    resultConverted = resultDecimal.toString(8);
  } else {
    resultConverted = resultDecimal.toString(2);
  }

  const resultContainer = document.querySelector(".results-container");
  const calcResult = document.createElement("div");
  calcResult.innerHTML = `
  <h1>${capitalize(mode)} Result: ${resultConverted}</h1>
  <h1>Decimal Result: ${resultDecimal}</h1>
`;
  resultContainer.appendChild(calcResult);
  const tree = document.createElement("div");
  tree.classList.add("parse-tree");
  tree.innerHTML = `
  <div class="tree-node">${getSymbol(operation)}</div>
  <div class="tree-children">
    <div class="tree-node">${val1}</div>
    <div class="tree-node">${val2}</div>
  </div>
`;
resultContainer.appendChild(tree);
}

function getSymbol(op) {
  switch (op) {
    case "add": return "+";
    case "subtract": return "-";
    case "and": return "&";
    case "or": return "|";
    default: return "?";
  }
}

function convertToDecimal(value, type, fieldLabel) {
  value = value.trim();

  if (value === "") {
    alert(`Please fill out ${fieldLabel}`);
    return null;
  }

  switch (type) {
    case "binary":
      if (!/^[01]+$/.test(value)) {
        alert(`Invalid binary number in ${fieldLabel}`);
        return null;
      }
      return parseInt(value, 2);
    case "decimal":
      if (!/^\d+$/.test(value)) {
        alert(`Invalid decimal number in ${fieldLabel}`);
        return null;
      }
      return parseInt(value, 10);
    case "hex":
      if (!/^[0-9a-fA-F]+$/.test(value)) {
        alert(`Invalid hexadecimal number in ${fieldLabel}`);
        return null;
      }
      return parseInt(value, 16);
    case "octal":
      if (!/^[0-7]+$/.test(value)) {
        alert(`Invalid octal number in ${fieldLabel}`);
        return null;
      }
      return parseInt(value, 8);
    default:
      return null;
  }
}

function detectMode() {
  if (location.pathname.includes("hex")) return "hex";
  if (location.pathname.includes("octal")) return "octal";
  return "binary";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}