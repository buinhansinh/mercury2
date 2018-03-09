FROM node:9.7.1-alpine
ADD ./web /web
WORKDIR /web
CMD ["npm", "run", "start"]