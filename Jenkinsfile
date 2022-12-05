pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t live-apps-utils .'
            }
        }
        stage('Stop running Container') {
            steps {
                sh 'docker rm live-apps-utils --force'
            }
        }
        stage('Start Container') {
            steps {
                sh 'docker run -p 5005:5000 -d --name live-apps-utils live-apps-utils'
            }
        }

    }
}