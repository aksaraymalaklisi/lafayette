### Crie um usuário para o Django no MySQL Workbench

Em um Query, insira a seguinte entrada:

```
CREATE DATABASE test;

CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON test.* to django_user@localhost;

FLUSH PRIVILEGES; -- Não é obrigatório. GRANT já dá FLUSH.
```

O professor decidiu dar acesso diretamente ao root para isso, mas Django não requer isso.

### Inicie a venv

`python -m venv venv`

`.\venv\Scripts\activate` (utilize `source`, se estiver em Linux)

### Instale Django, Rest Framework e MySQL (Python)

`pip install django djangorestframework mysql`

### Configure o Django

#### Crie o projeto

`django-admin startproject backend`

`django-admin startapp core`

(Nota: "backend" ou "core" podem ser qualquer nome. Esse foi o nome que o professor escolheu.)

#### Configure o settings.py

- Vá em `.\backend\backend\settings.py`.
- Procure por `INSTALLED_APPS`
- Adicione `'rest_framework'` e `'core'`

Lembre-se de adicionar vírgulas para cada entrada.
Note, novamente, que 'core' é apenas o nome do aplicativo que você escolheu.

#### Configure a conexão com a database

- Ainda em settings.py, procure por `DATABASES`
- Altere ENGINE para: `'django.db.backends.mysql'`
- Adicione as seguintes entradas:

```
'NAME': 'test',
'USER':'django_user',
'PASSWORD':'senha_segura',
'PORT':'3306',
```

**LEMBRE-SE** que os valores das chaves são escolhidos pelo o usuário, como:
- Nome da database ('NAME')
- Nome do usuário ('USER)
- Senha do usuário ('PASSWORD')

O "usuário" aqui se refere ao usuário criado lá em cima, na configuração do MySQL.

### Adicione um model no Django

No aplicativo que criou (nesse caso, 'core') vá para models.py

Adicione a seguinte entrada:

```
class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    estoque = models.IntegerField()

    def __str__(self):
        return self.nome
```

### Migrando as mudanças no Django

`python manage.py makemigrations`
`python manage.py migrate`

Use `python manage.py runserver` para rodar o servidor.

### Crie um serializer (serializer.py)

Em `.\backend\core`, crie um arquivo chamado `serializers.py`.

Adicione a seguinte entrada:

```
from rest_framework import serializers
from .models import Produto

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'
```

### Modificar views (views.py)

Em `views.py`, apague tudo e coloque a seguinte entrada:

```
from rest_framework import viewsets
from .models import Produto
from .serializers import ProdutoSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
```

### Crie uma rota (urls.py)

Em `urls.py`, adicione a seguinte entrada:

```
from django.urls import path, include
from rest_framework import routers
from .views import ProdutoViewSet

router = routers.DefaultRouter()
router.register(r'produtos', ProdutoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

### Configure a rota no backend

Em `.\backend\backend\urls.py`, acesse `urls.py`.
No segundo `import` presente no arquivo, adicione `include`.
Deverá ficar assim: `from django.urls import path, include`

Em `urlpatterns`, adicione a seguinte entrada:
`path('api/', include('core.urls')),`

Deverá ficar assim:

```
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]
```

### Acesse a página da API

Após seguir essas etapas, você pode acessar a página do Django REST Framework (como se fosse um Swagger).

- Como visto anteriormente, rode o servidor com `python manage.py runserver`.

- Acesse `localhost:8000/api/`. Lá será mostrado o API Root.

- A primeira opção no JSON será "produtos". Acesse o link no valor para testar o endpoint.

- Daí, é possível criar POST requests para API (adicionar produtos, nesse caso). 