import app, { initializeDB } from './src/app.js';
import "dotenv/config";
import http from 'http';
import { initSocket } from './src/sockets/server.socket.js';

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

initSocket(httpServer);

async function startServer() {
  try {
    // Initialize database connection
    await initializeDB();

    // Start server
    httpServer.listen(PORT, () => {
      console.log(`✅ Server started on port - ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
