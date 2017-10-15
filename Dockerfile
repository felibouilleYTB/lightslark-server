FROM java:8

# Install gradle
RUN apt-get update
RUN apt-get install -y gradle

WORKDIR /code

ADD build.gradle /code/build.gradle
ADD src /code/src
ADD frontend /code/frontend
RUN ["gradle", "yarn_prod"]

EXPOSE 34456
CMD ["gradle", "run"]
