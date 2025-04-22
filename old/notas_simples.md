# Aula do dia 08/04/2025

### Crie um usuário para o Django no MySQL Workbench

Em um Query, insira a seguinte entrada:

```
CREATE DATABASE test;

CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON test.* to django_user@localhost;

FLUSH PRIVILEGES; -- Não é obrigatório. GRANT já dá FLUSH.
```

O professor decidiu dar acesso diretamente ao root para isso (e pela interface do MySQL Workbench), mas Django não requer isso.

### Inicie a venv

`python -m venv venv`

`.\venv\Scripts\activate` (utilize `source`, se estiver em Linux)

### Instale os requisitos

`pip install -r requirements.txt`

### Migrando as mudanças após instalação

`python manage.py migrate`

### Rodando o servidor
`python manage.py runserver`

### Acesse a página da API

Após seguir essas etapas, você pode acessar a página do Django REST Framework (como se fosse um Swagger).

- Acesse `localhost:8000/api/`. Lá será mostrado o API Root.

- A primeira opção no JSON será "produtos". Acesse o link no valor para testar o endpoint.

- Daí, é possível criar POST requests para API (adicionar produtos, nesse caso). 

