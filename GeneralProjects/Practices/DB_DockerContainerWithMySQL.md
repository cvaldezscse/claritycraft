<p>
Practice is focused in creating a MySQL container to be compatible with MySQL workbench (which is developed for 5.1, 5.7 and 8.0)
</p>
### Step 1: Pull the MySQL Docker Image

Pull the official MySQL Docker image from Docker Hub:
```
docker pull mysql:8.0
```

### Step 2: Create a Docker Network

Create a Docker network:
```
docker network create mysql-network
```

### Step 3: Run MySQL Container on a Different Port

Run a MySQL container using a different port (e.g., `3307`). Set the `MYSQL_ROOT_PASSWORD` and other variables accordingly:

```
docker run -d --name mysql-container \ --network mysql-network \ -p 3307:3306 \ -e MYSQL_ROOT_PASSWORD=your_password \ -e MYSQL_DATABASE=your_database \ -e MYSQL_USER=your_user \ -e MYSQL_PASSWORD=your_user_password \ mysql:8.0
```

Replace `your_password`, `your_database`, `your_user`, and `your_user_password` with your preferred values.

Example:
```
docker run -d --name mysql-container --network mysql-network -p 3312:3306 -e MYSQL_ROOT_PASSWORD=COMPLEXPASSWORD_ROOT -e MYSQL_DATABASE=development_projects -e MYSQL_USER=cvaldezdev -e MYSQL_PASSWORD=Carlos123456 mysql:8.0
```

### Step 4: Verify MySQL Container is Running

Check if the MySQL container is running:
```
docker ps
```

### Step 6: Connect MySQL Workbench to Container on Different Port

Open MySQL Workbench, and create a new connection:

- Connection Method: Standard TCP/IP over SSH
- SSH Hostname: `localhost`
- SSH Username: `root`
- SSH Password: `your_password` (from Step 3)
- MySQL Hostname: `localhost`
- MySQL Server Port: `3307` (the exposed port, not the container's internal port)
- Username: `your_user` (from Step 3)
- Password: `your_user_password` (from Step 3)

Test the connection, and if successful, save the connection.


### Step 7: Access the MySQL Database on Different Port

Now you can access the MySQL database from MySQL Workbench using the specified port (`3307` in this example).

Remember to use a port that is not already in use and is appropriate for your development needs.

These steps should help set up MySQL in a Docker container on a port other than the default `3306` and connect to it using MySQL Workbench.