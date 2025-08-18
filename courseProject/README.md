# TodoApp

Deploy this using: 

gcloud auth login

gcloud services enable container.googleapis.com

gcloud container clusters create some-cluster-exercise --zone=europe-north1-b --cluster-version=1.32 --disk-size=32 --num-nodes=3 --machine-type=e2-micro

gcloud compute ssh {node-name} --zone europe-north1-b

sudo mkdir -p /tmp/images

sudo chmod 777 /tmp/images

Change node name in persistentVolume.yaml to {node-name}

kubectl create namespace project

kubectl apply -k .