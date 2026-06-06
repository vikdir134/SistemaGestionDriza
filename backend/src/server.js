const app = require('./app');
const { getConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await getConnection();

    app.listen(PORT, () => {
      console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
};

iniciarServidor();