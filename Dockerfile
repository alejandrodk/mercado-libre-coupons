FROM node:14

ENV HOME_DIR=/usr/src/app

RUN mkdir -p "${HOME_DIR}"
WORKDIR "${HOME_DIR}"

COPY ["package.json", "yarn.lock", "${HOME_DIR}/"]
RUN yarn install --check-files --frozen-lockfile --network-timeout 100000

COPY [".", "${HOME_DIR}"]
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]