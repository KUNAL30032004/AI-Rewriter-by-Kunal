const btn = document.getElementById("rewriteBtn");
const inputBox = document.getElementById("inputText");
const outputBox = document.getElementById("outputText");

btn.onclick = async () => {

  const text = inputBox.value.trim();

  if (!text) {
    outputBox.innerText = "Please enter some text first 🙂";
    return;
  }

  outputBox.innerText = "Rewriting... ✨";

  try {
    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (data.result) {
      outputBox.innerText = data.result;
    } else {
      outputBox.innerText = "Error: " + data.error;
    }

  } catch (err) {
    outputBox.innerText = "Server not responding 🚨";
  }
};
