function messageDiv(typeMessage){
    if (typeMessage === 'status'){
        boxMessagesHtml.innerHTML +=`
        <div class="box-message status">
            <div class="time">${typeMessage.time}</div>
            <p><strong>${typeMessage.from}</strong> ${typeMessage.text}</p>
        </div>`
    } else if (typeMessage === 'message'){
        boxMessagesHtml.innerHTML +=`
        <div class="box-message message">
            <div class="time">${typeMessage.time}</div>
            <p><strong>${typeMessage.from}</strong> para <strong>${typeMessage.to}</strong>: ${typeMessage.text}</p>
        </div>`
    } else if (typeMessage === 'private_messsage'){
        boxMessagesHtml.innerHTML +=`
        <div class="box-message private_message">
            <div class="time">${typeMessage.time}</div>
            <p><strong>${typeMessage.from}</strong> para <strong>${typeMessage.to}</strong>: ${typeMessage.text}</p>
        </div>`
    }
    
}