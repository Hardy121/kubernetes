https://github.com/LondheShubham153/kubestarter/tree/main/kind-cluster

**1. Install KIND and kubectl using** 

[install.sh](attachment:a26909fd-924a-4fba-b5d4-4db8af01a5c5:install.sh)

**2. Setting Up the KIND Cluster**

Create a kind-config.yaml file:

Create the cluster using the configuration file:

```bash
kind create cluster --config kind-config.yaml --name tws-kind-cluster
```

Verify the cluster:

```bash
kubectl get nodes
kubectl cluster-info
```

**3. Accessing the Cluster**

Use kubectl to interact with the cluster:

```bash
kubectl cluster-info
```