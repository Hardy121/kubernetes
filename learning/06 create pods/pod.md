### Run Pods in namespaces with creation of pod

```bash
kubectl run nginx --image=nginx-n nginx
```

```bash
ubuntu@DESKTOP-5RB8M36:~/kubernetes$ kubectl run nginx--image=nginx -n ngnix
pod/ngnix created
ubuntu@DESKTOP-5RB8M36:~/kubernetes$ kubectl get pods -n ngnix
NAME    READY   STATUS         RESTARTS   AGE
ngnix   0/1     ErrImagePull   0          15s
ubuntu@DESKTOP-5RB8M36:~/kubernetes$

```

### Delete Pods in namespaces

```bash
kubectl delete pod nginx -n nginx
```

```bash
ubuntu@DESKTOP-5RB8M36:~/kubernetes$ kubectl delete pod ngnix -n ngnix
pod "ngnix" deleted from ngnix namespace
ubuntu@DESKTOP-5RB8M36:~/kubernetes$ kubectl get pods -n nginx
No resources found in nginx namespace.
ubuntu@DESKTOP-5RB8M36:~/kubernetes$

```