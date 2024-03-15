# Projeto Vue

Este projeto implementa técnicas de carregamento preguiçoso (Lazy Loading) com Vue, como Virtual Scrolling (somente os itens visíveis pelo usuário são carregados no DOM)  lazy loading em imagens(somente as imagens visíveis pelo usuário são carregados no DOM),  visando melhorar o desempenho ao carregar imagens ou componentes somente quando necessários.

## Virtual Scrolling
Implementação com vue-virtual-scroller para renderizar listas grandes de maneira eficiente, mostrando apenas os itens visíveis na viewport, reduzindo significativamente o uso de memória e melhorando a performance de renderização.

## Lazy Loading
Componentes: Carregamento sob demanda de componentes Vue para reduzir o tempo de carregamento inicial da aplicação.
Imagens e Recursos: Uso de lazy loading para imagens e outros recursos pesados, garantindo que sejam carregados apenas quando estiverem próximos de entrar na viewport do usuário.
Gerenciamento de Estado com Pinia
Uso do Pinia para gerenciar o estado da aplicação de forma eficiente, com módulos bem organizados, facilitando a manutenção e a escalabilidade do projeto.
Otimização de Performance
Análise e otimização com ferramentas como Lighthouse e Chrome DevTools para identificar e corrigir gargalos de performance.
Implementação de boas práticas de desenvolvimento, incluindo o uso correto de computed properties, watchers e componentes funcionais para um código mais limpo e eficiente.
Este projeto é uma demonstração prática de como aplicar estas técnicas avançadas em um projeto real Vue 3, visando uma aplicação altamente performática e eficiente.

## Consumo de API para Testes

Para os testes de performance e otimização, consumi uma API pública da internet - [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts) - que fornece dados de exemplo para simular operações CRUD em uma aplicação Vue. Isso me permite experimentar com dados reais sem a necessidade de configurar um backend próprio.

## Estratégia de Branches para Comparação

Decidi adotar uma estratégia de branches para avaliar o impacto das melhores práticas de desenvolvimento na performance da aplicação:

- Em uma branch, **vou me atentar rigorosamente às melhores práticas** de desenvolvimento com Vue, incluindo técnicas avançadas de otimização como virtual scrolling, lazy loading, e gerenciamento eficiente de estado com Pinia.
- Na outra branch, **não vou me importar com as melhores práticas**, desenvolvendo a aplicação de forma mais direta e menos otimizada.

O objetivo é medir o ganho de performance decorrente da aplicação das melhores práticas, utilizando ferramentas como o Chrome DevTools e o Vue DevTools para uma análise detalhada.
### Soluções Propostas no Projeto
Este projeto visa demonstrar técnicas avançadas de otimização para aplicações Vue 3, focando em performance e eficiência no uso de memória. As principais soluções incluem:

