#!bin/bash

cd /opt/fhl/grafana-8.0.6
./bin/grafana-server & echo "Grafana Started"

cd /opt/fhl/loki
./loki-linux-amd64 -config.file=loki.yaml