# Autoriser l'exécution des scripts PowerShell pour npm
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# ==== BACKEND ====
cd Backend
npm install                        # installation des dépendances (Express, Mongoose, ...)
npm install express-validator      # pour valider email & mot de passe
# création du .env (MONGO_URI, JWT_SECRET, PORT)
env-cmd .env                       # charge les variables d'environnement
npx nodemon src/server.js          # lance le serveur en mode développement (reload auto)

# ==== FRONTEND ====
cd Frontend
npm install                        # ou yarn install, pour React, Vite, Tailwind...
npm install axios react-router-dom # installe Axios et React Router
npm install -D tailwindcss postcss autoprefixer # installe Tailwind CSS et ses dépendances
npx tailwindcss init -p # génère tailwind.config.js et postcss.config.js
npm run dev                        # lance Vite en mode développement (http://localhost:5173)
