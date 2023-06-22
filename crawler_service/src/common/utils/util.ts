import crypto from 'crypto';

export const generateRandomCode = (length = 12) => {
  // Tạo một buffer ngẫu nhiên có độ dài bằng với số byte cần thiết
  const buffer = crypto.randomBytes(length);

  // Chuyển buffer thành một chuỗi hexa
  const randomHex = buffer.toString('hex');

  // Trả về 12 ký tự đầu tiên của chuỗi hexa
  return randomHex.substring(0, length);
};
