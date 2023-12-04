// background.js

let verificaNotificacao = true;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.tipo === "partiuAtender" && verificaNotificacao) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: iniciarAutomacao,
      });
    });
    verificaNotificacao = false; 
  } else if (message.tipo === "pararBusca") {
    verificaNotificacao = false;
  }
});

function iniciarAutomacao() {
  function enviarMensagem(saudacao) {
    const divMensagem = document.querySelector("#input_envio_msg");
    console.log("Div #input_envio_msg encontrada:", divMensagem);

    if (divMensagem) {
      const mensagem = `${saudacao} Como posso te auxiliar hoje?`;

      divMensagem.innerText = mensagem;

      const iconeEnvio = document.querySelector(".fas.fa-paper-plane");
      console.log("Ícone de envio encontrado:", iconeEnvio);

      if (iconeEnvio) {
        iconeEnvio.click();
        const escolha = confirm("Partiu atender!");

        if (!escolha) {
          console.log("Busca encerrada.");
        }
      } else {
        console.log("Ícone de envio não encontrado.");
      }
    } else {
      console.log("Div #input_envio_msg não encontrada.");
    }
  }

  function clicarNoIconeHome() {
    const iconeHome = document.querySelector(".fa-home.fal");
    console.log("Ícone de home encontrado:", iconeHome);

    if (iconeHome) {
      iconeHome.click();
    }
  }

  function aguardarNotificacao() {
    const notif1 = document.querySelector(".notif1");
    console.log("Elemento .notif1 encontrado:", notif1);

    if (notif1 && notif1.textContent.trim() !== "0") {
      clicarNoIconeHome(); 
      setTimeout(() => {
        const buttons = document.querySelectorAll("button");
        for (const button of buttons) {
          if (button.textContent.includes("Atender próximo da fila")) {
            console.log("Botão 'Atender próximo da fila' encontrado:", button);
            button.click();
            setTimeout(() => {
              const agora = new Date();
              const hora = agora.getHours();
              let saudacao = "Bom dia {{nome_usuario}}, tudo bem? ";

              if (hora >= 12 && hora < 18) {
                saudacao = "Boa tarde {{nome_usuario}}, tudo bem? ";
              } else if (hora >= 18) {
                saudacao = "Boa noite {{nome_usuario}}, tudo bem? ";
              }

              enviarMensagem(saudacao);
            }, 2000); 
            break;
          }
        }
      }, 1000);
    } else {
      console.log("Elemento .notif1 não encontrado ou valor não é '0'.");
    }
   
    if (verificaNotificacao) {
      setTimeout(aguardarNotificacao, 10000); 
    }
  }

  aguardarNotificacao();
}
