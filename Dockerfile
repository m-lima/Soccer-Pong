# Node
FROM node

WORKDIR /src/soccer-pong/web

COPY web /src/soccer-pong/web

RUN mkdir -p ../static/game \
  && npm install \
  && npm run-script build

# Goland
FROM golang

WORKDIR /go/src/soccer-pong

COPY *.go /go/src/soccer-pong/

RUN go get -tags prod && go install -tags prod

# Main
FROM debian:stable-slim

WORKDIR /opt/soccer-pong

COPY static /opt/soccer-pong/static
COPY --from=0 /src/soccer-pong/static/game/* /opt/soccer-pong/static/game/
COPY --from=1 /go/bin/soccer-pong /opt/soccer-pong

EXPOSE 80

CMD ["./soccer-pong"]

