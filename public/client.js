const socket = io();
let textarea = document.querySelector('#textarea');
let messageArea= document.querySelector('.message__area');
var name;
do{
    name = prompt('please enter your name: ');
}while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' ){
        sendMessage(e.target.value);
    }
});

let sendMessage = (message) =>{
    let msg = {
        user: name,
        message: message.trim(),
    }
    //apend message
    appendMessage(msg , 'outgoing');
    textarea.value = '';
    scrollToBottom() ;

    // send to a server
    socket.emit('message',msg) // pasing an object which is msg
};
let appendMessage= (msg , type) =>{
   let mainDiv = document.createElement('div');
   let className=type;
   mainDiv.classList.add(className, 'message');

   let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
   `

   mainDiv.innerHTML = markup;
   messageArea.appendChild(mainDiv);
};

// recieve message
socket.on('message', (msg) => {
    appendMessage(msg , 'incoming');
    scrollToBottom() ;
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}