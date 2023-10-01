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
        script {
          def remoteCommand = """
            docker login -u jadhamwi21 -p ${DOCKERHUB_ACCESS_TOKEN}
            docker pull ${REPO}:cli
            docker run ${REPO}:cli
            echo 'complete'
          """
          sshagent([VPS_SSH]) {
            sh "ssh -o StrictHostKeyChecking=no 212.227.47.195 -l jad << EOF\n${remoteCommand}\nEOF"
          }
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