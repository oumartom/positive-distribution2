# 🥚 Positive Distribution v3

## Installation (3 étapes)

### 1. Importer la base de données
```bash
mysql -u root -p < database.sql
```

### 2. Installer les dépendances
```bash
cd backend
npm install
```

### 3. Générer les mots de passe (OBLIGATOIRE avant de lancer)
```bash
node generate-passwords.js
```


### 4. Lancer le serveur
```bash
npm start
```

### 5. Accéder
http://localhost:3001

---

## Comptes utilisateurs



**Admins** : accès complet, CRUD partout, suppression, utilisateurs
**Commerciaux** : ventes, livraisons, recouvrements, stock (entrée/sortie), rapport — pas de suppression

---

## Corrections v3

- ✅ Données temps réel : impayés mis à jour dès qu'une vente est enregistrée
- ✅ Solde client recalculé automatiquement après chaque vente/recouvrement
- ✅ CRUD complet : modifier et supprimer sur toutes les tables
- ✅ Vérification stock : impossible de distribuer plus que le stock disponible
- ✅ Connexion : script generate-passwords.js pour initialiser les mots de passe
- ✅ Recouvrements : recherche par date (du/au), affiche solde client en temps réel
- ✅ Rôles réels : Oumar/Abdoulaye/Brahim/Zenab = Admin, Bechir/Moussa = Commercial
- ✅ Prix auto selon catégorie client, modifiable par vente
- ✅ PDF rapport (ouvre dans nouvel onglet → imprimer/enregistrer)
- ✅ Thème clair/sombre
- ✅ Bouton edit/delete visible selon le rôle (admin = tout, commercial = pas de suppression)
