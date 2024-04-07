docker build -f Dockerfile -t domowa:v1 --rm . 

docker run -d -p 81:80 --name testDomowa domowa:v1

docker aux ps