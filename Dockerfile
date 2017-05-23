FROM java:8

# Install maven
RUN apt-get update
RUN apt-get install -y gradle

WORKDIR /code

ADD build.gradle /code/build.gradle
ADD src /code/src
ADD frontend /code/frontend
RUN ["gradle", "npm_run_prod"]

EXPOSE 34456
CMD ["gradle", "run"]
