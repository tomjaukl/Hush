let socket;
let nickname;

// for my future self -> shift+alf+f = formats code

   // userSide
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// serverSide
const messagesContainer = document.getElementById("messages");

function addMessage(sender, content) {
  const message = document.createElement("p");
  message.textContent = `${getCurrentTime()}  ${sender}: ${content}`;
  messagesContainer.appendChild(message);
}

function startSocket() {
  let wsUrl;
  if (window.location.hostname === 'localhost') {
    wsUrl = 'ws://localhost:3000'
  } else {
    wsUrl = `wss://${window.location.hostname}`
  }
  socket = new WebSocket(wsUrl)
  socket.onopen = () => {
    console.log(nickname + " has joned the chat.");
    socket.send(JSON.stringify({ type: "join", nickname: nickname }));
  };
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "message") {
      const sender = data.nickname;
      const content = data.content;
      addMessage(sender, content);
    }
  };
}

function getCurrentTime(){
  const d = new Date();
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const fullTime = `${hours}:${minutes}:${seconds}`;
  return fullTime;
}
console.log(getCurrentTime())

function checkNickname(nickname) {
  if (nickname.length === 0) {
    alert("Please enter a nickname.");
    return false;
  }
  return true;
}

function joinHush() {
  const loggingDiv = document.getElementById("logging");
  const chatDiv = document.getElementById("chat");
  nickname = document.getElementById("nickname").value.trim();
  if (!checkNickname(nickname)) {
    return;
  }
  loggingDiv.remove();
  chatDiv.hidden = false;
  startSocket();
}

function sendMessage() {
  const message = messageInput.value.trim();
  if (message.length === 0) {
    alert("Please enter a message.");
    return;
  }
  socket.send(
    JSON.stringify({ type: "message", nickname: nickname, content: message }),
  );
}

/*

    HUSH MESSAGE PROTOCOL

    join:
    {
    type: "join",
    nickname: "nickname"
    }

    message:
    {
    type: "message",
    nickname: "john",
    content: "message content"
    }

    system:
    {
    type: "system",
    content: "system message content"
    }

*/
