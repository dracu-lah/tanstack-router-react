#!/bin/bash

Configuration
SERVER="161.97.128.198"
USER="Administrator"
PASSWORD="XrB671@P)9A0Qu93"
REMOTE_PATH="C:\Apache24\htdocs"
DIST_FOLDER="_test"
BUILD_DIR="./dist"
LOG_FILE="deployment.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Running build for latest changes..."
npm run build || {
  log "ERROR: Build failed"
  exit 1
}

log "Preparing remote directory..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$USER@$SERVER" "powershell -Command \"\
if (!(Test-Path '$REMOTE_PATH\\$DIST_FOLDER')) { \
    New-Item -ItemType Directory -Path '$REMOTE_PATH\\$DIST_FOLDER' -Force; \
} \
Remove-Item '$REMOTE_PATH\\$DIST_FOLDER\\*' -Recurse -Force -ErrorAction SilentlyContinue\""

log "Deploying files..."
sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no -r "$BUILD_DIR"/. "$USER@$SERVER:$REMOTE_PATH\\$DIST_FOLDER\\"

if [ $? -eq 0 ]; then
  log "Deployment successful"
  sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$USER@$SERVER" "powershell -Command \"\
    Get-ChildItem '$REMOTE_PATH\\$DIST_FOLDER' -Force -Recurse | Select-Object FullName\"" >>"$LOG_FILE"
else
  log "ERROR: Deployment failed"
  exit 1
fi

log "Deployment completed"
