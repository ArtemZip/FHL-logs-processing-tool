# FHL Logs processing tool

### How to build image
Before starting you need to build react app
```shell
yarn build
```
And then 
```shell
docker build -t fhl-logs-tool .
```

### How to run
After running next command `http://localhost:3000`, `http://localhost:3100`, `http://localhost:8080` should work.
```shell 
docker run -p 3000:3000 -p 3100:3100 -p 8080:8080 fhl-logs-tool
```

### TODO:
 - Add config to Grafana to be connected with Loki (Artem) - done
 - Create Single Page App with simple form (file and label inputs, submit button)
 - On submit post chunks(consider about size of chunk) of logs to `http://localhost:3100/loki/api/v1/push` ([api docs](https://grafana.com/docs/loki/latest/api/#post-lokiapiv1push))  
 - Put app to docker image - done
 - Learn Loki queries
 - Add simple dashboard to docker image for example.