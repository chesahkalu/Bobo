# Use the slim variant of Python 3.9 as the base image, It is a good practice to keep your local development environment python version same with the docker image python version.
FROM python:3.9-slim

# Set environment variables
# Prevents Python from writing pyc files to disc (equivalent to python -B option)
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr (Ensures that our logs and print statements are displayed in the console immediately, useful for debugging)
ENV PYTHONUNBUFFERED 1

# Sets the working directory inside the container. All subsequent commands will be run from this directory.
WORKDIR /app

# Copy the current directory contents(including requirements.txt) into the container at /app
COPY . /app

# Upgrade pip
RUN pip install --upgrade pip

# Install system-level dependencies to ensure availability of certain libraries and headers for mysqlclient requirement instalation
RUN apt-get update && apt-get install -y build-essential default-libmysqlclient-dev

# Install Python dependencies from requirements.txt. The --no-cache-dir flag keeps the container lean by preventing the caching of the index locally.
RUN pip install -r requirements.txt

# Install system-level dependencies (if any)
#RUN apt-get update && apt-get install -y some-package-needed

# Create a non-root user and switch to it (if you don't do this, any files you create will be owned by root, which isn't a good idea)
#RUN useradd --create-home appuser
#USER appuser


