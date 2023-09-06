export function decimalToBinary(decimal: number): string {
  return decimal.toString(2).padStart(8, '0');
}

export function stringToBinary(str: string): string {
  let binary = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    binary += charCode.toString(2).padStart(8, '0');
  }
  binary += '00000000';
  return binary;
}

export function binaryToString(binary: string): string {
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