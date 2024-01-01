# Bobo

Bobo is a comprehensive web platform designed for parents to monitor and track the growth and development of their babies.
With a range of features, from logging milestones to accessing research-based expert advice and nutrition guides specific to a baby's age, Bobo is an essential tool for new parents.

Additionally, Bobo provides an interactive community platform with a forum and marketplace, where parents can discuss various topics and exchange baby items. For quick information and guidance, we also offer an advanced AI chatbot.

For a comprehensive documentation of the project, please refer to the google docs [link](https://drive.google.com/drive/folders/1AIiVTPoAHUFwb8M4En24w4JnKT1XB9iV?ths=true) 

## Table of Contents
- [Tech Stack](#tech-stack)
- [Current Features](#current-features)
- [Setup](#setup)
- [Testing](#testing)
- [Containerization with Docker](#containerization-with-docker)
- [Continous Integration](#continous-integration)
- [Contribute](#contribute)
- [License](#license)
- [Authors](#authors)

## Tech Stack
- The application is developed with `Django`, a Python-based open-source web framework that promotes rapid development and clean, pragmatic design following the model-view-controller (MVC) architectural 
- For local development, `MySQL` is our chosen database, recognized for its reliability and robustness.
- `Bootstrap` ensures our platform is responsive and mobile-friendly, adapting seamlessly to different devices. The front-end is open to further development with `React` in the future.
- The system is containerized using `Docker`, bundling the app, its environment, and dependencies for consistent deployment.
- We leverage `AWS` for cloud deployment, utilizing services like `RDS, S3, and EC2` for database management, file storage, and scalability.
- `Serverless` architecture is adopted in AWS for reduced operational overhead, automatic scaling, and cost efficiency.
- CI/CD is implemented using `Github Actions` for automated code integration and deployment. `AWS CodeBuild and AWS CodePipeline` are used for continuous delivery.
- `AWS CloudWatch and X-Ray` provide real-time monitoring, logging, and insights into application behavior.
- For further details on the tech stack, please refer to the [documentation](https://drive.google.com/drive/folders/1AIiVTPoAHUFwb8M4En24w4JnKT1XB9iV?ths=true)

## Current Features

### -User Authentication:
- **User Registration**: Users can create a new account providing their email and password.
- **User Login**: Users can securely log into their account using their credentials.
- **Password Hashing**: All passwords are securely hashed for storage, ensuring user privacy and security.

### -Baby Profiles:
- **Creation**: Users can create detailed profiles for their babies, including name, gender, date of birth, weight, height, parent's details and pictures.
- **Update & Deletion**: Users have the flexibility to update or delete the baby profiles.

### -Milestones, Activities, and Nutrition Guides: 
- **Milestones**: Users can log their baby's milestones, which will include the date and the description. The milestones will be displayed on the baby's profile.
- **Activities**: Users can access activities that are appropriate for their baby's age and milestone expectancy. The activities will be displayed on the baby's profile.
- **Nutrition Guides**: Users can access nutrition guides that are appropriate for their baby's age. The nutrition guides will be displayed on the baby's profile.
`Most of milestone logic have beeen integrated with very scanty data, Code adjustment might come soon to handle a largely populated milestone database`

### -Forum:
- **Categories**: Default categories will be provided to create threads and view posts. These would include general, health, nutrition, and development etc.
- **Threads**: Users can create threads in the forum, which will be displayed in the appropriate category. Threads will include a title and description.
- **Posts**: Users can create posts in the forum, which will be displayed in the appropriate thread. Posts will include a title and description.

### -Marketplace:
- **Items**: Users can create items to sell in the marketplace. Items will include a title, description, price, image and contact information.
- **Categories**: Default categories will be provided to create items and view items. These would include general, health, nutrition, and development etc.

### -Chatbot: 

## Setup
To set up the project on your local machine, follow the steps below:

1. Clone the repository to your machine
`git clone https://github.com/chesahkalu/Bobo.git`

2. Navigate to the project directory:
`cd Bobo`

3. Ensure you have Python 3.8+ and pip installed. Then, set up a virtual environment and install the dependencies:
`pip3 install -r requirements.txt`

4. Set up the database
The application uses MySQL. Ensure you have it installed and running. Update the DATABASES configuration in Bobo/settings.py with your MySQL credentials.
Run the following commands to integrate your database 
`python3 manage.py makemigrations`
`python3 manage.py migrate`

5. Run the application
`python3 manage.py runserver`

## Testing
We utilize Django's testing framework for ensuring our application's robustness. 
Our test cases for now, cover user authentication, baby model creation, and various view functionalities associated with baby profiles.
You can test the application by creating a new user, logging in, and navigating to the home page. More comprehensive tests will be added as more features are implemented.

To run the tests locally, use the following command:
`python3 manage.py test 'app'`

## Containerization with Docker

Containerization, powered by Docker🐳 , provides an isolated and consistent environment for our Bobo application, ensuring it runs uniformly from a developer's local environment to a production server. This section outlines the steps to set up, build, and run the Bobo application using Docker and Docker Compose.

### 🌟 Why Docker?

- **Consistency**: Say goodbye to "it works on my machine" issues.
- **Scalability**: Easily scale up services as needed.
- **Isolation**: Your application and its environment are bundled together.

### 🛠️ Setting Up with Local MySQL Server

If you're running a MySQL server locally and wish the containerized Bobo app to connect to it, update the `settings.py` in the Django application. Set the `DATABASES` configuration's `HOST` field to `host.docker.internal`. This ensures seamless communication between the containerized app and services on the host machine.

### 🔧 Building and Running without Docker Compose

1. **Building the Image**: Use the Docker CLI to build an image from the Dockerfile.
    ```bash
    docker build -t bobo_app:v1 .
    ```
2. **View Built Images**: Confirm the image was created.
    ```bash
    docker images
    ```
3. **Run a Container**: Spin up a container instance from the built image.
    ```bash
    docker run -d -p 8000:8000 bobo_app:v1
    ```
4. **Check Containers**: View all running containers.
    ```bash
    docker ps
    ```
5. **Stopping a Container**: When done, you can stop the container.
    ```bash
    docker stop [CONTAINER_ID]
    ```

### 🔄 Using Docker Compose

Docker Compose simplifies the process of managing multi-container applications. For the Bobo app, it's the magic wand that builds and runs both the Django application and its MySQL database effortlessly.

- **Start Services**: This builds (if needed) and runs the services.
    ```bash
    docker-compose up
    ```
- **Stop Services**: When done, use the following command to stop the services.
    ```bash
    docker-compose down
    ```

### 🗃️ Configuring MySQL in Docker

The initial setup of our MySQL container is steered by environment variables in `docker-compose.yml`. Once you spin up the containers, ensure that the `settings.py` in your Django app is pointing to this MySQL instance by setting the database `HOST` to `db`. To run migrations inside the container:
```bash
docker-compose exec web python manage.py migrate
```

## Continous Integration

Continuous Integration (CI) is a foundational pillar in DevOps, emphasizing the regular integration of code into a shared repository. Each integration can then be automatically tested and verified, ensuring that new changes don't introduce bugs. For our Bobo application, CI ensures that our codebase remains reliable, efficient, and ready for deployment at all times.

### -Why GitHub Actions?

GitHub Actions is a CI/CD tool provided directly within GitHub, enabling developers to automate tasks right within their repositories. With GitHub Actions, Bobo's codebase undergoes automated processes every time there's a change, ensuring quality and consistency.

### -Setting Up GitHub Actions

1. **Navigate to Your Repository**: Access the "Actions" tab within your GitHub repository.
2. **Workflow Creation**: Choose a predefined workflow or set up a custom workflow.
3. **YAML File Configuration**: Define your workflow using the provided YAML editor. This file dictates the actions, triggers, and jobs.
4. **Commit**: Save and commit your YAML file to the repository.
5. **Monitor**: Post-commit, GitHub Actions will execute the workflow. Monitor the progress under the "Actions" tab.

### -Bobo's CI Workflow

The `.yml` file for Bobo details our CI steps:

- **Triggers**: Activates on `push` and `pull_request` events to the master branch.
- **Jobs**: Runs on the latest Ubuntu machine.
- **Steps**:
  1. **Code Checkout**: Fetches the latest code.
  2. **Python Setup**: Initiates Python 3.9.
  3. **Dependencies**: Installs requirements via pip.
  4. **Testing**: Executes Django's testing suite.
  5. **Docker Integration**: Builds a Docker image and runs tests inside the Docker container.



## Contribute

We're on the lookout for enthusiastic contributors like you! 🌟

### -Found a Bug or Have a Feature Idea?
- Open an issue and tell us all about it.

### -Ready to Code?
- Fork the repo, make your updates, and submit a pull request.
- Ensure all tests pass before submitting by running `python3 manage.py test`.

### -Frontend Contributors Needed!
- If you're skilled in modern frontend frameworks, we need you to bring our API to life with a stunning UI.
- Check out the [API docs](https://docs.google.com/document/d/1kkgUIu-6aiNDWcKMP4yipJjBpSj5-0eSxkqD8QwJMjs/edit) and let your creativity flow!


## License
This project is licensed under the Apache License 2.0. For more information, please refer to the [LICENSE](LICENSE) file.
This README is subject to updates as the application evolves, so be sure to check back for the latest information.

## Authors
[Chesachi Kalu](https://chesahkalu.github.io/my_resume/)

[Mayen kalu](https://www.linkedin.com/in/mayen-kalu/)


## <h3 align="center"> © Bobo 2023. All rights reserved. <h3/>