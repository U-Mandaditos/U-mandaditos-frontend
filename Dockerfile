# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Crear el archivo de configuración necesario
RUN mkdir -p ./utils && \
    echo "export const API_URL = '${API_URL}';" > ./utils/settings.js

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
