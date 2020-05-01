pipeline {
    agent {
        docker {
            image 'node:lts-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh "npm run ng -- build --prod"
            }
        }

        stage('Deploy') {
            steps {
                sh 'rm -rf /ffa-tv/*'
                sh 'cp -rf dist/ffa-tv/* /ffa-tv'
            }
        }
    }
}

