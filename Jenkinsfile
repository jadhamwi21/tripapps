pipeline {
    agent any
    environment{
        MY_ENV = 'jad is learning jenkins'
    }
    stages {
        stage("build") {
            steps {
                echo "${MY_ENV}"
            }
        }
    }
}