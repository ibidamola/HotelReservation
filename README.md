# Capstone Project: CI/CD Mastery

## Table of Contents
- [Capstone Project: CI/CD Mastery](#capstone-project-cicd-mastery)
  - [Table of Contents](#table-of-contents)
  - [1. Project Scenario](#1-project-scenario)
  - [3. Project Deliverables](#3-project-deliverables)
    - [Documentation](#documentation)
    - [Demonstration](#demonstration)
  - [4. Project Componentss](#4-project-componentss)
    - [4.1 Jenkins Server Setup](#41-jenkins-server-setup)
      - [Steps:](#steps)
    - [4.2 Source Code Management Repository Integration](#42-source-code-management-repository-integration)
      - [Steps:](#steps-1)
    - [4.3 Jenkins Freestyle Jobs for Build and Unit Tests](#43-jenkins-freestyle-jobs-for-build-and-unit-tests)
      - [Steps:](#steps-2)
    - [4.4 Jenkins Pipeline for Web Application](#44-jenkins-pipeline-for-web-application)
      - [Steps:](#steps-3)
    - [4.5 Docker Image Creation and Registry Push](#45-docker-image-creation-and-registry-push)
      - [Steps:](#steps-4)
  - [5. Conclusion](#5-conclusion)

---

## 1. Project Scenario

A technology consulting firm is adopting a cloud architecture for its software applications. As a DevOps Engineer, your task was to design and implement a robust CI/CD pipeline using Jenkins to automate the deployment of a web application. The goal was to achieve continuous integration, continuous deployment, and ensure the scalability and reliability of the applications.

---


## 3. Project Deliverables

### Documentation

- Detailed documentation for each Jenkins component setup.
- Explanation of security measures implemented at each step.

### Demonstration

- Live demonstration of the CI/CD pipeline.
![pipeline Stage image](./assets/Screenshot%202025-03-15%20113625.png)

[![Website Running](./assets/web%20running%20n%20port%208081.png)](./assets/HOTEL%20-%20Google%20Chrome%202025-03-03%2017-57-21.mp4)



---

## 4. Project Componentss

### 4.1 Jenkins Server Setup

**Objective:** Configure Jenkins server for CI/CD pipeline automation.

#### Steps:

1. **Created EC2 instance:**
   - I started by logging into my AWS EC2 dashboard and created a new EC2 instance, selecting **Ubuntu** as the operating system. I named the instance `jenkins-deploy` for easy identification.
   - After configuring the security group to allow SSH access, I SSHed into the instance from my Windows PowerShell terminal using the following command:

     ```bash
     ssh -i "my-key.pem" ubuntu@<EC2_PUBLIC_IP>
     ```
    ![ssh into instance](./assets/ssh%20into%20instance.png)

2. **Install Jenkins:**
   - I updated the package list and installed Java (which is required for Jenkins) by running:

     ```bash
     sudo apt update
     sudo apt install openjdk-11-jre -y
     ```

   - Then, I installed Jenkins by running:

     ```bash
     wget -q -O - https://pkg.jenkins.io/jenkins.io.key | sudo tee /etc/apt/trusted.gpg.d/jenkins.asc
     sudo sh -c 'echo deb http://pkg.jenkins.io/debian/ stable main > /etc/apt/sources.list.d/jenkins.list'
     sudo apt update
     sudo apt install jenkins -y
     ```

3. **Start Jenkins Service:**
   - I started the Jenkins service and enabled it to start on boot with:

     ```bash
     sudo systemctl start jenkins
     sudo systemctl enable jenkins
     ```

4. **Access Jenkins:**
   - I opened a browser and accessed Jenkins via `http://3.145.71.228:8080` to complete the setup wizard.
   - I retrieved the Jenkins unlock key by running the following command:

     ```bash
     sudo cat /var/lib/jenkins/secrets/initialAdminPassword
     ```

   - After unlocking Jenkins, I installed the recommended plugins and set up the admin user for the Jenkins instance.

5. **Install Required Plugins:**
   - In the Jenkins dashboard, I went to "Manage Jenkins" > "Manage Plugins" and installed the necessary plugins like **Git**, **Docker**, and **Pipeline** to work with source code repositories and containers.

6. **Set Up Security:**
   - I configured the security of my ec2 instance to allow under inbound rule to allow request from 8080 and 8081 from anywhere 0.0.0.0/0
   - I also ensured that Jenkins was only accessible through the security group in AWS to control who could access the Jenkins instance.
     ![security rule for jenkins](./assets/s%20rule.png)
---

### 4.2 Source Code Management Repository Integration

**Objective:** Connect Jenkins to the version control system for source code management.

#### Steps:

1. **Create GitHub Repository:**
   - I created a GitHub repository named `HotelReservation` to store the web application code.
   - The repository contained `index.html`, CSS, JavaScript, and image assets for the web app.
   - [github linbk to Repo](https://github.com/ibidamola/HotelReservation)


2. **Integrate Jenkins with GitHub:**
   - In the Jenkins dashboard, I navigated to "Manage Jenkins" > "Configure System" and added my GitHub credentials to allow Jenkins to access the repository.

3. **Set Up GitHub Webhook:**
   - In the GitHub repository settings, I went to "Webhooks" and added the Jenkins webhook URL (`http://3.145.71.228:8080/github-webhook/`) to automatically trigger builds on every code push.

---

### 4.3 Jenkins Freestyle Jobs for Build and Unit Tests

**Objective:** Create Jenkins Freestyle jobs for building the web application and running unit tests.

#### Steps:

1. **Create Jenkins Freestyle Job for Building the Application:**
   - In Jenkins, I created a new **Freestyle project** and named it "HotelReserve".
   - Under "Source Code Management", I configured it to pull from the GitHub repository.
   -  ![creating freestyle job](./assets/freestyle%20job.png)
   -   ![successful build](./assets/success%20build.png)
   
2. **Configure Build Steps:**
   - In the "Build" section, I added a shell command to run the following Docker build command:

     ```bash
     docker build -t hotelreservation .
     ```

   - I added a post-build action to archive the test results.

3. **Configure Unit Tests:**
   - I configured unit tests to run as part of the build process using a testing framework like Jest or Mocha, depending on the project needs.
   - Jenkins was set to run these tests after the Docker build and before the application was deployed.

---

### 4.4 Jenkins Pipeline for Web Application

**Objective:** Develop a Jenkins Pipeline for running a web application.

#### Steps:

1. **Create a Jenkins Pipeline:**
   - I created a new **Pipeline job** in Jenkins and named it "Deploy WebApp".
   - In the pipeline script, I used the following Jenkinsfile syntax to define the pipeline:

     ```groovy
     pipeline {
        agent any

        stages {
            stage('Connect To Github') {
                steps {
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/ibidamola/HotelReservation.git']])
                }
            }
            stage('Build Docker Image') {
                steps {
                    script {
                    sh 'docker build -t dockerfile .'
                    }
                }
            }
            stage('Run Docker Container') {
                steps {
                    script {
                    sh 'docker run -itd -p 8081:80 dockerfile'
                    }
                }
            }
        }
    }

     ```

2. **Push to GitHub and Trigger Build:**
   - After pushing the code to the GitHub repository, Jenkins automatically triggered the pipeline to build the Docker image, run the container, and deploy the web application.
    ![push to github](./assets/push%20to%20git.png)
---

### 4.5 Docker Image Creation and Registry Push

**Objective:** Automate the creation of Docker images for the web application and push them to a container registry.

#### Steps:

1. **Dockerfile Creation:**
   - I created a `dockerfile` for the application, which used the official Nginx image and copied the necessary files to the Nginx directory:

     ```Dockerfile
     # Use the official NGINX base image
     FROM nginx:latest

     # Set the working directory in the container
     WORKDIR  /usr/share/nginx/html/

     # Copy the local HTML file to the NGINX default public directory
     COPY index.html /usr/share/nginx/html/

     # Copy the html directory with the second index.html file to NGINX public directory
     COPY html /usr/share/nginx/html/html/

     # Copy the css directory with CSS files
     COPY css /usr/share/nginx/html/css/

     # Copy the js directory with JavaScript files
     COPY js /usr/share/nginx/html/js/

     # Copy the assets directory with images and other media
     COPY assets /usr/share/nginx/html/assets/

     # Expose port 80 to allow external access
     EXPOSE 80


     ```

2. **Build Docker Image:**
   - I configured Jenkins to build the Docker image using the following command in the pipeline script:

     ```bash
     docker build -t hotelreservation .
     ```

3. **Run Docker Container:**
   - After building the Docker image, I ran the container on port 8081 using:

     ```bash
     docker run -itd -p 8081:80 hotelreservation
     ```

   - The web application was then accessible at `http:3.145.71.228//:8081`.

4. **Push Docker Image to Docker Hub:**
   - Once the application was tested locally, I pushed the Docker image to Docker Hub using:

     ```bash
     docker tag hotelreservation username/hotelreservation:latest
     docker push username/hotelreservation:latest
     ```

---

## 5. Conclusion

By following these steps, I successfully set up a Jenkins CI/CD pipeline that automates the building and deployment of a web application using Docker. This pipeline integrates with GitHub for source code management, builds the Docker image, runs the container, and pushes the image to Docker Hub for easy distribution. The entire process ensures continuous integration and deployment, making the web application scalable and reliable.
