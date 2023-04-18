const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const text = e.target.elements[0].value;

  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      LSBSteganography.encode(imageData, text);
      ctx.putImageData(imageData, 0, 0);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(document.getElementById("file").files[0]);
});

document.getElementById('btn-extract').addEventListener('click', () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const decodedMessage = LSBSteganography.decode(imageData);
  document.querySelector('pre').textContent = decodedMessage;
});