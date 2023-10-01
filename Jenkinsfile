pipeline {
    agent any
    environment {
        registryCredentials = 'tripapps-dockerhub'
        registry = 'jadhamwi21/tripapps'
    }
    stages {
        stage("build:cli") {
            steps{
                script {
                  
                    def dockerImage = docker.build registry + "/cli:latest"
                    docker.withRegistry('',registryCredentials){
                        dockerImage.push()
                    }
                }
            }
        }
    }
}