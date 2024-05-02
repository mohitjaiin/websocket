

// const WebSocket = require('ws');
// const readline = require('readline');

// const PORT = 8080; // Define the port

// const wss = new WebSocket.Server({ port: PORT });

// const clients = [];

// let clientIdCounter = 1;

// wss.on('listening', () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

// wss.on('connection', (ws) => {
//   const newClient = {
//     id: clientIdCounter++,
//     name: '',
//     age: 0,
//     ws: ws,
//   };
//   clients.push(newClient);

//   console.log(`Client ${newClient.id} connected`);


// ws.on('message', (message) => {
//   try {
//     const data = JSON.parse(message);
//     if (data.type === 'info'&& !newClient.name && !newClient.age) {
//       newClient.name = data.name;
//       newClient.age = data.age;
//       console.log(`Received initial info from Client ${newClient.id}: Name - ${data.name}, Age - ${data.age}`);
//       // Handle the initial info here, if needed
//     } else if (data.type === 'chat') {
//       console.log(`Received message from ${data.name} (Client ${newClient.id}): ${data.message}`);
//       // Broadcast the message to all clients
//       clients.forEach(client => {
//         client.ws.send(`${data.name} (Age: ${data.age}): ${data.message}`); // Use name and age from client
//       });
//     }
//   } catch (error) {
//     console.error('Invalid message format');
//   }
// });

//   ws.on('close', () => {
//     console.log(`Client ${newClient.name || `${newClient.id}`} disconnected`);
//     // Remove the client from the list
//     const index = clients.indexOf(newClient);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//   });
// });

// // Create interface for reading input from terminal
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // Listen for input from terminal
// rl.on('line', (input) => {
//   // Broadcast the input message to all clients
//   clients.forEach(client => {
//     client.ws.send(`Server: ${input}`);
//   });
// });


const WebSocket = require('ws');
const readline = require('readline');

const PORT = 8080; // Define the port

const wss = new WebSocket.Server({ port: PORT });

const clients = [];

let clientIdCounter = 1;

wss.on('listening', () => {
  console.log(`Server is listening on port ${PORT}`);
});

wss.on('connection', (ws) => {
  const newClient = {
    id: clientIdCounter++,
    name: '',
    age: 0,
    ws: ws,
  };
  clients.push(newClient);

  console.log(`Client ${newClient.id} connected`);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'info' && !newClient.name && !newClient.age) { // Only handle initial info message if name and age are not set yet
        newClient.name = data.name;
        newClient.age = data.age;
        console.log(`Received initial info from Client ${newClient.id}: Name - ${data.name}, Age - ${data.age}`);
      } else if (data.type === 'chat') {
        console.log(`Received message from ${newClient.name} (Client ${newClient.id}): ${data.message}`);
        // Broadcast the message to all clients
        clients.forEach(client => {
          client.ws.send(`${newClient.name} (Age: ${newClient.age}): ${data.message}`);
        });
      }
    } catch (error) {
      console.error('Invalid message format');
    }
  });

  ws.on('close', () => {
    console.log(`Client ${newClient.id} disconnected`);
    // Remove the client from the list
    const index = clients.indexOf(newClient);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

// Create interface for reading input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Listen for input from terminal
rl.on('line', (input) => {
  // Broadcast the input message to all clients
  clients.forEach(client => {
    client.ws.send(`Server: ${input}`);
  });
});
