export default class Lsb {
  static encode(imageData: ImageData, message: string): ImageData {
    const binaryMessage = this.stringToBinary(message);
    const binaryMessageLength = binaryMessage.length;

    if (binaryMessageLength > imageData.data.length * 0.25) {
      throw new Error('Message is too long to encode in this image');
    }

    for (let i = 0; i < binaryMessageLength; i++) {
      const pixelIndex = i * 4;
      const binaryPixelValue = this.decimalToBinary(imageData.data[pixelIndex]);
      const modifiedBinaryPixelValue = binaryPixelValue.slice(0, -1) + binaryMessage[i];
      const modifiedDecimalPixelValue = parseInt(modifiedBinaryPixelValue, 2);
      imageData.data[pixelIndex] = modifiedDecimalPixelValue;
    }

    return imageData;
  }

  static decode(imageData: ImageData): string {
    let binaryMessage = '';
    let nullTerminatorFound = false;

    for (let i = 0; i < imageData.data.length; i += 4) {
      const binaryPixelValue = this.decimalToBinary(imageData.data[i]);
      const binaryLSB = binaryPixelValue.slice(-1);
      binaryMessage += binaryLSB;

      if (binaryMessage.endsWith('00000000')) {
        nullTerminatorFound = true;
        break;
      }
    }

    if (!nullTerminatorFound) {
      throw new Error('No null terminator found in image data');
    }

    return this.binaryToString(binaryMessage);
  }

  private static decimalToBinary(decimal: number): string {
    return decimal.toString(2).padStart(8, '0');
  }

  private static stringToBinary(str: string): string {
    let binary = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      binary += charCode.toString(2).padStart(8, '0');
    }
    binary += '00000000';
    return binary;
  }

  private static binaryToString(binary: string): string {
    let str = '';
    for (let i = 0; i < binary.length; i += 8) {
      const binaryChar = binary.slice(i, i + 8);
      const charCode = parseInt(binaryChar, 2);
      str += String.fromCharCode(charCode);
      if (binaryChar === '00000000') {
        break;
      }
    }
    return str;
  }
}
