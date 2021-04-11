FROM vuejs/ci:latest
ENV APP_ROOT /life_frontend

#ENV NODE_ENV production
WORKDIR ${APP_ROOT}
COPY package*.json ./

COPY . .
#ADD . ${APP_ROOT}

EXPOSE 8080

CMD ["npm", "run", "serve"]

