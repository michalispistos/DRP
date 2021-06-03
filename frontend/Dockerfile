FROM node:16

RUN mkdir /drp12_frontend

WORKDIR /drp12_frontend

COPY . /drp12_frontend/

ENV PATH /drp12_frontend/node_modules/.bin:${PATH}

RUN npm install

RUN npm run build

CMD ["npm", "start"]