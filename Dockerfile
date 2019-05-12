FROM node:11.14.0-alpine as node


# Sets the path where the app is going to be installed
ENV NODE_ROOT /usr/app/
# Creates the directory and all the parents (if they don’t exist)
RUN mkdir -p $NODE_ROOT
# Sets the /usr/app as the active directory
WORKDIR $NODE_ROOT

COPY ./package.json ./

RUN npm install

COPY . .

# RUN npm run ssr

CMD ["npm", "run", "ssr"]
