# via-sem6-sep

## Links
Project is hosted on
```
https://moviesdb.azurewebsites.net
```
API URL (Example query)
```
https://moviesdbapi.azurewebsites.net/api/Movie/60144
```

### Docker
To run the images locally:  
*In Backend/Dockerfile:*  
Change ASPNETCORE_ENVIRONMENT="Production" to ASPNETCORE_ENVIRONMENT="Test"  
*In Frontent/.env.production*  
Change REACT_APP_API_URL=https://moviesdbapi.azurewebsites.net/api to REACT_APP_API_URL=http://localhost:5001/api  


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

