// const axios = require("axios");

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();

recognition.continuous = true; // Keep listening continuously
recognition.interimResults = true; // Get interim results as the user speaks

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const output = document.getElementById("output");
let transcript = "";
startButton.addEventListener("click", () => {
  recognition.start();
  startButton.textContent = "Listening...";
});

stopButton.addEventListener("click", () => {
  recognition.stop();
  fetchVoice();
  startButton.textContent = "Start Recording";
});

recognition.onresult = (event) => {
  const result = event.results[event.results.length - 1];
  transcript = result[0].transcript;
  output.textContent = transcript;
};

recognition.onend = () => {
  startButton.textContent = "Start Recording";
};

recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
};

async function fetchVoice() {
  const res = await axios.post("http://127.0.0.1:8000/speak", {
    text: transcript,
    lang: "en-in",
  });
  console.log(res.data);
}
