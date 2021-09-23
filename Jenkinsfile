pipeline {
    agent any

    environment {
        //login firebase: sudo firebase login:ci --no-localhost --debug
        FIREBASE_TOKEN = "1//0emvlfUV5ufspCgYIARAAGA4SNwF-L9IrWYFNmDhsOqz8JO1EkolzZUjPi-Dhd0SKm4FyI-QKzn7bL3HJ6qHOORRmEun6iNFEOio"
    }
    //follow syntax: https://www.jenkins.io/doc/book/pipeline/docker/
    stages {
        stage('Install dependencies and build') {
            agent {
                docker { image 'node:12-alpine' }
            }
            steps {
                echo 'install dependencies'
                // sh 'npm install'

                echo 'build bundel'
                // sh 'npm build'
            }
        }
        stage('Deploy to server') {
            agent {
                docker { image 'w9jds/firebase-action@master' }
            }
            steps {
                echo 'Deploy to firebase'
                sh 'deploy --only hosting'
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

// build not docker
// pipeline {

//     agent { label 'master' } 

//     environment {
//         //login firebase: sudo firebase login:ci --no-localhost --debug
//         FIREBASE_TOKEN = "1//0emvlfUV5ufspCgYIARAAGA4SNwF-L9IrWYFNmDhsOqz8JO1EkolzZUjPi-Dhd0SKm4FyI-QKzn7bL3HJ6qHOORRmEun6iNFEOio"
//     }
    
//     stages {
//         stage('Build') { 
//             steps {
//                 sh 'npm install'
//                 sh 'npm run build'
//             }
//         }
//         stage('Deploy'){
//             steps {
//                 sh "firebase deploy --token ${env.FIREBASE_TOKEN}"
//             }
//         }
//     }
//     post {
//         always {
//             echo 'One way or another, I have finished'
//             deleteDir() /* clean up our workspace */
//         }
//         success {
//             echo 'Success'
//         }   
//     }
// }