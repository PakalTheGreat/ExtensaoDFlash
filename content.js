// content.js

let hasNotifications = false; 

function verificarNotificacao() {
  const notif1 = document.querySelector(".notif1");
  console.log("Elemento .notif1 encontrado:", notif1);

  if (notif1) {
    const notificacoes = parseInt(notif1.textContent.trim());

    if (notificacoes > 0) {
      notif1.click();
      hasNotifications = true; 
    }
  }
}

function aguardarAtualizacao() {
  setTimeout(() => {
    if (!hasNotifications) {
      alert("Sem atendimentos no momento.");
    }
  }, 10000); 
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.tipo === "iniciarAutomacao") {
    verificarNotificacao();
    aguardarAtualizacao(); 
  }
});
