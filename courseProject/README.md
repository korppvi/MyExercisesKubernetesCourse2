# TodoApp

Deploy this using: kubectl apply -f manifest/deployment.yaml

Application can be accessed with port-forward with following way:

ville@ville-VirtualBox:~$ kubectl get po

NAME                             READY   STATUS    RESTARTS      AGE

logoutput-dep-766dbc949b-tzq56   1/1     Running   3 (15m ago)   3h49m

todoapp-dep-65bfc6b8d4-jnqj7     1/1     Running   0             8m41s

kubectl port-forward todoapp-dep-65bfc6b8d4-jnqj7 3003:3000