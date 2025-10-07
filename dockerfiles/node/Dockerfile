FROM node:24

RUN apt-get update && apt-get -y install \
    vim \
    postgresql \
    postgresql-contrib \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
