
Docker desktop
Docker CLI

docker hub: server of images for docker


`Dockerfile` -> Docker Image -> Becomes into a Docker Container

```
$ docker -v
```


```
# Base Web Server Dockerfile
#FROM imagen:version
FROM nginx:latest

# Copy template for publishing to the nginx web server
# /usr/share/nginx/html
COPY /sitio /usr/share/nginx/html
```

## My First Docker Image
```
# It creates a basic image, downloading the image from dockerhub
$ docker build .
```

```
$ docker images

# If we run that command without parameters it will show us like this way (not recommended because the lack of identification):

REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
<none>       <none>    be39822cf4e2   2 hours ago   192MB
```


### Image deletion (with force)
```
# docker remove image
# docker rmi -f IMAGE_ID
$ docker rmi -f be39822cf4e2

# Output: Deleted: sha256:be39822cf4e25ccb7771c644c8cb2f4c4d38079f812b67eac739dcf445c981ec
```

#### Image build from a docker file with a Tag
```
# We use the -t prefix and add the name and version
$ docker build -t mywebsite:latest .
$ docker images

Output: 
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
linksite     latest    be39822cf4e2   2 hours ago   192MB

```

### Run a docker image into a container
```
# -it is interactive for getting what is happening in the terminal
# --rm removes previous same versions of the container
# -d It will be ready to be called whenever we want
# -p x:y Port in which we are going to talk to and once it will be the beginning to the app interaction
# --name STRING name to locate the container
# IMAGE
# For instance
$ docker run -it --rm -d -p 8080:80 --name OURWEBSITE linksite
#It will return a SHA string 
```

### Look for already running containers
```
$ docker ps
Output: 
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                  NAMES
26f5573e267b   linksite   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:8080->80/tcp   OURWEBSITE
```



## Manage Our Docker Images
```
# Tagging a docker image
$ docker build -t linksite2:1.5 .

$ docker images
Output:
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
linksite2    1.5       be39822cf4e2   3 hours ago   192MB
linksite     latest    be39822cf4e2   3 hours ago   192MB
```


### Images search
```
# With image name
$ docker images linksite

# With image tags
$ docker images --filter=reference='*:1.5'

Output: 
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
linksite2    1.5       be39822cf4e2   3 hours ago   192MB
```


### Images showing with the complete SHA-256 ID
```
$ docker images --no-trunc

Output:
REPOSITORY   TAG       IMAGE ID                                                                  CREATED       SIZE
linksite2    1.5       sha256:be39822cf4e25ccb7771c644c8cb2f4c4d38079f812b67eac739dcf445c981ec   3 hours ago   192MB
linksite     latest    sha256:be39822cf4e25ccb7771c644c8cb2f4c4d38079f812b67eac739dcf445c981ec   3 hours ago   192MB
```


### Create a new tag for an already existing image
```
$ docker image tag linksite:latest carlos/linktree:latest
$ docker images
Output:
REPOSITORY        TAG       IMAGE ID       CREATED       SIZE
carlos/linktree   latest    be39822cf4e2   3 hours ago   192MB
linksite2         1.5       be39822cf4e2   3 hours ago   192MB
linksite          latest    be39822cf4e2   3 hours ago   192MB
```


### Untag an image
``` 
$ docker rmi carlos/linktree:latest
Output:
Untagged: carlos/linktree:latest

$ docker images
Output:
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
linksite     latest    be39822cf4e2   3 hours ago   192MB
linksite2    1.5       be39822cf4e2   3 hours ago   192MB
```


### Delete images based on its ID's
```
# It is not possible to delete an image that is currently running in docker
$ docker rmi be39822cf4e2
Output:
Error response from daemon: conflict: unable to delete be39822cf4e2 (cannot be forced) - image is being used by running container 26f5573e267b

# fix (we need to delete the container first, then exec this command)
$ docker rmi -f be39822cf4e2
```


### Managing docker containers (different than managing images)
```
$ docker images
Output: 
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
linksite2    1.5       be39822cf4e2   3 hours ago   192MB
linksite     latest    be39822cf4e2   3 hours ago   192MB

$ docker run -it --rm -d -p 8080:80 --name webdelinks linksite2:1.5

```

### Stop container
```
$ docker ps
$ docker stop <CONTAINER_ID>

# See the stats by console (CTRL + C to get out)
$ docker stats
```



## Volumes
Basically a shared folder with the docker container
```
# Creates a shared folder that if changes in local, it will change in the container
$ docker build nginx .
$ docker run -it --rm -d -p 8080:80 -v ./sitio:/usr/share/nginx/html/sitio --name web nginx
```

### Difference between volumes and copy in the Dockerfile
* COPY is for saving information as permanent basis
* VOLUME is when the information can change (information between local and container)
``
