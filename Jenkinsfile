pipeline {
  agent any
  environment {
    registryCredentials = 'dockerhub'
    registry = 'jadhamwi21/tripapps'
  }
  stages {
    stage("build:cli") {
      steps {
        dir("./cli") {
          script {
            docker.withTool('docker'){
            docker.withRegistry('', registryCredentials) {
            def dockerImage = docker.build registry + "/cli:latest"
              dockerImage.push()
            }
            }
          }
        }
      }
    }
  }
}