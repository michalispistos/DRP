FROM node:16

RUN mkdir /drp12_backend

WORKDIR /drp12_backend

COPY . /drp12_backend/

ENV PATH /drp12_backend/node_modules/.bin:${PATH}

RUN npm install

CMD ["npm", "start"]