const setButton = document.getElementById("btn_window_name");
const titleInput = document.getElementById("title_input");
setButton.addEventListener("click", () => {
  window.myApi.setTitle(titleInput.value);
});
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.myApi.openFile()
  filePathElement.innerText = filePath
})