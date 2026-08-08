const button = document.querySelector("#testButton");
const message = document.querySelector("#message");

button.addEventListener("click", () => {
  message.textContent = "Express static files are working!";
});
