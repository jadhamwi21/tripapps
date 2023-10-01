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
            def dockerImage = docker.build registry + "/cli"
            docker.withRegistry('', registryCredentials) {
              dockerImage.push()
            }
            }
          }
        }
      }
    }
  }
}