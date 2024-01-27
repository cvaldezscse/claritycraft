
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

### Inspecting a container properties
This works with an already running container
```
# Let's run a container
$ docker run -it --rm -d -p 8080:80 --name web nginx
Output:
d57ba8583739edfb5482b251de0b09576071cd1400b4a382098a6572729dea99

$ docker inspect web
Output:
[
    {
        "Id": "d57ba8583739edfb5482b251de0b09576071cd1400b4a382098a6572729dea99",
        "Created": "2024-01-27T18:55:01.534162625Z",
        "Path": "/docker-entrypoint.sh",
        "Args": [
            "nginx",
            "-g",
            "daemon off;"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 1224,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-01-27T18:55:01.715666167Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:27d44cb6221e16bb1ad888fdc7189a18849b5abf3e79ca69d0114b8994177c45",
        "ResolvConfPath": "/var/lib/docker/containers/d57ba8583739edfb5482b251de0b09576071cd1400b4a382098a6572729dea99/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/d57ba8583739edfb5482b251de0b09576071cd1400b4a382098a6572729dea99/hostname",
        "HostsPath": "/var/lib/docker/containers/d57ba8583739edfb5482b251de0b09576071cd1400b4a382098a6572729dea99/hosts",
        "LogPath": "/var/lib/docker/containers/d57ba8583739edfb5482b251de0b09576071cd1400b4a382098a6572729dea99/d57ba8583739edfb5482b251de0b09576071cd1400b4a382098a6572729dea99-json.log",
        "Name": "/web",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "80/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "8080"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": true,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                25,
                80
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "private",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware",
                "/sys/devices/virtual/powercap"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/46efc149cae7d6750c827b73d31abd66a547b1b8e20687b9b269f7edf71adbbd-init/diff:/var/lib/docker/overlay2/cbkpquzfh3936yfw5vzv44avd/diff:/var/lib/docker/overlay2/dlh5hz99t48ta4un6iybiq0ma/diff:/var/lib/docker/overlay2/mzhag4y3y6nerlen574jijm4h/diff:/var/lib/docker/overlay2/c9d8lpew6pv9zu0xxbu7wt9m6/diff:/var/lib/docker/overlay2/84fe557da8968c4c9986f2242f1a1f99f207f432101fdbfa98fd351bb7be482c/diff:/var/lib/docker/overlay2/2c04b0c6133bc3badff0b2f114a881079e0fac25448f7ae4f2964c5d5f4dfe08/diff:/var/lib/docker/overlay2/9bc741f4d4481ab36ebb34fb4341d067252585ed4e0ba9bd9f4497e7a561d0b0/diff:/var/lib/docker/overlay2/51b05e51f6636ec842469d06dbaffc2c451ee8ca16c87e1d2eecc71ee2ba1395/diff:/var/lib/docker/overlay2/011ef220f5c94f2de9e191c0f085d0f704687d581cf857317f653f09e6341a1d/diff:/var/lib/docker/overlay2/1e270259091143256a881806f4824ef746d743925ed6303550761615cb192739/diff:/var/lib/docker/overlay2/547ffb1e115318bfbddc00733d665ebbaca11469c3462db93bc635bcc8ca05d9/diff",
                "MergedDir": "/var/lib/docker/overlay2/46efc149cae7d6750c827b73d31abd66a547b1b8e20687b9b269f7edf71adbbd/merged",
                "UpperDir": "/var/lib/docker/overlay2/46efc149cae7d6750c827b73d31abd66a547b1b8e20687b9b269f7edf71adbbd/diff",
                "WorkDir": "/var/lib/docker/overlay2/46efc149cae7d6750c827b73d31abd66a547b1b8e20687b9b269f7edf71adbbd/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "d57ba8583739",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "80/tcp": {}
            },
            "Tty": true,
            "OpenStdin": true,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NGINX_VERSION=1.25.3",
                "NJS_VERSION=0.8.2",
                "PKG_RELEASE=1~bookworm"
            ],
            "Cmd": [
                "nginx",
                "-g",
                "daemon off;"
            ],
            "Image": "nginx",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": [
                "/docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {
                "maintainer": "NGINX Docker Maintainers \u003cdocker-maint@nginx.com\u003e"
            },
            "StopSignal": "SIGQUIT"
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "3c7b16ba1f5f8cddd2b0c9cd7c3f4fb2c0bbc6319193548a13284f7bb631ffe4",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "80/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "8080"
                    }
                ]
            },
            "SandboxKey": "/var/run/docker/netns/3c7b16ba1f5f",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "091c292ff7509bfacf7280c97ed3edb75d2baed1f173d86b00377727cf838c9c",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "02:42:ac:11:00:02",
                    "NetworkID": "912e7e263d9ee053cb5bce59854010977d086f9a488a48dc696da39466b8a1d0",
                    "EndpointID": "091c292ff7509bfacf7280c97ed3edb75d2baed1f173d86b00377727cf838c9c",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DriverOpts": null
                }
            }
        }
    }
]
```



