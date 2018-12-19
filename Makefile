# Default target executed when no arguments are given to make.
default_target: build
.PHONY : default_target

# Build rule for target.
buildFront:
	-npm --prefix web run-script build
.PHONY : buildFront

buildBack:
	go build
.PHONY : buildBack

run: buildFront buildBack
	./soccer-pong
.PHONY : startAll

clean:
	-go clean
	-npm --prefix web run-script clean
.PHONY : clean

# Help Target
help:
	@echo "The following are some of the valid targets for this Makefile:"
	@echo "... build (the default if no target is provided)"
	@echo "... start"
	@echo "... clean"
.PHONY : help
