const chat = document.getElementById("chat");
const input = document.getElementById("input");

function add(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerHTML = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// ✅ ROBUST LINEAR SOLVER (NO REGEX BUGS)
function solveEquation(inputText) {
    try {
        let eq = inputText.toLowerCase().replace("solve", "").trim();

        if (!eq.includes("=")) return "❌ Invalid equation";

        let [left, right] = eq.split("=");

        // Convert to f(x)
        let expr = math.parse(`(${left}) - (${right})`);

        // Evaluate f(0) = b
        let b = expr.evaluate({ x: 0 });

        // Evaluate f(1)
        let f1 = expr.evaluate({ x: 1 });

        // slope a = f(1) - f(0)
        let a = f1 - b;

        if (a === 0) return "❌ No solution";

        let x = -b / a;

        return "✅ x = " + x;

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

// SEND
function send() {
    let text = input.value.trim();
    if (!text) return;

    add(text, "user");
    input.value = "";

    setTimeout(() => {
        add(botReply(text), "bot");
    }, 300);
}

input.addEventListener("keypress", e => {
    if (e.key === "Enter") send();
});
