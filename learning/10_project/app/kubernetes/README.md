-> create node.js project
-> create dockerfile of it
-> make image of of project
    - docker build  image-name .
    - docker run -it -d -p port:port image-name

-> load it in kind
    - kind load docker-image container-name --name cluster-name
    - docker exec -it kind-cluster-control-plane crictl images | grep container-name

-> create deployment and service of Database
    - kubectl apply -f mongodb-deployment.yml
    - kubectl apply -f mongodb-service.yml

-> create deployment and service of Application
    - kubectl apply -f blog-deployment.yml
    - kubectl apply -f blog-service.yml

blog-app Namespace
│
├── blog-deployment
│   ├── Pod 1
│   └── Pod 2
│
├── blog-service
│
├── mongodb-deployment
│   └── MongoDB Pod
│
└── mongodb-service


