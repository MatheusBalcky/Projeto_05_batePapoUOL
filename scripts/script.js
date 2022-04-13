let userName;
let messageTo = 'Todos';
let typeMessage;

function showPeople(){
    console.log("Mostrando pessoas e configs");
    document.querySelector(".menu").classList.toggle("hidden");
}
function messageEveryone(){
    typeMessage = 'Todos'
    console.log("Função mensagem para todos");
}
function messageToSomeone(){
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
        statusPromise.then(function (){
            console.log('Status ok, enviado...')
        });
        renderMessages();
    }
    function success (success) {
        if (success.status === 200){
            alert("Logado com sucesso")
            document.querySelector(".login").classList.add("hidden");
            setInterval(statusOnline, 4500);
            renderMessages();
        }
        console.log("Resposta de sucesso: ", success.status);
    }
    function error(err){
        alert('Nome inválido tente novamente. O nome já existe ou o campo está vazio!');
        console.log("Reposta de error: ", err.response.status);
    }
    userName = {name: document.querySelector(".inputName").value};
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    promise.then(success);
    promise.catch(error);
}
function renderMessages (){
    let messagesPromise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    let boxMessagesHtml = document.querySelector("main");
    boxMessagesHtml.innerHTML = ``;
    messagesPromise.then(function (response){
        for (let i = 0; i < response.data.length; i++){
            if (response.data[i].type === 'status'){
                boxMessagesHtml.innerHTML +=`
                <div class="box-message status">
                    <div class="time">${response.data[i].time}</div>
                    <div><strong>${response.data[i].from}</strong> ${response.data[i].text}</div>
                </div>`
            } else if (response.data[i].type === 'message'){
                boxMessagesHtml.innerHTML +=`
                <div class="box-message ${response.data[i].type}">
                    <div class="time">${response.data[i].time}</div>
                    <div><strong>${response.data[i].from}</strong> para <strong>${response.data[i].to}</strong>: ${response.data[i].text}</div>
                </div>`
            } else if (response.data[i].type === 'private_messsage'){
                boxMessagesHtml.innerHTML +=`
                <div class="box-message private_message">
                    <div class="time">${response.data[i].time}</div>
                    <div><strong>${response.data[i].from}</strong> para <strong>${response.data[i].to}</strong>: ${response.data[i].text}</div>
                </div>`
            }
        }
        console.log(response.data);
    })
}

function sendMessage(){
    let messageUser = document.querySelector("textarea").value;
    let message = {
            from: "tESdvsdvsdvTE",
            to: "Todos",
            text: "ALOUUUUUUUUUUU DRIVEN",
            type: "message"
            }
    let promiseSendMessage = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
    promiseSendMessage.then(function (response){
        renderMessages();
        console.log('mensagem enviou')
    })
    promiseSendMessage.catch(function(erro){console.log("esse é o erro: ", erro)})
}