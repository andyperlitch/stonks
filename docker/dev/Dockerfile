FROM node:14

VOLUME /root/app
WORKDIR /root/app

COPY ./docker/dev/.profile /root

# Port that the app is running on
EXPOSE 4000

# Port for debugging the node app
EXPOSE 9229

# Command to first run inside the container when it starts up
ENTRYPOINT ["/bin/bash", "--init-file", "/root/.profile"]