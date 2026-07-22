Every single worker node in a Kubernetes cluster runs a small, powerful agent called the **`kubelet`**.

Think of the `kubelet` as the **Site Manager** or the **Captain** of that specific machine. It takes orders directly from the Control Plane and ensures things get done on its local host.

### How the `kubelet` Works

Remember in Stage 3 when the `kube-scheduler` decided that a Pod should run on `Node-02`, and the API server saved that decision to `etcd`?

Here is what happens next:

1. **The Watch:** The `kubelet` on `Node-02` is constantly watching the `kube-apiserver`. It notices: *"Oh! The API server just updated the records. There is a new Pod assigned to ME."*
2. **The Execution:** The `kubelet` reads the Pod's specifications (what image to use, how much memory it needs). But the `kubelet` doesn't actually know how to run a container itself. It's a manager, not the worker.
3. **The Order:** It turns to the **Container Runtime** (which we will cover next) and says: *"Hey, pull down this Docker image and start running it right now."*
4. **The Status Report:** Once the container is running, the `kubelet` continuously monitors it. It reports back to the API server: *"Hey Boss, the container is up, healthy, and running on IP 10.244.1.5."*

### The Pod Nanny

If a container inside a Pod crashes on that node, the `kubelet` is the first to notice. It will automatically try to restart the container right there on the spot to keep it alive.

To summarize: The `kubelet` is the boots-on-the-ground agent that takes the instructions from the API server and turns them into actual running containers on the machine.