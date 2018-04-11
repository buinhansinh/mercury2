FROM node:9.7.1-alpine
ADD ./api /api
WORKDIR /api
CMD ["npm", "run", "start"]