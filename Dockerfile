# FRONTEND BUILD
FROM node:16-alpine as FRONTEND
WORKDIR /app

COPY /frontend/package*.json ./
RUN npm install --only=production
COPY /frontend .
RUN npm run build

# BACKEND BUILD
FROM golang:1.18-alpine as BACKEND
WORKDIR /app

COPY backend/go.mod backend/go.sum ./
RUN go mod download && go mod verify
COPY backend/ .
COPY --from=FRONTEND /app/build /app/resources
RUN CGO_ENABLED=0 go build -o server .

# FINAL BUILD
FROM alpine as SERVER
WORKDIR /app

RUN adduser -S -D -H -h /app appuser
USER appuser

COPY --from=BACKEND /app/server ./
CMD ["./server"]
