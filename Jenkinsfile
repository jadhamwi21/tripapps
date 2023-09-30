#!groovy​
pipeline {
    agent any
    environment {
        MY_VAR = '1.4.3'
        CREDS = credentials("tripapps-github")
    }
    stages {
        stage("build") {
            steps {
                echo "building for ${CREDS_USR} ${CREDS_PSW}"
            }
        }
    }
}