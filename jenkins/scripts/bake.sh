#!/usr/bin/env bash

# Exit upon encountering an error
set -euo pipefail

# Set the base route
ROOT_DIR=$(pwd)

# Run the script to set up the env variables and other custom functions
source $ROOT_DIR/jenkins/scripts/utils.sh

activateServiceAccount() {
  # Authenticate to GCP using the Service account Key
  info "Activate Google Service Account"
  gcloud auth activate-service-account --key-file $GCLOUD_SERVICE_KEY
  gcloud --quiet config set project ${PROJECT_ID}
}

# checkout
buildTagAndPushDockerImage() {
  IMAGE_TAG=$GIT_COMMIT
  IMAGE_NAME=$DOCKER_REGISTRY/$PROJECT_ID/$PROJECT_NAME
  export TAGGED_IMAGE=$IMAGE_NAME:$IMAGE_TAG
  

  info "Build docker image for sendit application"
  docker build -t $IMAGE_NAME -f docker/release/Dockerfile .
  docker tag $IMAGE_NAME $TAGGED_IMAGE

  info "Auth gcloud to use docker"
  gcloud auth configure-docker

  info "Push $TAGGED_IMAGE to $DOCKER_REGISTRY container registry"
  docker push $TAGGED_IMAGE
}

pushManifestFile() {
  cat > jenkins/manifest.yaml <<EOF
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: sendit-ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: sendit-ip
spec:
  rules:
  - host: sendit-spinnaker.cf
    http:
      paths:
      - backend:
          serviceName: sendit-service
          servicePort: 8080

---

apiVersion: v1
kind: Service
metadata:
  name: sendit-service
spec:
  ports:
    - port: 8080
      targetPort: 8080
  selector:
    app: sendit
  type: NodePort

---
        
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sendit-deployment
  labels:
    app: sendit
spec:
  replicas: 3
  selector:
    matchLabels:
      app: sendit
  template:
    metadata:
      labels:
        app: sendit
    spec:
      containers:
        - name: sendit
          image: $TAGGED_IMAGE
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 8080


EOF
  export BUCKET=$PROJECT_ID-spinnaker-config
  gsutil cp jenkins/manifest.yaml gs://${BUCKET}
}

main() {
  activateServiceAccount
  buildTagAndPushDockerImage
  pushManifestFile
}

main
