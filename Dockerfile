# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Declarar el argumento de construcción
ARG API_URL=http://domain:8080

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Crear el archivo de configuración necesario
RUN mkdir -p ./src/app/utils && \
    echo "export const API_URL = '$API_URL';" > ./src/app/utils/settings.js

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la app
FROM node:18-alpine AS runner

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo lo necesario desde la etapa anterior
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Establecer variable de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto que usa Next.js
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
