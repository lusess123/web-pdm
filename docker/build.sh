docker ps -a| grep webpdmdoc | awk '{print $1}' | xargs docker rm -f
docker build -t webpdmdoc  .   
docker run -d -it -p 5012:5012  webpdmdoc