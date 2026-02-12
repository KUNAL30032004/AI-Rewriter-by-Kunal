const userInput = document.getElementById("inputText").value; // adjust ID to your input field
const outputElement = document.getElementById("outputText"); // adjust ID to your output container

fetch("/api/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: userInput })
})
.then(res => res.json())
.then(data => {
    if (data.rewritten) {
        outputElement.textContent = data.rewritten;
    } else if (data.error) {
        outputElement.textContent = "Error: " + data.error;
    }
})
.catch(err => {
    console.error(err);
    outputElement.textContent = "Fetch failed. Check console.";
});
