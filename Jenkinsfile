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
                    post {
                        always {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: '.',
                                reportFiles: 'lint-results.html',
                                reportName: 'ESLint Report',
                                reportTitles: 'ESLint Results'
                            ])
                        }
                    }
                }
                
                stage('Prettier Check') {
                    steps {
                        sh 'npm run format:check'
                    }
                }
            }
        }
        
        stage('API Tests') {
            steps {
                sh 'npm run api-test'
            }
            post {
                always {
                    publishTestResults([
                        allowEmptyResults: false,
                        testResultsPattern: 'test-results.xml'
                    ])
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'jest_html_reporters',
                        reportFiles: 'jest_html_reporters.html',
                        reportName: 'API Test Report',
                        reportTitles: 'API Test Results'
                    ])
                }
            }
        }
        
        stage('Test Coverage') {
            steps {
                sh 'npm run test:coverage'
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report',
                        reportTitles: 'Test Coverage Results'
                    ])
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}