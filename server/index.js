const app = require('./src/app');
const PORT = process.env.PORT || 3001;

process.on('SIGINT', async () => {
  try {
    await app.stopDb();
    process.exit(0);
  } catch (err) {
    console.error('Error shutting down app:', err);
    process.exit(1);
  }
});

async function main() {
  try {
    await app.startDb();

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting app:', err);
    process.exit(1);
  }
}

main();
