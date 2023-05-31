FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5001
ENV ASPNETCORE_URLS=http://+:5001
ENV ASPNETCORE_ENVIRONMENT="Production"
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Backend.csproj", "./"]
#Unsuccessfull attepmt to add certificates
#RUN dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p pass
#RUN apt update && apt install -y libnss3-tools
# Trust the certificate for SSL 
#RUN pk12util -d sql:${HOME}/.aspnet/https/ -i aspnetapp.pfx
# Trust a self-signed server certificate
#RUN certutil -d sql:${HOME}/.aspnet/https/aspnetapp.pfx -A -t "P,," -n 'dev cert' -i aspnetapp.crt
#RUN apt update && apt install -y ca-certificates
#RUN cp ${HOME}/.aspnet/https/aspnetapp.pfx /usr/local/share/ca-certificates/
#RUN update ca-certificates
#ENV ASPNETCORE_Kestrel__Certificates__Default__Password="pass"
#ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/usr/local/share/ca-certificates/aspnetapp.pfx
RUN dotnet restore "./Backend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Backend.csproj" -c Release -o /app/build
FROM build AS publish
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Backend.dll"]

