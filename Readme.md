# Least Significant Bit

<hr />  

### [Demo](https://wutility.github.io/least-significant-bit)

```bash
$ npm i least-significant-bit
# or
$ yarn add least-significant-bit
```

## Usage
```js
import { LSBSteganography } from 'least-significant-bit';
```

Or include it via jsDelivr CDN (UMD):
```html
<script src="https://cdn.jsdelivr.net/npm/least-significant-bit/build/index.min.js"></script>
<!-- Or via unpkg -->
<script src="https://unpkg.com/least-significant-bit"></script>
<!-- Access via global object : window.LSBSteganography -->
```

## Methods
```js
// hide message
LSBSteganography.encode(imageData: ImageData, message: string): ImageData

// extract image
LSBSteganography.decode(imageData: ImageData): string
```

## Author
- [Haikel Fazzani](https://github.com/haikelfazzani)

## License
MIT
