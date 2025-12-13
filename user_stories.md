# User Story Template

**Title:**
_As a [user role], I want [feature/goal], so that [reason]._

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Priority:** [High/Medium/Low]
**Story Points:** [Estimated Effort in Points]
**Notes:**
- [Additional information or edge cases]

---

# Histoires d'utilisateur administrateur

## Story 1: Connexion au portail administrateur

**Title:**
_En tant qu'administrateur, je veux me connecter au portail avec mon nom d'utilisateur et mon mot de passe, afin de gérer la plateforme en toute sécurité._

**Acceptance Criteria:**
1. L'administrateur peut accéder à la page de connexion avec un formulaire pour le nom d'utilisateur et le mot de passe
2. Le système valide les identifiants et authentifie l'administrateur si les informations sont correctes
3. Après une authentification réussie, l'administrateur est redirigé vers le tableau de bord administrateur
4. En cas d'échec de l'authentification, un message d'erreur approprié est affiché

**Priority:** High
**Story Points:** 5
**Notes:**
- Les mots de passe doivent être stockés de manière sécurisée (hashage)
- Gérer les tentatives de connexion échouées pour la sécurité

---

## Story 2: Déconnexion du portail

**Title:**
_En tant qu'administrateur, je veux me déconnecter du portail, afin de protéger l'accès au système._

**Acceptance Criteria:**
1. L'administrateur peut accéder à une option de déconnexion depuis le tableau de bord
2. Lors de la déconnexion, la session de l'administrateur est invalidée
3. Après la déconnexion, l'administrateur est redirigé vers la page de connexion
4. Une fois déconnecté, l'administrateur ne peut plus accéder aux pages protégées sans se reconnecter

**Priority:** High
**Story Points:** 3
**Notes:**
- S'assurer que tous les tokens de session sont supprimés
- La déconnexion doit être disponible depuis toutes les pages du tableau de bord

---

## Story 3: Ajouter un médecin au portail

**Title:**
_En tant qu'administrateur, je veux ajouter des médecins au portail, afin de permettre aux médecins d'utiliser la plateforme._

**Acceptance Criteria:**
1. L'administrateur peut accéder à un formulaire pour ajouter un nouveau médecin
2. Le formulaire doit collecter les informations nécessaires (nom, prénom, spécialité, email, etc.)
3. Le système valide les informations saisies avant de créer le profil
4. Après la création réussie, le profil du médecin est enregistré dans la base de données
5. Un message de confirmation indique que le médecin a été ajouté avec succès

**Priority:** High
**Story Points:** 8
**Notes:**
- Vérifier que l'email n'est pas déjà utilisé
- Générer des identifiants de connexion pour le médecin (nom d'utilisateur/mot de passe ou lien d'activation)

---

## Story 4: Supprimer un médecin du portail

**Title:**
_En tant qu'administrateur, je veux supprimer le profil d'un médecin du portail, afin de retirer l'accès aux médecins qui ne sont plus actifs._

**Acceptance Criteria:**
1. L'administrateur peut voir la liste des médecins inscrits sur le portail
2. L'administrateur peut sélectionner un médecin et accéder à une option de suppression
3. Le système demande une confirmation avant de procéder à la suppression
4. Après confirmation, le profil du médecin est supprimé de la base de données
5. Un message de confirmation indique que le médecin a été supprimé avec succès

**Priority:** Medium
**Story Points:** 5
**Notes:**
- Considérer les rendez-vous existants liés au médecin (suppression en cascade ou archivage)
- La suppression doit être irréversible ou nécessiter une restauration depuis une sauvegarde

---

## Story 5: Obtenir les statistiques de rendez-vous par mois

**Title:**
_En tant qu'administrateur, je veux exécuter une procédure stockée dans MySQL CLI pour obtenir le nombre de rendez-vous par mois, afin de suivre les statistiques d'utilisation de la plateforme._

**Acceptance Criteria:**
1. Une procédure stockée MySQL est créée pour calculer le nombre de rendez-vous par mois
2. L'administrateur peut exécuter cette procédure via MySQL CLI
3. La procédure retourne les résultats avec le mois/année et le nombre de rendez-vous correspondant
4. Les résultats sont présentés de manière lisible et organisée
5. La procédure peut filtrer par année spécifique si nécessaire

**Priority:** Medium
**Story Points:** 8
**Notes:**
- La procédure stockée doit être documentée dans le code ou la documentation technique
- Considérer l'ajout d'une interface graphique dans le futur pour faciliter l'accès aux statistiques

---

# Histoires d'utilisateur patient

## Story 1: Voir la liste des médecins sans connexion

**Title:**
_En tant que patient, je veux voir une liste de médecins sans me connecter, afin d'explorer les options avant de m'inscrire._

**Acceptance Criteria:**
1. Un visiteur non connecté peut accéder à une page publique affichant la liste des médecins disponibles
2. La liste affiche les informations de base de chaque médecin (nom, spécialité, etc.)
3. Les informations sont présentées de manière claire et organisée
4. Aucune authentification n'est requise pour consulter cette liste
5. La liste est à jour et reflète les médecins actuellement disponibles sur la plateforme

