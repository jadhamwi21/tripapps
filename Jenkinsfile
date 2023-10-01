pipeline {
  agent any
  environment {
    REGISTRY_CREDENTIALS = 'dockerhub'
    DOCKERHUB_ACCESS_TOKEN = credentials("dockerhub")
    REPO = 'jadhamwi21/tripapps'
    VPS_SSH = 'tripapps-vps-ssh'
  }
  stages {
    stage("build:cli") {
      steps {
        echo "$DOCKERHUB_ACCESS_TOKEN"
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
            sh """ssh -o StrictHostKeyChecking=no 212.227.47.195 -l jad << EOF
            docker login -u jadhamwi21 -p dckr_pat_egDXk0YTStYxOMaGO-IwLj3T8Ug
            docker pull jadhamwi21/tripapps:cli
            docker run jadhamwi21/tripapps:cli
            EOF
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