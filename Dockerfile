FROM amd64/ubuntu:latest

USER root

#TOOLS INSTALATION
RUN apt-get update \
  && apt-get install -y curl \
  && apt-get install unzip

#LOKI
RUN mkdir -p /opt/fhl/loki \
    && cd /opt/fhl/loki \
    && curl -O -L "https://github.com/grafana/loki/releases/download/v2.2.1/loki-linux-amd64.zip" \
    && unzip loki-linux-amd64.zip \
    && chmod a+x loki-linux-amd64

#GRAFANA
RUN cd /opt/fhl \
    && curl -O -L "https://dl.grafana.com/oss/release/grafana-8.0.6.linux-amd64.tar.gz" \
    && tar -xvf grafana-8.0.6.linux-amd64.tar.gz

#COPYING CONFIGS & SCRIPTS
COPY ./.bin/loki.yaml /opt/fhl/loki/loki.yaml
COPY ./.bin/run.sh /opt/fhl/run.sh
RUN chmod 777 /opt/fhl/run.sh

EXPOSE 3000 3100 9093 9096
ENTRYPOINT [ "/opt/fhl/run.sh"]