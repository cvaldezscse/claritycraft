### Step 1: Pull the MongoDB Docker Image

Pull the official MongoDB Docker image from Docker Hub:
```
docker pull mongo:latest
```

### Step 2: Create a Docker Network

Create a Docker network:
```
docker network create mongo-network
```

### Step 3: Run MongoDB Container on a Different Port
Run a MongoDB container using a different port (e.g., `27018`). Set the `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` variables accordingly:
```
docker run -d --name mongo-container --network mongo-network -p 27018:27017 -e MONGO_INITDB_ROOT_USERNAME=your_user -e MONGO_INITDB_ROOT_PASSWORD=your_password mongo:latest
```

Replace `your_user` and `your_password` with your preferred values.

Example:
```
docker run -d --name mongo-container --network mongo-network -p 27018:27017 -e MONGO_INITDB_ROOT_USERNAME=cvaldezdev -e MONGO_INITDB_ROOT_PASSWORD=Carlos123456 mongo:latest
```

### Step 4: Verify MongoDB Container is Running

Check if the MongoDB container is running:
```
docker ps
```

### Step 5: Install MongoDB Compass

Install MongoDB Compass on your local machine 

### Step 6: Connect MongoDB Compass to MongoDB Container on Different Port

Open MongoDB Compass and connect to the MongoDB container:

- MongoDB Hostname: `localhost`
- MongoDB Port: `27018` (the exposed port, not the container's internal port)
- Authentication Method: SCRAM-SHA-256
- Username: `your_user` (from Step 3)
- Password: `your_password` (from Step 3)

Test the connection, and if successful, save the connection.


### Step 7: Access the MongoDB Database on Different Port

Now you can access the MongoDB database from MongoDB Compass using the specified port (`27018` in this example).

This setup allows you to run a MongoDB database in a Docker container on a port other than the default `27017` and connect to it using MongoDB Compass. Remember to use a port that is not already in use and is appropriate for your development needs.