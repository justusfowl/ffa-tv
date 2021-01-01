pipeline {
  
  agent any
    
  stages {
    stage('Docker build') {
        steps{
            sh "docker pull myffa/ffa-tv:latest"
        }
    }
    stage('Deploy TV App') {
      steps{
            sh "docker ps -f name=ffatvapp -q | xargs --no-run-if-empty docker container stop"
            sh "docker container ls -a -fname=ffatvapp -q | xargs -r docker container rm"
            sh "docker run -p 3000:3000 --name=ffatvapp -e VIRTUAL_HOST=tv.facharztpraxis-fuer-allgemeinmedizin.de -e VIRTUAL_PORT=3000 -e LETSENCRYPT_HOST=tv.facharztpraxis-fuer-allgemeinmedizin.de -e LETSENCRYPT_EMAIL=it@facharztpraxis-fuer-allgemeinmedizin.de --network=ffa-app-network --restart=unless-stopped -d myffa/ffa-tv:latest"
      }
    }
  }
}