const express = require('express');
const authRoutes = require('./routes/authRoutes');
const database = require('./database');
const { User } = require('./models/user');

const app = express();

app.use(express.json());

// Connexion à la base de données
database
  .sync()
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données :', error);
  });

// Routes d'authentification
app.use('/auth', authRoutes);
app.use('/sms',smsRoutes);

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});