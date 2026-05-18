# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Autoriser l'exécution des scripts PowerShell pour npm
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# ==== BACKEND ====
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
