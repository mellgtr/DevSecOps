Guide de Déploiement – Projet To-Do List

(NodeJS + PostgreSQL + Kubernetes)

Ce guide explique comment déployer l’application complète dans Kubernetes.

#1. Construire l’image Docker de l’application
cd app
docker build -t todo-app-nodejs .

#2. Déployer la base de données PostgreSQL
kubectl apply -f k8s/configmap-db.yaml
kubectl apply -f k8s/secret-db.yaml
kubectl apply -f k8s/pvc-db.yaml
kubectl apply -f k8s/deployment-db.yaml
kubectl apply -f k8s/service-db.yaml

#3. Déployer l’application NodeJS
kubectl apply -f k8s/deployment-web.yaml
kubectl apply -f k8s/service-web.yaml

#4. Vérifier le déploiement
kubectl get pods
kubectl get svc
kubectl get deployments
kubectl get pvc

#5. Accéder à l’application
minikube service todo-web

#6. Logs
kubectl logs deploy/todo-web
kubectl logs deploy/postgres
