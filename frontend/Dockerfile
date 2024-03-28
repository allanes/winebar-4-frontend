FROM node:18-alpine3.17

WORKDIR /app

COPY package.json .

RUN npm install

# Lo siguiente queda montado como volumen desde el compose
# COPY public ./public
# COPY src ./src
# COPY tsconfig.json .
