FROM node:8.11.1

WORKDIR /Users/Desmond/Sites/smart-brain-api

COPY ./ ./

RUN yarn

CMD ["/bin/bash"]