# NGinx

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
