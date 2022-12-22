FROM node:16-alpine

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 3010
CMD ["npm","run","dev"]

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm ci

# COPY index.js .

# ENTRYPOINT [ "node", "index.js" ]