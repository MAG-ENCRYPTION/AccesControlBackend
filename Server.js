const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'access'
});

// Connexion à la base de données
connection.connect((error) => {
  if (error) {
    console.error('Erreur de connexion à la base de données', error);
  } else {
    console.log('Connecté à la base de données');
  }
});

// Route GET pour récupérer tous les utilisateurs

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM user';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    } else {
      res.json(results);
    }
  });
});

// Route GET pour récupérer un utilisateur par son nom
app.get('/users/nom/:nom', (req, res) => {
  const nom = req.params.nom;
  const query = 'SELECT * FROM user WHERE Nom = ?';
  const values = [nom];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    } else {
      res.json(results);
    }
  });
});

// Route GET pour récupérer un utilisateur par son FingerID
app.get('/users/fingerid/:fingerId', (req, res) => {
  const fingerId = req.params.fingerId;
  const query = 'SELECT * FROM user WHERE FingerID = ?';
  const values = [fingerId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    } else {
      res.json(results);
    }
  });
});

// Route GET pour récupérer les utilisateurs par date
app.get('/users/date/:date', (req, res) => {
  const date = req.params.date;
  const query = 'SELECT * FROM user WHERE Date = ?';
  const values = [date];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    } else {
      res.json(results);
    }
  });
});

// Route POST pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
  const { nom, fingerId, date } = req.body;
  const query = 'INSERT INTO user (Nom, FingerID, Date) VALUES (?, ?, ?)';
  const values = [nom, fingerId, date];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    } else {
      res.json({ id: results.insertId, nom, fingerId, date });
    }
  });
});

// Démarrage du serveur
app.listen(8080, () => {
  console.log('Serveur démarré sur le port 8080');
});