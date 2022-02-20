FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["AcademicAPI.csproj", "AcademicAPI/"]
RUN dotnet restore "AcademicAPI/AcademicAPI.csproj"
COPY . ./AcademicAPI
WORKDIR "/src/AcademicAPI"
RUN dotnet build "AcademicAPI.csproj" -c Production -o /app/build

FROM build AS publish
RUN dotnet publish "AcademicAPI.csproj" -c Production -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AcademicAPI.dll"]
