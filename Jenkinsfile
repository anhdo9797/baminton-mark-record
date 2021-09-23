pipeline {
    // agent {
    //     docker {
    //         image 'node:6-alpine' 
    //         args '-p 3000:3000' 
    //     }
    // }
    agent { label 'web' }

    triggers { upstream(upstreamProjects: 'release') }

    environment {
        //login firebase: sudo firebase login:ci --no-localhost --debug
        // FIREBASE_TOKEN = "1//0emvlfUV5ufspCgYIARAAGA4SNwF-L9IrWYFNmDhsOqz8JO1EkolzZUjPi-Dhd0SKm4FyI-QKzn7bL3HJ6qHOORRmEun6iNFEOio"
    }
    
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