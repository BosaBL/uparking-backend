# Proyecto Semestral "U-Parking"

Este proyecto tiene como propósito crear una aplicación de estacionamientos, entre las funcionalidad de esta aplicación están:

- Visualización de espacios de estacionamientos.
- Administración.
- Notificaciones de siniestros.
- Interfaces para guardias de seguridad.

En particular este repositorio consta del backend del proyecto, donde el principal motor es Django junto a DjangoRestFramework.

## Instalación Local

> [!IMPORTANT]
> Para la administración de paquetes durante el proyecto se usará [Poetry](https://python-poetry.org/), es importante aprender a usarlo y a trabajar con el.

> [!IMPORTANT]
> Es necesaria la creación de un archivo para las variables de entorno, en este archivo se guardarán las credenciales locales para la base de datos de postgres, crear el archivo en el directorio base del repositorio.
>
> ```shell
> POSTGRES_DATABASE=nombre_base_de_datos
> POSTGRES_USER=nombre_usuario
> POSTGRES_PASSWORD=contrasena
> POSTGRES_HOST=localhost
> DEV=1
> VERCELDEPLOYEMENT=0
> ```

> [!TIP]
> Se sugiere el uso de virtual enviroments para no mezclar el proyecto con paquetes propios ni versiones instaladas de Python, en particular se sugiere el uso de [Pyenv](https://github.com/pyenv/pyenv).

Clonar el repositorio en la carpeta de desarrollo

```shell
git clone https://github.com/BosaBL/uparking-backend
```

luego, navegar a la carpeta del proyecto e instalar las dependencias

```shell
cd uparking-backend
poetry self add poetry-plugin-export
poetry install
```

posteriormente, reiniciar la consola o terminal e inicializar pre-commit.py

```shell
pre-commit install
```

finalmente, inciar el servidor para verificar que todo esté funcionando de manera correcta

```shell
poetry run python manage.py runserver
```

el servidor debería estar corriendo.