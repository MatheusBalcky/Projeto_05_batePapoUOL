function sendMessage(text){
    console.log("Enviando mensagem");
}
function showPeople(){
    console.log("Mostrando pessoas e configs");
    document.querySelector(".menu").classList.toggle("hidden");
}
function messageEveryone(){
    console.log("Função mensagem para todos");
}
function messageTo(){
    console.log("Função mensagem para...");
}
function publicMessage(){
    console.log("função mensagem pública");
}
function reservedMessage(){
    console.log("função mensagem reservada");
}

function enterRoom(){
    function statusOnline(){
        let statusPromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);
        console.log('Status, enviado...')
    }
    function success (success) {
        let idInterval;
        if (success.status === 200){
            alert("Logado com sucesso")
            document.querySelector(".login").classList.add("hidden");
            setInterval(statusOnline, 4500);
        }
        console.log("Resposta de sucesso: ", success.status);
    }
    function error(err){
        alert('Nome inválido tente novamente, o nome já existe ou o campo estar vazio!');
        console.log("Reposta de error: ", err.response.status);
    }

    let userName = {name: document.querySelector(".inputName").value};
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    promise.then(success);
    promise.catch(error);
}