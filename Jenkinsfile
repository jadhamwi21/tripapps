pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                sshagent(["tripapps-vps"]) {
                    sh """ssh -o StrictHostkeyChecking=no jad@212.227.47.195 << EOF
                    echo "Hello From VPS"
                    """
                } 
            }
        }
    }
}