window.onload = function() {
  const div = document.querySelector('div');

  setInterval(() => {
    div.innerHTML += 'i'
  }, 1000);
}