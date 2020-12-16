FROM node:14.15 AS builder
ENV CYPRESS_INSTALL_BINARY=0
WORKDIR /app
COPY package*.json ./
RUN npm set progress=false && npm ci
COPY ./ ./
RUN npm run build

FROM node:14.15
RUN npm install -g http-server
WORKDIR /app
COPY --from=builder /app/dist/ dist/
EXPOSE 5000
USER node
CMD [ "http-server", "-p 5000", "dist/" ]
