# PalaGuideBot : API

Ce projet est une API utilisé pour le site web et le bot Discord **PalaGuideBot**.

L'application gère tous les données qui transite sur l'application web et partiellement pour le bot :

- L'historique des statistiques joueurs
- Les classements par version
- Des statistiques d'administration
- Logique métier des outils POG Calculator, Clicker et Job Calculator

> Note : L'API de Paladium (l'interface qui nous permet de récupérer les informations en jeu) n'est plus disponible. Il faut prendre en compte qu'il y a plusieurs fonctionnalités obselètes.

## Pré-requis

- Avoir Node.js `>=24`
- Avoir une base de données MongoDB (ou utiliser le `docker-compose.dev.yml`)
- Avoir accès à [PalaGuideBot : Image](https://github.com/PalaGuideBot/image-ts)
- Avoir accès à l'API de Paladium (pour les fonctionnalités qui ont en besoin)
- Avoir une [application Discord](https://discord.com/developers/applications)

## Stack technique

- [AdonisJS](https://docs.adonisjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Instructions pour lancer en mode dev

1. Installer les dépendances JavaScript

```sh
npm install
```

2. Copier le fichier d'environnement

```sh
cp .env.example .env
```

3. Générer une nouvelle `APP_KEY`

```sh
node ace generate:key
```

4. Remplir le .env

```bash
# DATABASE_URL: Lien vers la base de données
# PALADIUM_API_KEY: Une clé pour s'authentifier à l'api de Paladium
# PALAGUIDEBOT_IMAGE_URL: L'url pour accèder à PalaGuideBot : Image
# PALAGUIDEBOT_IMAGE_KEY: Une clé pour accèder à PalaGuideBot : Image
# DISCORD_API_KEY: Fournit lors de la création d'une application Discord
```

Les autres valeurs sont relatives à AdonisJS, [voir doc.](https://docs.adonisjs.com/configuration)

5. Lancer l'application

```sh
npm run dev
```

Pour y accèder rendez-vous http://localhost:3333

Idéalement, si vous lancez en développement avec le [website](https://github.com/PalaGuideBot/website), choissisez un autre port dans le `.env`

## Lancer une base données MongoDB

Si vous avez Docker d'installer, vous pouvez lancer une base de données MongoDB pour le développement avec la commande suivante :

```bash
docker compose -f docker-compose.dev.yml up
```

Ou si vous avez déjà une autre base de données, vous pouvez tout à fait l'utiliser.

## Créer une clé API

Pour créer une clé rendez-vous dans le fichier `secrets/keys.json` (s'il n\'existe pas créez-le) :

```json
[
  {
    "name": "bg-ultime",
    "value": "<générez une clé sécurisé>"
  }
]
```

Le `name` est une valeur arbitraire pour identifier la clé et `valeur` est la vraie clé.

Pour générer une clé vous pouvez utiliser `openssl rand -base64 32`, veillez juste à ce qu'elle soit assez sécurisée.

Pour tester l'API, il existe un swagger en allant sur `/docs`

## Tâches de fond

Sur notre API nous avons plusieurs tâches de fond qui s'exécute régulièrement en utilisant le cron. Les tâches sont visibles dans le fichier `start/scheduler.ts`

Pour que ces tâches s'exécutent aux horaires définies il faut lancer le worker avec la commande suivante (en parallèle de l'API) :

```bash
node ace scheduler:run
```
