#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Academic.API/Academic.API.csproj", "Academic.API/"]
RUN dotnet restore "Academic.API/Academic.API.csproj"
COPY . .
WORKDIR "/src/Academic.API"
RUN dotnet build "Academic.API.csproj" -c Release -o /app/build
HEALTHCHECK CMD curl --fail http://localhost:5000/health || exit

FROM build AS publish
RUN dotnet publish "Academic.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Academic.API.dll"]
