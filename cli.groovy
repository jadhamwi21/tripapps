def buildCliImage() {
  def dockerImage = docker.build registry + "/cli:latest"
  return dockerImage
}

def pushCliImage(dockerImage) {
  docker.withRegistry('', registryCredentials) {
    dockerImage.push()
  }
}

return this