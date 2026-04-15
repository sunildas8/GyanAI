import app, { initializeDB } from './src/app.js';
import "dotenv/config";

const PORT = process.env.PORT || 3000;



async function startServer() {
  try {
    // Initialize database connection
    await initializeDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server started on port - ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
