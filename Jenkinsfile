pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                
                git branch: 'main', url: 'https://github.com/FilipRak2000/StoreAndChating.git'
            }
        }

        stage('Install dependencies') {
            steps {
                
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
               
                sh 'npm test' 
            }
        }

        stage('Build') {
            steps {
                
                sh 'npm run build' 
            }
        }

    }
}
