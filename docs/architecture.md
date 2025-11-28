Architecture du Projet – To-Do List (NodeJS + PostgreSQL + Kubernetes)

L’architecture repose sur deux Pods : l’application NodeJS et la base PostgreSQL, communiquant via des Services Kubernetes.

Schéma d'architecture :

Utilisateur --> (NodePort Service) --> Pod NodeJS --> (ClusterIP interne) --> Pod PostgreSQL + PVC

Composants :

- App NodeJS : Deployment + Service NodePort
- PostgreSQL : Deployment + PVC + ConfigMap + Secret + Service ClusterIP
- Stockage : PersistentVolumeClaim
- Réseau : Services Kubernetes

Résumé :
2 Pods indépendants
Communication interne via ClusterIP
Accès externe via NodePort
Base persistante via PVC
