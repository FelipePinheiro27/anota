# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar o arquivo de projeto e restaurar dependências
COPY anota-backend.csproj ./
RUN dotnet restore

# Copiar todos os arquivos e construir o projeto
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copiar os artefatos da etapa de build
COPY --from=build /app/publish .

# Expor portas
EXPOSE 5000
EXPOSE 5001

# Inicializar a aplicação
ENTRYPOINT ["dotnet", "anota-backend.dll"]
