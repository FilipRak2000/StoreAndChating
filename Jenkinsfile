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
                sh 'npm build'
            }
        }
        
        stage('Package') {
            steps {
                sh 'zip -r build.zip build'
                archiveArtifacts 'build.zip'
            }
    }
        stage('Sonar Analysis') {
            environment {
                scannerHome = tool 'sonar4.8'
            }
            steps {
               withSonarQubeEnv('sonar') {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=sandch"

              }
            }
        }

}
}



