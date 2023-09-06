let image;
let imageType = "image/png";
let imageExtension = "png";
let file = null;

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = e.target.elements[0].value;
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();

    img.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      Lsb.encode(imageData, text);
      ctx.putImageData(imageData, 0, 0);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(inputFile.files[0]);
});

inputFile.addEventListener('change', e => {
  const reader = new FileReader();
  const files = e.target.files;
  file = files.length > 0 ? files[0] : null;

  if(!file) return;

  imageType = file.type;
  imageExtension = imageType.split('/')[1];

  reader.onload = function (event) {
    image = new Image();

    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      ctx.putImageData(imageData, 0, 0);
    }
    image.src = event.target.result;
  }
  
  reader.readAsDataURL(file);
});

document.getElementById('btn-extract').addEventListener('click', () => {
  if (!file) return;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const decodedMessage = Lsb.decode(imageData);
  document.querySelector('pre').textContent = decodedMessage;
});

document.getElementById('btn-open-input-file').addEventListener('click', () => {
  inputFile.click();
});

document.getElementById('form-download').addEventListener('submit', e => {
  e.preventDefault();
  if (!file) return;
  const filename = e.target.elements[0].value;
  const link = document.createElement('a');
  link.download = `${filename}.${imageExtension}`;
  link.href = canvas.toDataURL(imageType).replace(imageType, "image/octet-stream");;
  link.click();
  link.remove();
});