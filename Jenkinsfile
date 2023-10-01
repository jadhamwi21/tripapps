pipeline {
    agent any
    environment {
        registryCredentials = 'tripapps-dockerhub'
        registry = 'jadhamwi21/tripapps'
    }
    stages {
        stage("init"){
            steps {
            echo "${PATH}"
            script {
                def dockerHome = tool 'docker'
                env.PATH = "${dockerHome}/bin:${env.PATH}"
                }
            }
        }
        stage("build:cli") {
            steps{
                dir("./cli"){
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
}