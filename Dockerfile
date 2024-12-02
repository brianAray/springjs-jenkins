FROM openjdk:17-jdk-alpine
VOLUME /tmp
ARG WAR_FILE=target/SpringJS-0.0.1-SNAPSHOT.war
COPY ${WAR_FILE} app.war
ENTRYPOINT ["java", "-jar", "/app.war"]
