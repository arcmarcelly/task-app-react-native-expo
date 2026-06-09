# Task App - Front-end Mobile

Este é o aplicativo mobile de um gerenciador simples de tarefas, desenvolvido em React Native com Expo. O aplicativo se conecta a uma API Node.js para realizar o ciclo completo de cadastro, listagem, edição e exclusão de tarefas.

## Funcionalidades
* Cadastro de novas tarefas
* Listagem de tarefas em tempo real
* Edição do título das tarefas
* Alternação de status (concluído/pendente) ao tocar na tarefa
* Exclusão de registros

## Tecnologias Utilizadas
* React Native
* Expo

## Pré-requisitos
Antes de testar o aplicativo, garanta que você possui instalado:
* Node.js
* Expo Go instalado no seu dispositivo móvel (Android ou iOS)

## Configuração e Instalação

1. Acesse a pasta do projeto no terminal:
cd task-app/frontend

2. Instale as dependências necessárias:
npm install

3. Configure o arquivo App.js:
Abra o arquivo App.js e atualize a variável API_URL com o endereço IP da sua máquina local na rede Wi-Fi para que o celular físico consiga se comunicar com o backend:
const API_URL = 'http://SEU_IP_LOCAL:3000/api/tasks';

4. Inicie o projeto com o Expo:
npx expo start

Agora, basta abrir o aplicativo Expo Go no seu celular e escanear o QR Code gerado no terminal para testar a aplicação.
