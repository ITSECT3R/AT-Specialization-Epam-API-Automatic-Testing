pipeline {
    agent any
    
    environment {
        NODE_ENV = 'test'
    }
    
    tools {
        nodejs 'NodeJS'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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