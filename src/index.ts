import express from 'express';
import { sequelize } from './database';

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use('/', (req, res) => { res.status(200).json({ message: "OK"}) });

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
