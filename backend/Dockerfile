FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY src/LanchoneteRisa.sln ./
COPY src/LanchoneteRisa.Domain/LanchoneteRisa.Domain.csproj LanchoneteRisa.Domain/
COPY src/LanchoneteRisa.Application/LanchoneteRisa.Application.csproj LanchoneteRisa.Application/
COPY src/LanchoneteRisa.Infrastructure/LanchoneteRisa.Infrastructure.csproj LanchoneteRisa.Infrastructure/
COPY src/LanchoneteRisa.API/LanchoneteRisa.API.csproj LanchoneteRisa.API/
RUN dotnet restore

COPY src/ .
RUN dotnet publish LanchoneteRisa.API/LanchoneteRisa.API.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "LanchoneteRisa.API.dll"]
