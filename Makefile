dev:
		npm run dev
run-debug:
		DEBUG=1 npm run dev

# make update-submodules branch=develop
update-submodules:
		git submodule update --init --recursive && \
		git submodule foreach git checkout $(branch) && \
        git submodule foreach git pull origin $(branch)
