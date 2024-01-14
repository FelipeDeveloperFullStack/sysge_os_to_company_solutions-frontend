@echo off
echo Executando o comando "git pull origin master"...
call git pull origin master

echo Comando "git pull origin master" finalizado.
echo Executando o comando "yarn" novamente...
call yarn

echo Comando "yarn" finalizado novamente.
call yarn start

echo Projeto frontend atualizado e executado com sucesso.

