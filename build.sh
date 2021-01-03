docker build -t soccer-pong .
docker stop soccer-pong
docker rm soccer-pong
docker create \
  --name soccer-pong \
  --net fly \
  soccer-pong
