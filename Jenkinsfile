pipeline {
    agent any
    
    stages {
        stage("Build") {
            steps {
                dir("backend") {
                    sh "yarn install"
                    sh "npx prisma generate"
                    sh "npx prisma db push"
                    sh "yarn build"
                }
            }
        }
        stage("Deploy") {
            steps {
                dir("backend") {
                    sh "pm2 restart aes512 --cron-restart='5 3 * * *'"
                }
            }
        }
    }
}