# pull official base image
FROM node:16.13-alpine

# set working directory
WORKDIR /app
EXPOSE 3000
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install serve -g
RUN npm install cors

# add app
COPY . ./
RUN npm run build
# start app
CMD ["serve", "-s", "build"]
#CMD ["npm", "start", "build"]
