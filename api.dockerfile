FROM node:10.9.0-alpine
ADD ./api /api
WORKDIR /api
CMD ["npm", "run", "start"]