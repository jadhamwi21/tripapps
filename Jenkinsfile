pipeline {
  agent any
  environment {
    DockerHubCredentialsID = 'dockerhub'
    TripAppsVpsCredentialsID = 'tripapps-vps-ssh'
    DockerHubRepo = 'jadhamwi21/tripapps'
    TripAppsDockerNetwork = 'tripapps_network'
    TripAppsVpsIpAddress = '212.227.47.195'
    MongodbUrl = "mongodb://db:27017/tripapps"
    ServerPort = 5000
    BuildTimeApiUrl = "http://node:5000"
    RuntimeApiUrl = "/api"
  }
  stages {
    stage("build:cli") {
      when { changeset "./cli/*"}
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
      when { changeset "./server/*"}
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
    stage("build:nextjs") {
      when { changeset "./client/*"}
      steps {
          dir("./client"){
            script {
              docker.withTool("docker") {
                def dockerImage = docker.build("$DockerHubRepo:nextjs","-f Dockerfile.nextjs .")
                docker.withRegistry('',DockerHubCredentialsID){
                  dockerImage.push();
                }
              }
            }
          }
      }
    }
    stage("build:nginx") {
      when { changeset "./client/*"}
      steps {
          dir("./client"){
            script {
              docker.withTool("docker") {
                def dockerImage = docker.build("$DockerHubRepo:nginx","-f Dockerfile.nginx .")
                docker.withRegistry('',DockerHubCredentialsID){
                  dockerImage.push();
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
            docker rm --force tripapps-cli 2> /dev/null || echo 'No Container';
            docker run --name tripapps-cli -e MONGODB_URL=$MongodbUrl -d --network $TripAppsDockerNetwork $DockerHubRepo:cli;
            """
            sh "ssh -o StrictHostKeyChecking=no $TripAppsVpsIpAddress -l jad $COMMANDS"
          }
          // Node Server Deployment
          script {
            def COMMANDS = """
            docker pull $DockerHubRepo:node;
            docker rm --force tripapps-node 2> /dev/null || echo 'No Container';
            docker run --hostname node --name tripapps-node -e MONGODB_URL=$MongodbUrl -e PORT=$ServerPort -d --network $TripAppsDockerNetwork $DockerHubRepo:node;
            """
            sh "ssh -o StrictHostKeyChecking=no $TripAppsVpsIpAddress -l jad $COMMANDS"
          }
          // Nginx Deployment
          script {
            def COMMANDS = """
            docker pull $DockerHubRepo:nginx;
            docker rm --force tripapps-nginx 2> /dev/null || echo 'No Container';
            docker run --hostname nginx --restart -p 80:80 always --name tripapps-nginx -d --network $TripAppsDockerNetwork $DockerHubRepo:nginx;
            """
            sh "ssh -o StrictHostKeyChecking=no $TripAppsVpsIpAddress -l jad $COMMANDS"
          }
          // Nextjs Deployment
          script {
            def COMMANDS = """
            docker pull $DockerHubRepo:nextjs;
            docker rm --force tripapps-nextjs 2> /dev/null || echo 'No Container';
            docker run --hostname nextjs --name tripapps-nextjs -e BUILDTIME_API_URL=$BuildTimeApiUrl -e NEXT_PUBLIC_API_URL=$RuntimeApiUrl -d --network $TripAppsDockerNetwork $DockerHubRepo:nextjs;
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