**Priority:** High
**Story Points:** 5
**Notes:**
- Cette fonctionnalité peut servir de point d'entrée marketing pour attirer de nouveaux patients
- Considérer l'ajout de filtres par spécialité ou disponibilité dans une version future

---

## Story 2: Inscription au portail

**Title:**
_En tant que patient, je veux m'inscrire en utilisant mon email et mon mot de passe, afin de pouvoir réserver des rendez-vous._

**Acceptance Criteria:**
1. Le patient peut accéder à un formulaire d'inscription
2. Le formulaire collecte les informations nécessaires (nom, prénom, email, mot de passe, etc.)
3. Le système valide que l'email n'est pas déjà utilisé
4. Le système valide le format de l'email et la force du mot de passe
5. Après validation réussie, un compte patient est créé dans la base de données
6. Un message de confirmation indique que l'inscription a réussi

**Priority:** High
**Story Points:** 8
**Notes:**
- Le mot de passe doit respecter des critères de sécurité minimum
- Considérer l'envoi d'un email de confirmation après l'inscription
- Les mots de passe doivent être hashés avant stockage

---

## Story 3: Connexion au portail patient

**Title:**
_En tant que patient, je veux me connecter au portail, afin de gérer mes réservations._

**Acceptance Criteria:**
1. Le patient peut accéder à une page de connexion avec un formulaire pour l'email et le mot de passe
2. Le système valide les identifiants et authentifie le patient si les informations sont correctes
3. Après une authentification réussie, le patient est redirigé vers son tableau de bord personnel
4. En cas d'échec de l'authentification, un message d'erreur approprié est affiché
5. Le patient peut accéder à toutes ses fonctionnalités une fois connecté

**Priority:** High
**Story Points:** 5
**Notes:**
- Les sessions doivent être sécurisées avec des tokens appropriés
- Gérer les tentatives de connexion échouées pour la sécurité
- Option de "Se souvenir de moi" peut être ajoutée dans le futur

---

## Story 4: Déconnexion du portail patient

**Title:**
_En tant que patient, je veux me déconnecter du portail, afin de sécuriser mon compte._

**Acceptance Criteria:**
1. Le patient connecté peut accéder à une option de déconnexion depuis son tableau de bord
2. Lors de la déconnexion, la session du patient est invalidée
3. Après la déconnexion, le patient est redirigé vers la page d'accueil ou de connexion
4. Une fois déconnecté, le patient ne peut plus accéder à ses pages protégées sans se reconnecter
5. Toutes les données sensibles de la session sont supprimées

**Priority:** High
**Story Points:** 3
**Notes:**
- S'assurer que tous les tokens de session sont supprimés
- La déconnexion doit être disponible depuis toutes les pages du tableau de bord patient

---

## Story 5: Réserver un rendez-vous

**Title:**
_En tant que patient connecté, je veux réserver un rendez-vous d'une heure pour consulter un médecin, afin de planifier ma consultation médicale._

