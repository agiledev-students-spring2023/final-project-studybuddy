#uses the ubuntu:20.04 image as the base image
FROM ubuntu:20.04 AS EXPRESS

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
RUN apt-get install build-essential -y

# create an app directory within the image... if doing this, just make sure your other Dockerfile commands reference this directory
WORKDIR app/

# install dependencies into the image - doing this first will speed up subsequent builds, as Docker will cache this step
COPY package.json .
COPY package-lock.json .

RUN npm install

# copy the remaining app source code into the default directory within the image
COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]