[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/DBnbDJjJ)
# Ejercitación: API REST de Partidos de Fútbol Internacionales ⚽

Bienvenido a esta ejercitación práctica de Backend. En este proyecto, pondrás a prueba tus habilidades construyendo una **API RESTful** utilizando **Express.js** y **MongoDB**, y estructurando el proyecto utilizando la **Arquitectura por Capas** vista en clase.

## Descripción del Proyecto 📋

El objetivo es desarrollar una API que permita administrar una colección de partidos de fútbol internacionales disputados a partir del año 2020. Tu API deberá implementar un **CRUD básico** y una serie de **endpoints especializados** (búsquedas).

Dentro de la carpeta `/data` encontrarás el archivo `data.json`, el cual contiene el registro de estos partidos recientes. Deberás crear la lógica para poblar tu base de datos y construir los endpoints que la consulten.

## Arquitectura por Capas 🏗️

Se espera que organices tu código siguiendo la **Arquitectura por Capas**, separando responsabilidades:

- **Capa de Rutas (`routes/`)**: Define los endpoints y delega la ejecución al controlador correspondiente.
- **Capa de Controladores (`controllers/`)**: Maneja las peticiones HTTP (req, res), extrae los parámetros y delega la lógica de negocio.
- **Capa de Lógica de Negocio (`services/` u opcional en controladores)**: Si tu lógica es compleja, es buena práctica tener servicios.
- **Capa de Acceso a Datos (`models/`)**: Define los esquemas de Mongoose y se comunica con MongoDB.
- **Configuración (`config/`)**: Archivos de conexión a la base de datos y otras configuraciones.

## Modelo de Datos 📊

Al observar `data.json`, verás que cada partido tiene la siguiente estructura base. Debes crear un esquema en Mongoose llamado `Partido` con los siguientes campos:

- `date` (String o Date): Fecha del partido (ej. "1872-11-30").
- `home_team` (String): Nombre del equipo local.
- `away_team` (String): Nombre del equipo visitante.
- `home_score` (Number): Goles del equipo local.
- `away_score` (Number): Goles del equipo visitante.
- `tournament` (String): Torneo en el que se disputó el partido (ej. "Friendly", "Copa América").
- `city` (String): Ciudad donde se jugó.
- `country` (String): País donde se jugó.
- `neutral` (Boolean): Indica si se jugó en cancha neutral.

> **¡IMPORTANTE!** 🔐 Para gestionar la cadena de conexión de MongoDB (`MONGO_URI`) y el puerto (`PORT`), debes utilizar un archivo `.env`. **NUNCA** subas tus credenciales a GitHub. Asegúrate de que `.env` esté en tu `.gitignore`.
> 
> 💡 **Nota sobre la Base de Datos:** Ten en cuenta que esta ejercitación **no** utiliza la misma base de datos que las ejercitaciones anteriores de CRUD (como `Ejercitacion-de-CRUD-en-Mongoose` o `Ejercitacion-de-CRUD-en-MongoDB`). Para mantener los proyectos organizados y estandarizados, te sugerimos nombrar a esta nueva base de datos como **`partidos_db`** y a la colección como **`partidos`**. Modifica tu `MONGO_URI` para que apunte a esta nueva base de datos.

## Endpoints Requeridos 🔍

### CRUD Básico

1. **`GET /partidos`**: Devuelve la lista de partidos (dado el gran volumen de datos, considera usar un límite en tu consulta, ej. los primeros 20).
2. **`GET /partidos/:id`**: Devuelve un partido específico buscando por su ID de MongoDB.
3. **`POST /partidos`**: Agrega un nuevo partido. El cuerpo debe ser un JSON válido con la estructura del modelo.
4. **`PUT /partidos/:id`**: Modifica un partido existente (actualización total o parcial).
5. **`DELETE /partidos/:id`**: Elimina un partido de la base de datos.

### Endpoints Especializados

6. **`GET /partidos/torneo/:torneo`**: Devuelve todos los partidos correspondientes a un torneo específico (ej. `/partidos/torneo/Friendly`).
7. **`GET /partidos/equipo/:equipo`**: Devuelve todos los partidos donde haya jugado el equipo especificado, **ya sea como local o como visitante**.
8. **`GET /partidos/fecha/:fechaInicio-:fechaFin`**: Devuelve los partidos disputados dentro de un rango de fechas (ej. `/partidos/fecha/2021-01-01-2021-12-31`).

## Probando la API con `api.http` 🧪

En la raíz del proyecto encontrarás un archivo `api.http`. Utiliza la extensión **REST Client** de Visual Studio Code para ejecutar las peticiones y validar que tus endpoints funcionen correctamente. 

> **Nota**: Deberás actualizar los IDs en `api.http` por los IDs reales (generados por MongoDB) de los documentos que insertes en tu base de datos para probar `GET /:id`, `PUT` y `DELETE`.

## Instrucciones 🚀

1.  Asegúrate de clonar este repositorio (si usas GitHub Classroom, tu copia personal).
2.  Ejecuta `npm install` para instalar las dependencias (Express, Mongoose, dotenv, etc.).
3.  Crea un archivo `.env` basado en `.env.example` y configura tu URL de MongoDB.
4.  (Opcional) Crea un script para importar los datos de `data/data.json` a tu base de datos MongoDB utilizando Mongoose, o impórtalos utilizando MongoDB Compass.
5.  Resuelve cada uno de los endpoints respetando la separación en capas.
6.  Comprueba tus respuestas utilizando `api.http`.
7.  Haz *commits* periódicos y sube tus cambios con `git push`.

¡Mucho éxito en la resolución!
