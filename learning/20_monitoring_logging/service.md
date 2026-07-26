```yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

```yaml
kind: ServiceAccount
apiVersion: v1
metadata:
  name: admin-user
  namespace: kubernetes-dashboard

---

kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: admin-user-binding
  namespace: kubernetes-dashboard

subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard

roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
```

```yaml
kubectl -n kubernetes-dashboard create token admin-user
```

```yaml
kubectl proxy
```

```yaml
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

```
