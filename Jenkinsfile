pipeline {
  agent any
  environment {
    REGISTRY_CREDENTIALS = 'dockerhub'
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
        sshagent (credentials: [VPS_SSH]) {
            sh """ssh -o StrictHostKeyChecking=no 212.227.47.195 -l jad << EOF
            echo 'from remote server'
            """
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