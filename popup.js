document.addEventListener("DOMContentLoaded", function () {
  const buttonIniciar = document.getElementById("partiuAtender");
  const buttonParar = document.getElementById("pararBusca");

  buttonIniciar.addEventListener("click", function () {
    chrome.runtime.sendMessage({ tipo: "partiuAtender" });
  });

  buttonParar.addEventListener("click", function () {
    chrome.runtime.sendMessage({ tipo: "pararBusca" });
  });
});
