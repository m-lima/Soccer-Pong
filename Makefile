# Default target executed when no arguments are given to make.
default_target: build
.PHONY : default_target

install:
	-npm --prefix web install
	go get -tags prod
.PHONY : install

build: install
	-npm --prefix web run-script build
	go build -tags prod
.PHONY : build

run:
	./soccer-pong
.PHONY : run

clean:
	-go clean
	-npm --prefix web run-script clean
.PHONY : clean

dev:
	-npm --prefix web run-script dev
	go build -tags dev
	./soccer-pong
.PHONY : dev

docker:
	-docker build -t soccer-pong .
	-docker stop soccer-pong
	-docker rm soccer-pong
	-docker create --net fly --name soccer-pong soccer-pong
.PHONY : docker

# Help Target
help:
	@echo "The following are some of the valid targets for this Makefile:"
	@echo "... build	Installs and builds in prod mode (default target)"
	@echo "... run		Runs the executable"
	@echo "... clean	Cleans the build"
	@echo "... dev		Builds and runs in dev mode"
	@echo "... install	Installs the dependencies"
.PHONY : help
