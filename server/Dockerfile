FROM node:13-alpine

WORKDIR /user/crud 

COPY ./ ./

ENV PORT=${HOST_PORT}
EXPOSE ${HOST_PORT}

ENV TZ=America/Sao_Paulo

COPY ["package.json", "./"]
RUN npm install --silent

CMD npm test && npm start
