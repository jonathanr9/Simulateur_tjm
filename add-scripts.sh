#!/bin/bash

# Ouvrir package.json et ajouter les scripts
node -e "
  const fs = require('fs');
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  // Ajouter ou mettre à jour les scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    'dev': 'next dev',
    'build': 'next build && next export',
    'start': 'next start',
    'lint': 'next lint'
  };
  
  // Écrire le fichier mis à jour
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  
  console.log('Scripts ajoutés avec succès à package.json');
"
