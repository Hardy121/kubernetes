## Add Matrics

It is use full for deployment as it is stateless

- Kind cluster install Metrics Server

```yaml
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

- Edit the Metrics Server Deployment

```yaml
kubectl -n kube-system edit deployment metrics-server
```

- Add the security bypass to deployment under `container.args`

```yaml
- --kubelet-insecure-tls
- --kubelet-preferred-address-types=InternalIP,Hostname,ExternalIP
```

- Restart the deployment

```yaml
kubectl -n kube-system rollout restart deployment metrics-server
```

- Verify if the metrics server is running