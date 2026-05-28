deployment file



create deployment commands

1. Create namespace 

```bash
kubectl create namespace -n name
```

2. run yaml file

```bash
kubectl apply -f demo.yml
```

3. checkout deployment

```bash
kubectl get deployment -n namespaceName
```

4. scale up deployment

```bash
kubectl scale deployment/metadata-name -n namespaceName --replicas Number (e.g 1)
```