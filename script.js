const btn = document.getElementById("rewriteBtn");
const input = document.getElementById("inputText");
const output = document.getElementById("outputText");
const loading = document.getElementById("loading");
const score = document.getElementById("score");
const mode = document.getElementById("mode");


btn.onclick = async () => {
if (!input.value.trim()) return alert("Paste text first");


loading.classList.remove("hidden");
output.value = "";
score.innerText = "";


const prompt = `Rewrite the following assignment in a ${mode.value} tone so that it becomes natural, human written and plagiarism safe. Do not shorten content.\n\n${input.value}`;


const res = await fetch("http://localhost:3000/rewrite", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    text: input.value,
    mode: mode.value
  })
});

const data = await res.json();
output.value = data.output;
}