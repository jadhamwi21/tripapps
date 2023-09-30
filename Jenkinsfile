pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials("tripapps-dockerhub")
    }
    stages {
        stage("build") {
            steps {
                "docker --version"
                dir("./cli") {
                    "docker build -t jadhamwi21/tripapps:cli ."
                }
            }
        }
        stage("login") {
            steps {
                "echo ${DOCKERHUB_CREDS_PSW} | docker login -u ${DOCKERHUB_CREDS.USR} --password-stdin"
            }
        }
        stage("push") {
            steps {
                "docker push jadhamwi21/tripapps:cli"
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