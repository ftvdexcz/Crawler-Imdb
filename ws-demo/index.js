// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.use(cors());

// // Khởi tạo một server HTTP trên cổng 3000
// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://localhost:5500',
//     methods: ['GET', 'POST'],
//   },
// });

// // Xử lý sự kiện kết nối của một máy khách
// io.on('connection', (socket) => {
//   console.log('A client has connected');

//   // Xử lý sự kiện nhận tin nhắn từ máy khách
//   socket.on('message', (data) => {
//     console.log(`Received message: ${data}`);

//     // Gửi tin nhắn đến tất cả các máy khách đang kết nối
//     io.emit('message', data);
//   });

//   socket.on('test', (data) => {
//     console.log(`Received message: ${data.msg}`);

//     // Gửi tin nhắn đến tất cả các máy khách đang kết nối
//     io.emit('message', data);
//   });

//   // Xử lý sự kiện đóng kết nối của một máy khách
//   socket.on('disconnect', () => {
//     console.log('A client has disconnected');
//   });
// });

// // Khởi động server và lắng nghe kết nối từ các máy khách
// server.listen(8080, () => {
//   console.log('Server is running on port 8080');
// });

const mod = function (arr) {
  const b = [4, 5, 6];
  arr = b;
};

let a = [1, 2, 3];

mod(a);

console.log(a);
