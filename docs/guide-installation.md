# Guide d’installation – Projet DevSecOps To-Do List  
(NodeJS + PostgreSQL + Kubernetes)

Ce guide explique comment installer tous les outils nécessaires pour exécuter et déployer l’application To-Do List sur un cluster Kubernetes local.

---

## 1. Outils nécessaires

- **Docker Desktop** – pour construire et exécuter des images Docker  
- **Minikube** – cluster Kubernetes local  
- **kubectl** – gestion des ressources Kubernetes  
- **NodeJS + npm** – exécution de l’application web  
- **Git** – pour cloner le projet  

---

## 2. Installation de Docker Desktop

Téléchargement :  
https://www.docker.com/products/docker-desktop/

Vérifier l’installation :

```bash
docker --version
```

---

## 3. Installation de Minikube

Téléchargement :  
https://minikube.sigs.k8s.io/docs/start/

Vérifier :

```bash
minikube version
```

---

## 4. Installation de kubectl

Téléchargement :  
https://kubernetes.io/docs/tasks/tools/

Vérifier :

```bash
kubectl version --client
```

---

## 5. Installation de NodeJS

Téléchargement :  
https://nodejs.org/

Vérification :

```bash
node -v
npm -v
```

---

## 6. Installation de Git

Téléchargement :  
https://git-scm.com/downloads

Vérifier :

```bash
git --version
```

---

## 7. Démarrage du cluster Kubernetes (Minikube)

```bash
minikube start
```

---

## 8. Cloner le projet DevSecOps

```bash
git clone https://github.com/mellgtr/DevSecOps.git
cd DevSecOps
```

---

## 9. Vérifier le fonctionnement de Kubernetes

Lister les pods :

```bash
kubectl get pods
```

Lister les services :

```bash
kubectl get svc
```

---

 **Fin du guide d'installation.**  
Vous pouvez maintenant passer au guide de déploiement.
