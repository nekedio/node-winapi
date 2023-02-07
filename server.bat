@echo ------ npm install ------
call npm install

@echo ------ server start ------
start node app.mjs

@echo ------ explorer open ------
explorer http://localhost:5000/