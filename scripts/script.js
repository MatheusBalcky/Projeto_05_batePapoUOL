let userName;
let messageTo = 'Todos';
let typeMessage;
const boxMessagesHtml = document.querySelector("main");

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
        const statusPromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);
        statusPromise.then(function (){
            renderMessages()
            console.log('Status ok, enviado...')
        });
    }
    function success (success) {
        if (success.status === 200){
            alert("Logado com sucesso")
            document.querySelector(".login").classList.add("hidden");
            setInterval(statusOnline, 4500);
            renderMessages();
            console.log('sucesso: ', success.status);
        }
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
function deliverMessages (response){
        for (let i = 0; i < response.data.length; i++){
            if (response.data[i].type === 'status'){
                if (i === response.data.length - 1){
                    boxMessagesHtml.innerHTML +=`
                    <div class="box-message last status">
                        <div class="time">${response.data[i].time}</div>
                        <p><strong>${response.data[i].from}</strong> ${response.data[i].text}</p>
                    </div>`
                } else {
                    boxMessagesHtml.innerHTML +=`
                    <div class="box-message status">
                        <div class="time">${response.data[i].time}</div>
                        <p><strong>${response.data[i].from}</strong> ${response.data[i].text}</p>
                    </div>`
                }
            } else if (response.data[i].type === 'message'){
                if (i === response.data.length - 1){
                    boxMessagesHtml.innerHTML +=`
                    <div class="box-message last message">
                        <div class="time">${response.data[i].time}</div>
                        <p><strong>${response.data[i].from}</strong> para <strong>${response.data[i].to}</strong>: ${response.data[i].text}</p>
                    </div>`
                } else {
                    boxMessagesHtml.innerHTML +=`
                    <div class="box-message message">
                        <div class="time">${response.data[i].time}</div>
                        <p><strong>${response.data[i].from}</strong> para <strong>${response.data[i].to}</strong>: ${response.data[i].text}</p>
                    </div>`
                }
            } else if (response.data[i].type === 'private_messsage'){
                if (i === response.data.length - 1){
                    boxMessagesHtml.innerHTML +=`
                    <div class="box-message last private_message">
                        <div class="time">${response.data[i].time}</div>
                        <p><strong>${response.data[i].from}</strong> para <strong>${response.data[i].to}</strong>: ${response.data[i].text}</p>
                    </div>`
                } else {
                    boxMessagesHtml.innerHTML +=`
                    <div class="box-message private_message">
                        <div class="time">${response.data[i].time}</div>
                        <p><strong>${response.data[i].from}</strong> para <strong>${response.data[i].to}</strong>: ${response.data[i].text}</p>
                    </div>`
                }
            }
        }
    const lastMessageScroll = document.querySelector(".last");
    lastMessageScroll.scrollIntoView();
}
function renderMessages (){
    const messagesPromise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    boxMessagesHtml.innerHTML = ``;
    messagesPromise.then(deliverMessages);
}
function sendMessage(){
    let messageUser = document.querySelector("textarea").value;
    let message = {
        from: userName.name,
        to: "Todos",
        text: messageUser,
        type: "message",
        };
    document.querySelector("textarea").value = '';
    renderMessages();
    let promiseSendMessage = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
    promiseSendMessage.then( function (response){ console.log('mensagem enviou ', response); } )
    promiseSendMessage.catch( function(erro){ console.log("esse é o erro: ", erro); } )
}
function deliverPersons(response){
    
    for(let i = 0; i < response.data.length; i++){

    }
}
function renderPersons(){
    let personsOn = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    personsOn.then(deliverPersons);
    personsOn.catch(function(response){console.log('error persons: ', response.status)});
}
renderPersons();