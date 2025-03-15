const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.handler = async function(event, context) {
  // Vérifier la méthode
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  // Analyser les données envoyées
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Données invalides' }) };
  }

  try {
    // Pour le développement local, simuler une réponse réussie
    if (process.env.NODE_ENV === 'development') {
      console.log('Données reçues (mode dev):', data);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Données sauvegardées localement' })
      };
    }

    // En production, se connecter à Google Sheets
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialiser le document
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    // Sélectionner la première feuille
    const sheet = doc.sheetsByIndex[0];

    // Ajouter une nouvelle ligne avec uniquement les champs demandés
    await sheet.addRow({
      Date: new Date().toISOString(),
      Nom: data.nom || '',
      Email: data.email || '',
      Téléphone: data.telephone || '',
      Statut: data.statut || '',
      Message: data.message || ''
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Données enregistrées avec succès' })
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de l\'enregistrement des données' })
    };
  }
};
