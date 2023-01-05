# API Todo List

## Téléchargement des fichiers et installation des dépendances

```console
git clone git@github.com:drazik/web-project.git
cd web-project/api
npm install
```

## Lancement du serveur

```console
npm start
```

Le serveur est lancé sur `http://localhost:3000`.

## Endpoints

Les données attachées aux requêtes doivent être formattées en JSON. Pensez à préciser le header `Content-Type: application/json`.

Les données attachées aux réponses sont formattées en JSON.

### User

#### `POST /user`

A utiliser pour créer un nouvel utilisateur (inscription)

Données attendues:

- `email`: string
- `password`: string

Réponses possibles:

- `201`: utilisateur créé
- `400`: mauvaises données dans la requête

### Security

#### `POST /login`

A utiliser pour connecter un utilisateur

Données attendues:

- `email`: string
- `password`: string

Réponses poossibles:

- `200`: OK, utilisateur connecté. La réponse convient un cookie de connexion
- `400`: mauvaises données dans la requête

#### `POST /logout`

A utiliser pour déconnecter un utilisateur

Aucune donnée attendue.

Réponses possibles:

- `200`: OK, utilisateur déconnecté

#### `GET /check_login`

A utiliser pour vérifier si l'utilisateur est déjà connecté ou non.

Réponses possibles:

- `200`: OK, un utilisateur est bien connecté
- `401`: l'utilisateur n'est pas connecté

### List

#### `GET /list`

Retourne toutes les listes de l'utilisateur

Réponses possibles:

- `200`: OK. La réponse contient les listes de tâches de l'utilisateur
- `401`: aucun utilisateur connecté

#### `GET /list/:listId`

Retourne les données de la liste ayant l'ID `:listId`.

Réponses possibles:

- `200`: OK. La réponse contient la liste demandée
- `401`: l'utilisateur n'est pas connecté ou la liste demandée ne lui appartient pas

#### `POST /list`

Crée une nouvelle liste.

Données attendues:

- `name`: string

Réponses possibles:

- `201`: OK, liste créée. La réponse contient la liste créée
- `400`: mauvaises données dans la requête
- `401`: l'utilisateur n'est pas connecté

#### `PUT /list/:listId`

Modifie la liste ayant l'ID `:listId`.

Données attendues:

- `name`: string

Réponses possibles:

- `200`: OK, liste modifiée. La réponse contient la liste modifiée
- `400`: mauvaises données dans la requête
- `401`: l'utilisateur n'est pas connecté ou la liste ne lui appartient pas

#### `DELETE /list/:listId`

Supprime la liste ayant l'ID `:listId`.

Réponses possibles:

- `200`: OK, liste supprimée
- `401`: l'utilisateur n'est pas connecté ou la liste ne lui appartient pas

#### `POST /list/:listId/task`

Crée une nouvelle tâche dans la liste ayant l'ID `:listId`.

Données attendues:

- `name`: string
- `description`: string (optionnel)
- `dueDate`: string (optionnel). Date au format `YYYY-MM-DD`

Réponses possibles:

- `201`: OK, tâche créée. La réponse contient la tâché créée
- `400`: mauvaises données dans la requête
- `401`: l'utilisateur n'est pas connecté ou la liste ne lui appartient pas

### Task

#### `PUT /task/:taskId`

Modifie la tâche ayant l'ID `:taskId`.

Données attendues:

- `name`: string (optionnel)
- `description`: string (optionnel)
- `dueDate`: string (optionnel). Date au format `YYYY-MM-DD`
- `done`: boolean (optionnel)

Réponses possibles:

- `200`: OK, tâche modifiée. La réponse contient la tâché modifiée
- `400`: mauvaises données dans la requête
- `401`: l'utilisateur n'est pas connecté ou la tâche ne lui appartient pas

####  `DELETE /task/:taskId`

Supprime la tâche ayant l'ID `:taskId`.

Réponses possibles:

- `200`: OK, tâche supprimée
- `401`: l'utilisateur n'est pas connecté ou la tâche ne lui appartient pas
