pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials("tripapps-dockerhub")
    }
    stages {
        stage("build") {
            sh "docker"
            steps {
                dir("./cli") {
                    sh "docker build -t jadhamwi21/tripapps:cli ."
                }
            }
        }
        stage("login") {
            steps {
                sh "echo ${DOCKERHUB_CREDS_PSW} | docker login -u ${DOCKERHUB_CREDS.USR} --password-stdin"
            }
        }
        stage("push") {
            steps {
                sh "docker push jadhamwi21/tripapps:cli"
            }
        }
        stage("deploy"){
            steps {
                sshagent(["tripapps-vps"]) {
                        sh """ssh -o StrictHostkeyChecking=no jad@212.227.47.195 << EOF
                        docker pull jadhamwi21/tripapps:cli
                        docker run jadhamwi21/tripapps:cli
                        """
                    } 
            }
        }
    }
}