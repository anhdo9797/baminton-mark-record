pipeline {
    agent {
        docker {
            image 'node:12-alpine'
        }
    }
    // agent { label 'web' } 

    // environment {
    //     //login firebase: sudo firebase login:ci --no-localhost --debug
    //     // FIREBASE_TOKEN = "1//0emvlfUV5ufspCgYIARAAGA4SNwF-L9IrWYFNmDhsOqz8JO1EkolzZUjPi-Dhd0SKm4FyI-QKzn7bL3HJ6qHOORRmEun6iNFEOio"
    // }
    
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy'){
            steps {
                sh "firebase deploy --token ${env.FIREBASE_TOKEN}"
            }
        }
    }
    post {
        always {
            echo 'One way or another, I have finished'
            deleteDir() /* clean up our workspace */
        }
        success {
            echo 'Success'
        }   
    }
}