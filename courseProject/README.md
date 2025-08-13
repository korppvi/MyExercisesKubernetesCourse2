# TodoApp

Deploy this using: 

kubectl create namespace project

kubectl apply -f courseProject/todo-backend/manifest

docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/images

kubectl apply -f courseProject/persistentVolume.yaml

kubectl apply -f courseProject/persistentVolumeClaim.yaml

kubectl apply -f courseProject/manifest