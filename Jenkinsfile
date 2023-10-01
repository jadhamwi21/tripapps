pipeline {
  agent any
  environment {
    REGISTRY_CREDENTIALS = 'dockerhub'
    DOCKERHUB_ACCESS_TOKEN = credentials("dockerhub")
    REMOTE_COMMAND = """docker login -u jadhamwi21 -p $DOCKERHUB_ACCESS_TOKEN_PSD;
            docker pull jadhamwi21/tripapps:cli;
            docker run -d jadhamwi21/tripapps:cli;"""
    REPO = 'jadhamwi21/tripapps'
    VPS_SSH = 'tripapps-vps-ssh'
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
    stage("deploy:cli") {
      steps {
        sshagent ([VPS_SSH]) {

            sh "ssh -o StrictHostKeyChecking=no 212.227.47.195 -l jad $REMOTE_COMMAND"
          
          }
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}