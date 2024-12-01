# NGinx

NGINX: Introdução e Configuração

NGINX é um servidor web de alto desempenho usado para diversas funções, como servidor HTTP, proxy reverso, balanceador de carga, servidor de e-mails e muito mais. Desenvolvido com foco em alta concorrência, sua arquitetura baseada em eventos permite lidar com milhares de conexões simultâneas, sendo uma alternativa popular ao Apache.

1.  Por que usar o NGINX?

    Alto desempenho: Ótimo para lidar com tráfego intenso.
    Configuração flexível: Permite ajuste de comportamento para diversas aplicações.
    Proxy reverso: Ideal para proteger e distribuir solicitações para servidores de backend.
    Balanceamento de carga: Distribui requisições de forma eficiente entre servidores.
    Compatível com HTTP/2 e SSL/TLS: Moderno e seguro.

2.  Instalação do NGINX
    Para distribuições baseadas em Debian (como Ubuntu):

        Atualize os repositórios:

sudo apt update

Instale o NGINX:

    sudo apt install nginx -y

Para distribuições baseadas em RHEL (como CentOS):

    Atualize os repositórios:

sudo yum update

Instale o NGINX:

    sudo yum install nginx -y

Para outras distribuições:

Confira a documentação oficial do NGINX para detalhes específicos. 3. Configuração Básica do NGINX
3.1 Estrutura de Configuração

    Arquivo principal: /etc/nginx/nginx.conf
    Diretório de sites habilitados: /etc/nginx/sites-enabled/
    Diretório de sites disponíveis: /etc/nginx/sites-available/
    Log de acesso: /var/log/nginx/access.log
    Log de erros: /var/log/nginx/error.log

3.2 Configuração Passo a Passo
Passo 1: Verifique a instalação

Certifique-se de que o NGINX está instalado e ativo:

sudo systemctl status nginx

Passo 2: Configure um novo site

    Crie um arquivo de configuração no diretório sites-available:

sudo nano /etc/nginx/sites-available/meusite

Adicione o seguinte conteúdo:

    server {
        listen 80;
        server_name meusite.com www.meusite.com;

        root /var/www/meusite;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

    Salve e saia (Ctrl+O, Enter, Ctrl+X).

Passo 3: Crie o diretório do site

sudo mkdir -p /var/www/meusite

Passo 4: Adicione uma página inicial

Crie um arquivo index.html para testar:

sudo nano /var/www/meusite/index.html

Conteúdo do arquivo:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Meu Site</title>
</head>
<body>
    <h1>NGINX está funcionando!</h1>
</body>
</html>

Salve e saia.
Passo 5: Ative o site

Crie um link simbólico para ativar a configuração:

sudo ln -s /etc/nginx/sites-available/meusite /etc/nginx/sites-enabled/

Passo 6: Teste a configuração

Antes de reiniciar o NGINX, teste a configuração:

sudo nginx -t

Passo 7: Reinicie o NGINX

Se tudo estiver correto, reinicie o NGINX:

sudo systemctl restart nginx

4. Testando a Configuração

    Atualize seu arquivo de host local para testar o domínio:

sudo nano /etc/hosts

Adicione:

    127.0.0.1 meusite.com

    Acesse http://meusite.com no navegador. Você deve ver a mensagem: "NGINX está funcionando!"

5. Próximos Passos

    Configurar HTTPS: Utilize o Let’s Encrypt para adicionar SSL.
    Proxy Reverso: Direcione tráfego para um backend como Node.js, Python ou PHP.
    Logs e Monitoramento: Explore os logs para depuração e use ferramentas como o Prometheus para monitorar o servidor.

### Anotações

O Nginx é uma plataforma baseada em eventos, projetada para lidar de forma eficiente com milhares de conexões simultâneas. Ele utiliza uma camada inicial que recebe as requisições e as coloca em um epoll (uma estrutura eficiente de fila para monitoramento de eventos de I/O). A partir daí, essas requisições são enviadas para um loop de eventos, onde cada evento é processado de forma assíncrona, permitindo que o servidor gerencie múltiplas conexões sem precisar criar novos processos ou threads para cada requisição.

`worker_processes auto`: Determina o número de processos que serão usados para executar os workers, responsáveis por processar as tarefas do Nginx. Quando configurada como auto, essa opção detecta automaticamente o número de cores disponíveis no processador e ajusta a quantidade de processos de forma otimizada.

`events`: Define o bloco de configurações relacionado ao gerenciamento de eventos no servidor. Nele é controlado como o nginx lida com conexões de rede.

**exemplo**:

```conf
events {
    worker_connections 1024; #Define o número máximo de conexões simultâneas que cada processo worker pode lidar.

    use epoll; # Define o método usado para lidar com eventos de I/O. #epoll -> (Linux modernos) é altamente eficiente para grandes volumes de conexões. | kqueue -> sistemas BSD | select ou poll -> sistemas antigos

    multi_accept on; # Define se um processo worker aceita múltiplas conexões ao mesmo tempo.
}

```
