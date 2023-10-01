pipeline {
  agent any
  environment {
    DockerHubCredentialsID = 'dockerhub'
    TripAppsVpsCredentialsID = 'tripapps-vps-ssh'
    DockerHubRepo = 'jadhamwi21/tripapps'
    TripAppsDockerNetwork = 'tripapps_network'
    TripAppsVpsIpAddress = '212.227.47.195'
  }
  stages {
    stage("build:cli") {
      steps {
        dir("./cli") {
          script {
            docker.withTool('docker') {
              def dockerImage = docker.build "$DockerHubRepo:cli"
              docker.withRegistry('', DockerHubCredentialsID) {
                dockerImage.push()
              }
            }
          }
        }
      }
    }
    stage("deploy:cli") {
      steps {
        sshagent([TripAppsVpsCredentialsID]) {
          script {
            def COMMANDS = """
            docker pull $DockerHubRepo:cli;
            docker run -d --network $TripAppsDockerNetwork $DockerHubRepo:cli;
            """
            sh "ssh -o StrictHostKeyChecking=no $TripAppsVpsIpAddress -l jad $COMMANDS"
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