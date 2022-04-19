.ONESHELL:

# optimize so the files are not rebuilt when no changes are needed

gen-frontend:
	cd frontend
	npm run codegen

gen-backend:
	cd backend
	go generate ./...

gen: gen-frontend gen-backend

build-frontend:
	cd frontend
	BUILD_PATH=../backend/static npm run build

build-backend:
	cd backend
	go build -o server .

build-docker:
	docker build .

build: build-frontend build-backend build-docker

run: build
	cd backend
	./server
