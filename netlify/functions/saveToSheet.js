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
    // Pendant le développement, simuler une sauvegarde réussie
    // En production, utiliser les vraies credentials et spreadsheet
    console.log('Données reçues:', data);
    
    // Pour le test, on peut commenter le code du Google Sheets
    /*
    // Configurer l'authentification avec le service account
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

    // Ajouter une nouvelle ligne
    await sheet.addRow({
      Date: new Date().toISOString(),
      Nom: data.nom || '',
      Email: data.email || '',
      Téléphone: data.telephone || '',
      Statut: data.statut || '',
      TJM: data.simulateurData?.tjm || '',
      JoursParSemaine: data.simulateurData?.joursParSemaine || '',
      SemainesParAn: data.simulateurData?.semainesParAn || '',
      CAEstimé: data.simulateurData?.caAnnuel || '',
      Message: data.message || '',
      UTM_Source: data.utm?.source || '',
      UTM_Medium: data.utm?.medium || '',
      UTM_Campaign: data.utm?.campaign || ''
    });
    */

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Données enregistrées avec succès',
        id: 'sim_' + new Date().getTime() // Générer un ID unique pour simuler
      })
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de l\'enregistrement des données' })
    };
  }
};