#### Look for network
With the previous output we can see all the container data (Let's look for Network)
```
...
            "Ports": {
                "80/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "8080"
                    }
                ]
            },
...

  "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "02:42:ac:11:00:02",
                    "NetworkID": "912e7e263d9ee053cb5bce59854010977d086f9a488a48dc696da39466b8a1d0",
                    "EndpointID": "091c292ff7509bfacf7280c97ed3edb75d2baed1f173d86b00377727cf838c9c",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DriverOpts": null
                }
            }
        }
    }
```

*Note:* In case of not assigning an IP by command, it will assign it as an internal one or by default
> In the `IPAddress` key we can find the IP that is self-assigned by default and the `hostIp` is a generic one with `0.0.0.0`. This is for avoiding calling conflicts


#### Run the container on an specific IP
In order to assign a specific IP (in this case the local one), we need to run a command like this:
```
$ docker run -it --rm -d -p 127.0.0.1:8080:80 --name web nginx

# In the docker inspect command we would find something like this:
...
 "Ports": {
                "80/tcp": [
                    {
                        "HostIp": "127.0.0.1",
                        "HostPort": "8080"
                    }
                ]
            },
...
```


#### Bridge concept and network list
Establishes a link between my local env and the internal docker env
If we want to explore it we use the following command:
```
$ docker network ls
Output:
NETWORK ID     NAME      DRIVER    SCOPE
912e7e263d9e   bridge    bridge    local
1e3efc355408   host      host      local
525dd5e11a59   none      null      local
```

Driver concept
**bridge**: used in 90% of containers
**host**: one exclusive communication that is not needed to have to other containers
**none**: completely isolated component

#### How to create a new network (simulating a virtual network)
```
# creating a new network 
$ docker network create carlosnet1
Output: 66c077a23f29003194bef1d7dc93834ca31977a5de1bcb483ed426d3868d522b

# Inspecting existing networks
$ docker network ls
Output:
NETWORK ID     NAME         DRIVER    SCOPE
912e7e263d9e   bridge       bridge    local
66c077a23f29   carlosnet1   bridge    local
1e3efc355408   host         host      local
525dd5e11a59   none         null      local
```


## Docker Hub
It is a kind of github for sharing images with the rest of the community
In order to make it more interesting, we are going to create a shell file with the instructions to make this public:

```
$ docker build -t cvaldezscse 
```


Create a new `.sh` file
```
# 0. Create an image with the name convention
$ docker build -t cvaldezscse/linksbasicweb .

# 1. Create a new file
$ touch publish.sh

# 2. add the bash header to the file
#!/bin/bash

# 3. Add the following command lines in the file (just skip the hyphens)
----
#!/bin/bash
echo "Is time to publish your image"
docker push cvaldezscse/linksbasicweb
echo "Image published successfully"
----
```


For doing it from scratch in the CLI
```
$ docker login

# In case of being already logged in
Authenticating with existing credentials...
Login Succeeded

#Otherwise it would ask for username and password
```



### Using an already existing docker image from docker hub
```
$ docker run --name linkstreebasicweb --rm -it -p 8080:80 cvaldezscse/linksbasicweb

# If the image does not exist then it will go to dockerhub and would try to get the image from there

```
**Note**: When trying to run a remote image, we can add the statement `bin/bash` at the end of docker run command, so it is going to make us see the current container cli. For exiting, just type `exit` and enter, then, the container disappears


### Offline image sharing
When we want to send images through a USB or hard drive we use the following commands.
It will contain the layers and all the history of our images

```
# Stores it on a compressed filke
# docker save <IMAGENAME> > <FILENAMETOBEGENERATED>
$ docker save cvaldezscse/linksbasicweb > linktree.zip

# With this, docker will import the file into an image, then we can use it 
# docker load --input <IMAGE_FILE_TO_IMPORT>
$ docker load --input linktree.zip
```


### Docker compose Intro

Docker compose is a tool for defining and execute multi-container apps. We use a `YAML` file here to configure our app services. After that with a single command we create and start all the services with one single configuraration

For instance we have backend and frontend