//index.js
import express from 'express';
import appRoute from './routes/index.js';
import { connect } from './DB/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1', appRoute);

const PORT = process.env.PORT || 8000;


connect()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => {
        console.log('Failed to connect to the database:', err);
        process.exit(1);
    });
