FROM node:20
 
WORKDIR /app
 
COPY . .

RUN yarn add vite -g
RUN yarn install

EXPOSE 5173
 
CMD [ "yarn", "start" ]

