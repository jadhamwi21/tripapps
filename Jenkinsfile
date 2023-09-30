#!groovy​
pipeline {
    agent any
    environment {
        MY_VAR = '1.4.3'
    }
    stages {
        stage("build") {
            steps {
                echo "building for ${MY_VAR}"
            }
        }
    }
}