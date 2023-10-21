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
- [Devops](#devops)
    - [Containerization](#containerization)

## Tech Stack
- The application is developed with `Django`, a Python-based open-source web framework that promotes rapid development and clean, pragmatic design following the model-view-controller (MVC) architectural 
- For local development, `MySQL` is our chosen database, recognized for its reliability and robustness.
- `Bootstrap` ensures our platform is responsive and mobile-friendly, adapting seamlessly to different devices. The front-end is open to further development with `React` in the future.
- The system is containerized using `Docker`, bundling the app, its environment, and dependencies for consistent deployment.
- We leverage `AWS` for cloud deployment, utilizing services like `RDS, S3, and EC2` for database management, file storage, and scalability respectively-.
- `Serverless` architecture is adopted in AWS for reduced operational overhead, automatic scaling, and cost efficiency.
- CI/CD is implemented using `Github Actions` for automated code integration and deployment. `AWS CodeBuild and AWS CodePipeline` are used for continuous delivery.
- `AWS CloudWatch and X-Ray` provide real-time monitoring, logging, and insights into application behavior.
- For further details on the tech stack, please refer to the [documentation](https://docs.google.com/document/d/1Z3PiI8lw9dGJV0mQvHsQy8WGt-saNliRlJ6uvrEQygQ/edit)

## Current Features

### User Authentication:
- **User Registration**: Users can create a new account providing their email and password.
- **User Login**: Users can securely log into their account using their credentials.
- **Password Hashing**: All passwords are securely hashed for storage, ensuring user privacy and security.

### Baby Profiles:
- **Creation**: Users can create detailed profiles for their babies, including name, gender, date of birth, weight, height, parent's details and pictures.
- **Update & Deletion**: Users have the flexibility to update or delete the baby profiles.

### Milestones, Activities, and Nutrition Guides: 
- **Milestones**: Users can log their baby's milestones, which will include the date and the description. The milestones will be displayed on the baby's profile.
- **Activities**: Users can access activities that are appropriate for their baby's age and milestone expectancy. The activities will be displayed on the baby's profile.
- **Nutrition Guides**: Users can access nutrition guides that are appropriate for their baby's age. The nutrition guides will be displayed on the baby's profile.
`Most of milestone logic have beeen integrated with very scanty data, Code adjustment might come soon to handle a largely populated milestone database`

### Forum:
- **Categories**: Default categories will be provided to create threads and view posts. These would include general, health, nutrition, and development etc.
- **Threads**: Users can create threads in the forum, which will be displayed in the appropriate category. Threads will include a title and description.
- **Posts**: Users can create posts in the forum, which will be displayed in the appropriate thread. Posts will include a title and description.

### Marketplace:
- **Items**: Users can create items to sell in the marketplace. Items will include a title, description, price, image and contact information.
- **Categories**: Default categories will be provided to create items and view items. These would include general, health, nutrition, and development etc.

### Chatbot: 

## Setup :
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

## Contribute
We enthusiastically welcome contributions. If you encounter any bugs or have a feature suggestion, please open an issue.
Also, feel free to fork the repository and submit a pull request.
Before submitting a pull request, ensure that your changes do not break the application.
Run the tests locally and check that all are passing.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details. 
This README is subject to updates as the application evolves, so be sure to check back for the latest information.

## Authors
Chesachi victor kalu
Mayen kalu
