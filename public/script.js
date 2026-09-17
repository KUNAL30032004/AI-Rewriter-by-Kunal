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
const demoInputText = `Artificial intelligence is a branch of computer science that focuses on creating machines capable of performing tasks that typically require human intelligence.`;

const demoOutputText = `Artificial intelligence is an area of computing where machines are designed to carry out tasks that normally need human thinking and understanding.`;

const demoIn = document.getElementById("demoInput");
const demoOut = document.getElementById("demoOutput");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("introOverlay");

function typeText(element, text, speed=20){
  return new Promise(resolve=>{
    element.innerHTML="";
    let i=0;
    const interval=setInterval(()=>{
      element.innerHTML+=text[i];
      i++;
      if(i>=text.length){clearInterval(interval);resolve();}
    },speed);
  });
}

async function runDemoLoop(){
  while(true){
    await typeText(demoIn,demoInputText,18);
    await new Promise(r=>setTimeout(r,600));
    await typeText(demoOut,demoOutputText,18);
    await new Promise(r=>setTimeout(r,2000));
    demoIn.innerHTML="";
    demoOut.innerHTML="";
  }
}

runDemoLoop();

startBtn.onclick=()=>{
  overlay.style.display="none";
};
