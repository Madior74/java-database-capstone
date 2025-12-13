Cette application Spring Boot combine des contrôleurs MVC et REST. Les modèles Thymeleaf sont utilisés pour les tableaux de bord Admin et Docteur, tandis que les API REST gèrent l'ensemble des autres modules. L'application interagit avec deux bases de données : MySQL pour les données des patients, des docteurs, des rendez-vous et des administrateurs, et MongoDB pour les prescriptions. Tous les contrôleurs acheminent les requêtes via une couche de service commune, qui délègue ensuite aux référentiels appropriés. MySQL utilise des entités JPA, alors que MongoDB repose sur des modèles de documents.


1. L'utilisateur accède aux pages AdminDashboard ou Appointment.
2. L'action est routée vers le contrôleur Thymeleaf ou REST approprié.
3. Le contrôleur appelle la couche service.
4. La couche service applique la logique métier et valide la requête.
5. Le service interagit avec la couche repository pour effectuer les opérations de base de données.
6. Le repository exécute les requêtes sur les bases de données MySQL ou MongoDB.
7. La réponse remonte à travers les couches : repository → service → contrôleur → vue/réponse JSON vers l'utilisateur.