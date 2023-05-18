# via-sem6-sep

#### TODO: Check this https://github.com/jonico/awesome-runners for when we want to implement an action (CI/CD)
### Docker
To update the images open terminal in via-sem6-sep and run:
```
cd Frontend
docker build -t sep6_frontend -f Dockerfile .
cd ..
cd Backend
docker build -t sep6_backend -f Dockerfile .
```
To run the project in Docker container open terminal in via-sem6-sep and run:
```
docker compose up -d
```
The -d option detaches the process from the terminal. If you want to have the logs in the terminal run the command without it.  
Run the following command to stop the application:
```
docker compose down
```
Example request
```
http://localhost:5001/api/Movie/60144
```
