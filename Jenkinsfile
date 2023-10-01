pipeline {
  agent any
  environment {
    DockerHubCredentialsID = 'dockerhub'
    TripAppsVpsCredentialsID = 'tripapps-vps-ssh'
    DockerHubRepo = 'jadhamwi21/tripapps'
    TripAppsDockerNetwork = 'tripapps_network'
    TripAppsVpsIpAddress = '212.227.47.195'
    MongodbUrl = "mongodb://db:27017/tripapps"
    ServerPort = 80
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
    stage("build:node") {
      steps {
        dir("./server") {
          script {
            docker.withTool('docker') {
              def dockerImage = docker.build "$DockerHubRepo:node"
              docker.withRegistry('', DockerHubCredentialsID) {
                dockerImage.push()
              }
            }
          }
        }
      }
    }
    stage("deploy") {
      steps {
        sshagent([TripAppsVpsCredentialsID]) {
          // Cli Deployment
          script {
            def COMMANDS = """
            docker pull $DockerHubRepo:cli;
            docker kill tripapps-cli 2> /dev/null || echo 'No Container';
            docker run --name tripapps-cli -e MONGODB_URL=$MongodbUrl -d --network $TripAppsDockerNetwork $DockerHubRepo:cli;
            """
            sh "ssh -o StrictHostKeyChecking=no $TripAppsVpsIpAddress -l jad $COMMANDS"
          }
          // Node Server Deployment
          script {
            def COMMANDS = """
            docker pull $DockerHubRepo:node;
            docker kill tripapps-node 2> /dev/null || echo 'No Container';
            docker run --hostname node --name tripapps-node -e MONGODB_URL=$MongodbUrl -e PORT=$ServerPort -d --network $TripAppsDockerNetwork $DockerHubRepo:node;
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