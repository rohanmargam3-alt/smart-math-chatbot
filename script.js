const chat = document.getElementById("chat");
const input = document.getElementById("input");

function add(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerHTML = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// ✅ FIXED EQUATION SOLVER
function solveEquation(inputText) {
    try {
        let eq = inputText.toLowerCase().replace("solve", "").trim();

        if (!eq.includes("=")) return "❌ Invalid equation";

        let [left, right] = eq.split("=");

        let expr = math.simplify(`(${left}) - (${right})`).toString();

        let match = expr.match(/([+-]?\d*\.?\d*)\*?x([+-]\d+\.?\d*)?/);

        if (match) {
            let a = match[1];

            if (a === "" || a === "+") a = 1;
            else if (a === "-") a = -1;
            else a = parseFloat(a);

            let b = match[2] ? parseFloat(match[2]) : 0;

            if (a === 0) return "❌ No solution";

            let x = -b / a;
            return "✅ x = " + x;
        }

        return "❌ Unsupported equation";

    } catch {
        return "❌ Error solving equation";
    }
}

// 🤖 BOT RESPONSE
function botReply(text) {
    let clean = text.toLowerCase().trim();

    // Derivative
    if (clean.includes("derivative")) {
        try {
            let expr = clean
                .replace("derivative", "")
                .replace(/[()]/g, "")
                .trim();

            let result = math.derivative(expr, "x").toString();
            return "📘 Derivative: " + result;
        } catch {
            return "❌ Invalid derivative input";
        }
    }

    // Solve equation
    if (clean.startsWith("solve")) {
        return solveEquation(text);
    }

    // Normal math
    try {
        let result = math.evaluate(text);
        return "✅ " + text + " = " + result;
    } catch {
        return "🤔 Try: 2+2, solve x+3=7, derivative(x^2)";
    }
}

// SEND MESSAGE
function send() {
    let text = input.value.trim();
    if (!text) return;

    add(text, "user");
    input.value = "";

    setTimeout(() => {
        add(botReply(text), "bot");
    }, 400);
}

// ENTER KEY
input.addEventListener("keypress", e => {
    if (e.key === "Enter") send();
});
