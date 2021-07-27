#!bin/bash

cd /opt/fhl/grafana-8.0.6
./bin/grafana-server > /dev/null & echo "Grafana Started"

cd /opt/fhl/loki
./loki-linux-amd64 -config.file=loki.yaml > /dev/null & echo "Loki Started"

cd /opt/fhl
serve -s log-app -l 8080