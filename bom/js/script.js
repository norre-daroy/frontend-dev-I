const input = document.getElementById('favchap');
const button = document.querySelector('.input button');
const list = document.querySelector('.list');

button.addEventListener('click', () => {
  if (input.value) {
    const listItem = document.createElement('li');
    listItem.innerHTML = input.value;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';

    list.appendChild(listItem);
    listItem.appendChild(deleteButton);

    input.value = '';
    input.focus();

    deleteButton.addEventListener('click', () => {
      list.removeChild(listItem);
    });
  }
});
