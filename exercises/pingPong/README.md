# PingPong

Deploy this using:

gcloud auth login

gcloud services enable container.googleapis.com

gcloud container clusters create my-google-cluster --zone=europe-north1-b --cluster-version=1.32 --disk-size=32 --num-nodes=3 --machine-type=e2-micro

kubectl create namespace exercises

kubectl apply -f exercises/pingPong/configmaps.yaml

kubectl apply -f exercises/pingPong/stateful/statefulset.yaml

kubectl apply -f exercises/pingPong/stateful/service.yaml

kubectl apply -f exercises/pingPong/manifest/deployment.yaml
	
kubectl apply -f exercises/pingPong/manifest/service.yaml

kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.3.0/standard-install.yaml

kubectl apply -f exercises/pingPong/gateway/gateway.yaml

kubectl apply -f exercises/pingPong/gateway/route.yaml

kubectl apply -f exercises/logOutput/configmaps.yaml

kubectl apply -f exercises/logOutput/manifest/deployment.yaml

kubectl apply -f exercises/logOutput/manifest/service.yaml