**Acceptance Criteria:**
1. Le patient connecté peut accéder à une fonctionnalité de réservation de rendez-vous
2. Le patient peut sélectionner un médecin parmi la liste des médecins disponibles
3. Le patient peut choisir une date et une heure disponibles (durée standard d'une heure)
4. Le système vérifie la disponibilité du créneau sélectionné
5. Après confirmation, le rendez-vous est créé et enregistré dans la base de données
6. Le patient reçoit une confirmation de sa réservation avec les détails (médecin, date, heure)

**Priority:** High
**Story Points:** 13
**Notes:**
- Vérifier que le créneau horaire n'est pas déjà réservé
- Considérer l'envoi d'un email ou SMS de confirmation
- Gérer les conflits si plusieurs patients essaient de réserver le même créneau simultanément
- La durée du rendez-vous est fixée à une heure

---

# Histoires d'utilisateur médecin

## Story 1: Connexion au portail médecin

**Title:**
_En tant que médecin, je veux me connecter au portail, afin de gérer mes rendez-vous._

**Acceptance Criteria:**
1. Le médecin peut accéder à une page de connexion avec un formulaire pour le nom d'utilisateur/email et le mot de passe
2. Le système valide les identifiants et authentifie le médecin si les informations sont correctes
3. Après une authentification réussie, le médecin est redirigé vers son tableau de bord personnel
4. En cas d'échec de l'authentification, un message d'erreur approprié est affiché
5. Le médecin peut accéder à toutes ses fonctionnalités une fois connecté (calendrier, patients, profil, etc.)

**Priority:** High
**Story Points:** 5
**Notes:**
- Les identifiants du médecin sont fournis par l'administrateur lors de la création du profil
- Les sessions doivent être sécurisées avec des tokens appropriés
- Gérer les tentatives de connexion échouées pour la sécurité

---

## Story 2: Déconnexion du portail médecin

**Title:**
_En tant que médecin, je veux me déconnecter du portail, afin de protéger mes données._

**Acceptance Criteria:**
1. Le médecin connecté peut accéder à une option de déconnexion depuis son tableau de bord
2. Lors de la déconnexion, la session du médecin est invalidée
3. Après la déconnexion, le médecin est redirigé vers la page de connexion ou d'accueil
4. Une fois déconnecté, le médecin ne peut plus accéder à ses pages protégées sans se reconnecter
5. Toutes les données sensibles de la session sont supprimées

**Priority:** High
**Story Points:** 3
**Notes:**
- S'assurer que tous les tokens de session sont supprimés
- La déconnexion doit être disponible depuis toutes les pages du tableau de bord médecin
- Protéger les données médicales sensibles des patients

---

## Story 3: Consulter le calendrier de rendez-vous

**Title:**
_En tant que médecin, je veux consulter mon calendrier de rendez-vous, afin de rester organisé._

**Acceptance Criteria:**
1. Le médecin connecté peut accéder à une vue calendrier de ses rendez-vous
2. Le calendrier affiche tous les rendez-vous du médecin pour une période donnée (jour, semaine, mois)
3. Pour chaque rendez-vous, les informations suivantes sont affichées : patient, heure, durée (1 heure), date
4. Le calendrier peut être navigué par date (précédent/suivant, sélection de date)
5. Les rendez-vous sont clairement visibles et différenciés visuellement
6. Le médecin peut voir les créneaux libres et occupés

**Priority:** High
**Story Points:** 10
**Notes:**
- Considérer différentes vues : vue jour, vue semaine, vue mois
- Possibilité de filtrer par statut (confirmé, en attente, annulé)
- Intégrer des couleurs ou des indicateurs visuels pour différents types de rendez-vous
- Considérer l'exportation du calendrier vers des formats standards (iCal, Google Calendar)

---

## Story 4: Indiquer son indisponibilité

**Title:**
_En tant que médecin, je veux indiquer mon indisponibilité, afin d'informer les patients uniquement des créneaux disponibles._

**Acceptance Criteria:**
1. Le médecin connecté peut accéder à une fonctionnalité pour gérer sa disponibilité
2. Le médecin peut définir des périodes d'indisponibilité (dates, heures)
3. Les créneaux marqués comme indisponibles ne sont pas proposés aux patients pour réservation
4. Le médecin peut voir un aperçu de sa disponibilité (créneaux disponibles vs indisponibles)
5. Le médecin peut modifier ou supprimer les périodes d'indisponibilité déjà définies
6. Les changements de disponibilité sont immédiatement reflétés dans le système de réservation

**Priority:** High
**Story Points:** 13
**Notes:**
- Considérer les cas où le médecin définit des horaires de travail récurrents (ex: tous les lundis de 9h à 17h)
- Gérer les cas où un rendez-vous existe déjà sur un créneau que le médecin souhaite rendre indisponible
- Permettre de définir des indisponibilités ponctuelles ou récurrentes
- Notifier les patients si un rendez-vous doit être déplacé en raison d'une indisponibilité

---

## Story 5: Mettre à jour son profil

**Title:**
_En tant que médecin, je veux mettre à jour mon profil avec ma spécialisation et mes coordonnées, afin que les patients disposent d'informations à jour._

**Acceptance Criteria:**
1. Le médecin connecté peut accéder à une page de gestion de profil
2. Le médecin peut modifier ses informations personnelles (nom, prénom, email, téléphone)
3. Le médecin peut mettre à jour sa spécialisation
4. Le médecin peut modifier d'autres informations professionnelles (adresse du cabinet, heures de consultation, etc.)
5. Le système valide les modifications avant de les enregistrer
6. Après sauvegarde, les modifications sont immédiatement visibles pour les patients sur le portail
7. Un message de confirmation indique que le profil a été mis à jour avec succès

**Priority:** Medium
**Story Points:** 8
**Notes:**
- Certaines informations peuvent nécessiter validation par l'administrateur (ex: spécialisation)
- Vérifier que l'email n'est pas déjà utilisé par un autre compte
- Considérer l'ajout de photos de profil ou autres informations professionnelles
- Historiser les changements pour traçabilité

---

## Story 6: Consulter les détails des patients

**Title:**
_En tant que médecin, je veux consulter les détails des patients pour les rendez-vous à venir, afin de pouvoir être préparé._

**Acceptance Criteria:**
1. Le médecin connecté peut accéder aux informations des patients depuis son calendrier de rendez-vous
2. Pour chaque rendez-vous à venir, le médecin peut consulter les détails du patient
3. Les informations affichées incluent : nom, prénom, email, téléphone, historique des rendez-vous précédents (si applicable)
4. Le médecin peut voir le motif de consultation ou les notes associées au rendez-vous
5. Les informations sont présentées de manière claire et organisée
6. L'accès aux informations des patients est sécurisé et respecte la confidentialité médicale

**Priority:** High
**Story Points:** 8
**Notes:**
- Respecter les réglementations sur la protection des données médicales (RGPD, HIPAA selon la juridiction)
- Limiter l'accès aux informations uniquement aux patients ayant des rendez-vous avec le médecin
- Considérer l'ajout de fonctionnalités pour prendre des notes pendant ou après le rendez-vous
- Permettre au médecin de consulter l'historique médical du patient (prescriptions précédentes, etc.)