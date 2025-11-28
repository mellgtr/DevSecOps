Guide de Maintenance – To-Do List

#1. Redémarrer un Pod  
kubectl delete pod <nom>

#2. Logs  
kubectl logs deploy/todo-web  
kubectl logs deploy/postgres

#3. Accéder à PostgreSQL  
kubectl exec -it deploy/postgres -- bash  
psql -U todo_user -d todo_db

#4. Mettre à jour l’application  
docker build -t todo-app-nodejs .  
kubectl rollout restart deploy/todo-web

#5. État du cluster  
kubectl get pods  
kubectl get svc  
kubectl get pvc  
kubectl get deployments

#6. Arrêter Minikube  
minikube stop  
minikube delete

