let image;
let file = null;
let imageInfos = {};

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = e.target.elements[0].value;
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();

    img.onload = function () {
      canvas.width = imageInfos.width;
      canvas.height = imageInfos.height;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, imageInfos.width, imageInfos.height);
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

  if (!file) return;

  reader.onload = function (event) {
    image = new Image();

    image.onload = function () {
      imageInfos = { width: image.width, height: image.height, type: file.type, extension: file.type.split('/')[1] };
      document.getElementById('image').appendChild(image);
    }

    image.src = event.target.result;
    document.querySelector('main').classList.remove('d-none');
  }

  reader.readAsDataURL(file);
});

document.getElementById('btn-extract').addEventListener('click', () => {
  if (!file) return;

  const imageData = ctx.getImageData(0, 0, imageInfos.width, imageInfos.height);
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
  link.download = `${filename}.${imageInfos.extension}`;
  link.href = canvas.toDataURL(imageInfos.type).replace(imageInfos.type, "image/octet-stream");;
  link.click();
  link.remove();
});