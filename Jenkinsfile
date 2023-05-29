pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Pobranie kodu źródłowego z repozytorium Git
                git branch: 'main', url: 'https://github.com/FilipRak2000/StoreAndChating.git'
            }
        }

        stage('Install dependencies') {
            steps {
                // Zainstaluj zależności za pomocą Yarn lub npm
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                // Uruchom testy jednostkowe i/lub testy integracyjne
                sh 'npm test' // lub 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Zbuduj aplikację React
                sh 'npm build' // lub 'npm run build'
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

    }
}


