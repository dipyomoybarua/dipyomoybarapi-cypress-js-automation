pipeline {
    agent any

    environment {
        CYPRESS_RECORD_KEY = credentials('cypress-record-key')
        CYPRESS_PROJECT_ID = credentials('cypress-project-id')
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/dipyomoybarua/api-cypress-js-automation'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install --force cypress-image-snapshot@4.0.1 cypress@13.6.4 @shelex/cypress-allure-plugin'
            }
        }
        stage('Run Tests in Parallel') {
            steps {
                script {
                    // Echo the environment variables to verify they are being set correctly
                    echo "CYPRESS_RECORD_KEY='${env.CYPRESS_RECORD_KEY}'"
                    echo "CYPRESS_PROJECT_ID='${env.CYPRESS_PROJECT_ID}'"
                    
                    def cypressEnv = [
                        'CYPRESS_RECORD_KEY=' + env.CYPRESS_RECORD_KEY,
                        'CYPRESS_PROJECT_ID=' + env.CYPRESS_PROJECT_ID
                        ]

                    def parallelism = 3
                    def instances = [:]
                    def ciBuildId = UUID.randomUUID().toString()

                    for (int i = 1; i <= parallelism; i++) {
                        def instance = i
                        instances["Cypress Instance ${instance}"] = {
                            withEnv(cypressEnv + ["CYPRESS_CI_BUILD_ID=${ciBuildId}"]) {
                                bat "npx cypress run --record --parallel --group ${instance} --ci-build-id ${ciBuildId}"
                            }
                        }
                    }
                    parallel instances
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: '**', followSymlinks: false
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
