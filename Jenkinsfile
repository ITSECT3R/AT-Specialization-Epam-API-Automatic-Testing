pipeline {
    agent any
    
    environment {
        NODE_ENV = 'test'
        PATH = "$PATH:/usr/local/bin"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    // Check if Node.js is available
                    def nodeVersion = sh(script: 'node --version || echo "not found"', returnStdout: true).trim()
                    if (nodeVersion == "not found") {
                        // Install Node.js using NodeSource repository (for Ubuntu/Debian)
                        sh '''
                            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                            sudo apt-get install -y nodejs
                        '''
                    }
                    echo "Node.js version: ${sh(script: 'node --version', returnStdout: true).trim()}"
                    echo "npm version: ${sh(script: 'npm --version', returnStdout: true).trim()}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Code Quality - Linting & Formatting') {
            parallel {
                stage('ESLint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                
                stage('Prettier Check') {
                    steps {
                        sh 'npm run format:check'
                    }
                }
            }
        }
        
        stage('API Tests And Coverage') {
            steps {
                sh 'npm run test:coverage'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}