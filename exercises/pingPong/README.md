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
	
kubectl apply -f exercises/pingPong/manifest/google/service.yaml