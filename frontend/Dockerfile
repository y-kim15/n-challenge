FROM node:12

COPY package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm install --only=production

WORKDIR /app
ADD . /app

EXPOSE 8000

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]