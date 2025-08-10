# PingPong

Deploy this using: 

docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/pongs

kubectl apply -f pingPong/persistentVolume.yaml

kubectl apply -f pingPong/persistentVolumeClaim.yaml

kubectl apply -f pingPong/manifest

kubectl apply -f logOutput/manifest/deployment.yaml

kubectl apply -f logOutput/manifest/service.yaml