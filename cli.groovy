def buildCli() {
  def dockerImage = docker.build registry + "/cli:latest"
  docker.withRegistry('', registryCredentials) {
    dockerImage.push()
  }
}

def deployCli() {
    
}