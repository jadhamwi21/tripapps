def cliScript;
pipeline {
  agent any
  environment {
    registryCredentials = 'tripapps-dockerhub'
    registry = 'jadhamwi21/tripapps'
  }
  stages {
    stage("init") {
      steps {
        script {
          def dockerHome = tool 'docker'
          env.PATH = "${dockerHome}/bin:${env.PATH}"
          cliScript = load "./cli.groovy"
        }
      }
    }
    
    stage("build:cli") {
      steps {
        dir("./cli") {
          script {
            cliScript.buildCli()
          }
        }
      }
    }
  }
}