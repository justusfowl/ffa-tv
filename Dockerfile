FROM node:12

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install --quiet

COPY ./ ./

WORKDIR /usr/app/frontend/src/environments/

COPY frontend/src/environments/* /usr/app/frontend/src/environments/

WORKDIR /usr/app/uploads

WORKDIR /usr/app

RUN npm install

RUN cd /usr/app/frontend && npm install

RUN npm install -g @angular/cli@12.0.1

RUN cd /usr/app/frontend && ng build --prod

CMD ["node", "server.js"]