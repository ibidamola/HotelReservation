pipeline {
    agent any

    stages {
        stage('Connect To Github') {
            steps {
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/ibidamola/HotelReservation.git']])
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t dockerfile .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Check if port 8081 is already in use
                    sh '''
                    if lsof -i :8081; then
                        echo "Port 8081 is in use. Stopping the existing container."
                        docker ps -q --filter "ancestor=dockerfile" | xargs docker stop
                    fi
                    // Run the new Docker container
                    docker run -itd -p 8081:80 dockerfile
                    '''
                }
            }
        }
    }
}
