def buildCliImage() {
  def dockerImage = docker.build registry + "/cli:latest"
}

def pushCliImage() {
  docker.withRegistry('', registryCredentials) {
    dockerImage.push()
  }
}

return this