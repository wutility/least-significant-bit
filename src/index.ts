import { binaryToString, decimalToBinary, stringToBinary } from "./util";

export default class Lsb {
  static encode(imageData: ImageData, message: string): ImageData {
    const binaryMessage = stringToBinary(message);
    const binaryMessageLength = binaryMessage.length;

    if (binaryMessageLength > imageData.data.length * 0.25) {
      throw new Error('Message is too long to encode in this image');
    }

    for (let i = 0; i < binaryMessageLength; i++) {
      const pixelIndex = i * 4;
      const binaryPixelValue = decimalToBinary(imageData.data[pixelIndex]);
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
      const binaryPixelValue = decimalToBinary(imageData.data[i]);
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

    return binaryToString(binaryMessage);
  }
}
