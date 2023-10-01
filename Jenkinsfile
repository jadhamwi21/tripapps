pipeline {
  agent any
  environment {
    REGISTRY_CREDENTIALS = 'dockerhub'
    REPO = 'jadhamwi21/tripapps'
  }
  stages {
    stage("build:cli") {
      steps {
        dir("./cli") {
          script {
            docker.withTool('docker') {
              def dockerImage = docker.build "$REPO:cli"
              docker.withRegistry('', REGISTRY_CREDENTIALS) {
                dockerImage.push()
              }
            }
          }
        }
      }
    }
  }
}