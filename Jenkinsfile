pipeline {
  agent any
  environment {
    registryCredentials = 'dockerhub'
    registry = 'jadhamwi21/tripapps'
  }
  stages {
    stage("init") {
      steps {
        script {
          def dockerHome = tool 'docker'
          env.PATH = "${dockerHome}/bin:${env.PATH}"

        }
      }
    }

    stage("build:cli") {
      steps {
        dir("./cli") {
          script {
            def dockerImage = docker.build registry + "/cli:latest"
            docker.withRegistry('', registryCredentials) {
              dockerImage.push()
            }
          }
        }
      }
    }
  }
}