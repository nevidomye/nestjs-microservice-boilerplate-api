FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm i -g @nestjs/cli
RUN npm ci --omit=dev --ignore-scripts
RUN npm run build

RUN ls dist -al

CMD ["node", "dist/main.js"]
