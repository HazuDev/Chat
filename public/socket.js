const socket = io()

const messages = document.getElementById("messages")
const form = document.getElementById("form")
const input = document.getElementById("input")

const user = prompt("Username : ")

const createMessage = (msg) => {
    let container = document.createElement("div")
    messages.appendChild(container)

    let username =  document.createElement("li")
    username.textContent = user
    username.style.color = "#36a1ff"

    container.appendChild(username)

    let item = document.createElement("li")
    item.textContent = msg
    item.style.color = "#f1f1f1"

    container.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if(input.value) {
        socket.emit("chat-msg", input.value)
        input.value = ""
    }
})

socket.on("chat-msg", (msg) => {
    if((msg.length + 1) < 37) {
        console.log(msg.length)
        console.log("> Message : " + msg)
        createMessage(msg)
    }
})