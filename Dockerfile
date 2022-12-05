FROM node:16-alpine
WORKDIR /usr/src/live-apps-utils
COPY package.json .
RUN npm install -g typescript cpx
RUN npm install
COPY . .
RUN tsc
RUN npm run copy:assets
CMD ["node", "./dist/main.js"]
EXPOSE 5000