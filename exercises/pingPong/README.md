# PingPong

Deploy this using: 

kubectl create namespace exercises

kubectl apply -f exercises/pingPong/configmaps.yaml

kubectl apply -f exercises/pingPong/statefulset.yaml

kubectl apply -f exercises/pingPong/service.yaml

kubectl apply -f exercises/pingPong/manifest

kubectl apply -f exercises/logOutput/configmaps.yaml

kubectl apply -f exercises/logOutput/manifest/deployment.yaml

kubectl apply -f exercises/logOutput/manifest/service.yaml