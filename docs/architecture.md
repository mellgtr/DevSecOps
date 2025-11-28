Ce document présente l’architecture complète du projet To-Do List, comprenant l’application web, la base de données et leur déploiement sur Kubernetes.

1. Vue d’ensemble

L’application comporte deux composants principaux :

Backend NodeJS (API To-Do)

Base de données PostgreSQL

Chaque composant tourne dans un Pod indépendant et communique via des Services Kubernetes.

2. Schéma d’architecture
                 ┌──────────────────────────┐
                 │       Utilisateur        │
                 └─────────────┬────────────┘
                               │
                        (NodePort Service)
                               │
                 ┌─────────────▼─────────────┐
                 │     Pod Web (NodeJS)      │
                 │  API To-Do (CRUD simple)  │
                 └─────────────┬─────────────┘
                               │
                     (ClusterIP interne)
                               │
                 ┌─────────────▼─────────────┐
                 │   Pod PostgreSQL (DB)     │
                 │  + PersistentVolumeClaim   │
                 └────────────────────────────┘

3. Composants Kubernetes
PostgreSQL

deployment-db.yaml

pvc-db.yaml

secret-db.yaml

configmap-db.yaml

service-db.yaml (ClusterIP)

Application Web (NodeJS)

Dockerfile

deployment-web.yaml

service-web.yaml (NodePort)

4. Architecture Docker
Service	Image Docker
App Web	todo-app-nodejs
Base de DB	postgres:latest
5. Résumé

Architecture simple, claire :

un Pod DB + persistance

un Pod Web

communication interne via ClusterIP

exposition externe via NodePort
