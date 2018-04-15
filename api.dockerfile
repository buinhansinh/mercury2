FROM node:9.10.1-alpine
ADD ./api /api
WORKDIR /api
CMD ["npm", "run", "start"]