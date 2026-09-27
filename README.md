<div align="center">
<img src="./doc/assets/img/CRUD_Amazon_DynamoDB_AWS.drawio.png" alt="Index app" width="100%" />
<div align="right">
<img width="16" height="16" src="./doc/assets/icons/devops/png/aws.png" alt="AWS" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/lambda.png" alt="Lambda" />
<img width="16" height="16" src="./doc/assets/icons/devops/png/postman.png" alt="Postman" />
<img width="16" height="16" src="./doc/assets/icons/devops/png/git.png" alt="Git" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/api-gateway.png" alt="API Gateway" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/parameter-store.png" alt="Parameter Store" />
<img width="16" height="16" src="./doc/assets/icons/backend/javascript-typescript/png/nodejs.png" alt="Node.js" />
<img width="16" height="16" src="./doc/assets/icons/backend/javascript-typescript/png/typescript.png" alt="TypeScript" />
<img width="16" height="16" src="./doc/assets/icons/aws/png/dynamo.png" alt="DynamoDB" />
</div>
</div>

<br>

<br>

<div align="right">
 <a href="./README.md" title="Español">
 <img src="./doc/assets/translation/arg-flag.jpg" width="64" height="40" alt="Español" title="Español" />
 </a>
 <a href="./translations/README.en.md" title="Inglés">
 <img src="./doc/assets/translation/eeuu-flag.jpg" width="64" height="40" alt="Inglés" title="Inglés" />
 </a>
</div>

<br>

<div align="center">

# Payments MP DynamoDB AWS ![(status-completed)](./doc/assets/icons/badges/status-completed.svg)

</div>

Microservicio serverless para gestionar pagos de Mercado Pago con DynamoDB, siguiendo el modelo de su API oficial. Incluye ítems, pagador, envíos, método de pago y referencia externa, con altas autenticadas, consultas por uuid o filtros, listados paginados y edición o baja.

<div align="left">
<a href="https://www.mercadopago.com.ar/developers/es/reference/payments/_payments/post" target="_blank" rel="noopener noreferrer" title="API Doc"><img src="./doc/assets/icons/detail-actions/api-doc-pill.svg" alt="API Doc" width="100" height="30" border="0" /></a>
<br>
<a href="./postman/Payments_MP_Dynamo_AWS.postman_collection.json" target="_blank" rel="noopener noreferrer" title="Colección de Postman"><img src="./doc/assets/icons/detail-actions/postman-pill.svg" alt="Postman" width="100" height="30" border="0" /></a>
<br>
<a href="https://www.youtube.com/playlist?list=PLCl11UFjHurBIy51oB_CZa46KSF1cWn9W" target="_blank" rel="noopener noreferrer" title="Playlist"><img src="./doc/assets/icons/detail-actions/playlist-pill.svg" alt="Playlist" width="100" height="30" border="0" /></a>
</div>


<br>

## Índice 📜

<details>
 <summary> Ver detalles </summary>

<div align="right">

`Última actualización: 07/09/26` 

</div>

### Sección 1)  Descripción, configuración y tecnologías

*   [1.0) Descripción del Proyecto.](#10-descripción-)
*   [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
*   [1.2) Tecnologías.](#12-tecnologías-)

### Sección 2) Endpoints y Ejemplos

*   [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)

### Sección 3) Prueba de funcionalidad y Referencias

*   [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
*   [3.1) Referencias.](#31-referencias-)

<br>

</details>

<br>

## Sección 1)  Descripción, configuración y tecnologías

### 1.0) Descripción [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>
 <br>

### 1.0.0) Descripción General

Este proyecto implementa un sistema CRUD para la gestión de [objetos payments de MercadoPago](https://www.mercadopago.com.ar/developers/es/reference/payments/_payments/post) utilizando Amazon DynamoDB, desarrollado en una arquitectura serverless con AWS Lambda, API Gateway, Systems Manager Parameter Store y Serverless Framework. El backend está construido en TypeScript y hace uso del AWS SDK v3 para la interacción con la base de datos. La estructura, las operaciones y los datos toman como referencia la API oficial de MercadoPago para pagos, permitiendo crear, leer, actualizar y eliminar pagos desde la plataforma.

`Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.

### 1.0.1) Descripción Arquitectura y Funcionamiento

La imagen de la arquitectura de aws empleada describe el flujo de funcionamiento de la app de forma general. Cualquier petición hacia la misma, parte desde un cliente (Ej: Postman, servidor, etc).
La descripción y flujo de cada paso es la siguiente :

*   `Paso 0` : Se genera una solicitud-petición hacia una de las funcionalidades desarrollada, la misma es recibida a través del api-gateway y solamente se validará si es que dentro de los encabezados de dicha solicitud se encuentra la x-api-key correcta.
*   `Pasos 1A, 1B, etc` : Todos estos pasos corresponden a un endpoint con su recurso especifico. Por ej. para create payment (1A) es http://localhost:4000/dev/v1/payments....etc. Revisar dichos endpoints en sección endpoints. Cada lambda realiza comprobación de x-api-key y token.
*   `Pasos 2` : Las lambdas realizan las validaciones de las ssm correspondientes con el System Manager Paramater Store.. validan token, valores de conexión con la db etc.
*   `Pasos 3` : Las lambdas realizan las transacciones y operaciones descritas con el tipo de base de datos Dynamodb.

<br>

</details>

### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>
  <br>

*   Creamos un entorno de trabajo a través de algún ide, podemos o no crear una carpeta raíz para el proyecto, nos posicionamos sobre la misma

```git
cd 'projectRootName'
```

*   Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto

```git
git clone https://github.com/andresWeitzel/Payments_MP_Dynamo_AWS
```

*   Instalamos la versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
*   Instalamos el Serverless Framework globalmente si aún no lo hemos hecho. Recomiendo la version tres ya que es gratuita y no nos pide credenciales. Se puede usar la última version (cuatro) sin problemas, aunque es de pago.

```git
npm install -g serverless@3
```

*   Verificamos la versión de Serverless instalada

```git
sls -v
```

*   Instalamos todos los paquetes necesarios

```git
npm i
```

`Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.

*   Las variables ssm utilizadas en el proyecto se mantienen para simplificar el proceso de configuración del mismo. Es recomendado agregar el archivo correspondiente (serverless\_ssm.yml) al .gitignore.
*   El siguiente script configurado en el package.json del proyecto es el encargado de levantar serverless-offline (serverless-offline).

```git
 "scripts": {
   "serverless-offline": "sls offline start",
   "start": "npm run serverless-offline"
 },
```

*   Ejecutamos la app desde terminal.

```git
npm run start
```

*   Si se presenta algún mensaje indicando qué el puerto 4000 u 8000 ya está en uso, podemos terminar todos los procesos dependientes y volver a ejecutar la app.

```git
npx kill-port 4000 (serverless)
npx kill-port 8000 (dynamo)
npm start
```

<br>

</details>

### 1.2) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>
 <br>

| **Tecnología** | **Versión** | **Finalidad** |
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.17.0  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.38.0 | Core Servicios AWS |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.3.0 | Manejo de Variables de Entorno |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.57.0 | Gestor, Autenticación, Control y Procesamiento de la Api |
| [Amazon DynamoDB](https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/Introduction.html) | 2024.03.11 | Servicio de base de datos NoSQL |
| [Typescript](https://www.typescriptlang.org/) | 5.4.5 | Lenguaje altamente tipado |
| [NodeJS](https://nodejs.org/en/) | 20.12.2  | Entorno de ejecución JS |
| [VSC](https://code.visualstudio.com/docs) | 1.89.1  | IDE |
| [Postman](https://www.postman.com/downloads/) | 11.0.5  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para línea de comandos |
| [Git](https://git-scm.com/downloads) | 2.45.0  | Control de Versiones |

</br>

| **Serverless Plugin** | **Descripción** |
| -------------  | ------------- |
| [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild) | Complemento para transpilar y actualizar código Typescript y Javascript |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | Este complemento sin servidor emula AWS λ y API Gateway en entorno local |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) | Complemento para variables de entorno que cumplen los parámetros de SSM en el momento de la compilación y las sustituye desde un archivo  |
| [serverless-dynamodb-local](https://www.serverless.com/plugins/serverless-dynamodb-local) | Complemento para actualizar tipo de db NoSQL DynamoDB |

<br>

</details>

<br>

## Sección 2) Endpoints y Ejemplos.

### 2.0) Endpoints y recursos [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>

### Operaciones de tipo GET:

*   http://localhost:4000/dev/v1/payments/list
*   http://localhost:4000/dev/v1/payments/list-with-filters
*   http://localhost:4000/dev/v1/payments/uuid/{uuid}
*   `Todos los endpoints son paginados opcionales menos el /uuid/{uuid}`

### Operaciones de tipo POST:

*   http://localhost:4000/dev/v1/payments

### Operaciones de tipo PUT:

*   http://localhost:4000/dev/v1/payments/{uuid}

### Operaciones de tipo DELETE:

*   http://localhost:4000/dev/v1/payments/{uuid}

### Aclaraciones

*   {valor-requerido}
*   Paginado por defecto : ?page=0\&limit=5
*   Paginado opcional : ?page={nro}\&limit={nro}

<br>

</details>

### 2.1) Ejemplos [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>
<br>

### 2.1.0) Variables en Postman

| **Variable** | **Initial value** | **Current value** |
| ------------- | ------------- | ------------- |
| base\_url | http://localhost:4000/dev/v1 | http://localhost:4000/dev/v1 |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer\_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c |

<br>

<br>

### 2.1.1) Crear un objeto payment

#### Request (POST) | Code snippet

```postman
curl --location 'http://localhost:4000/dev/v1/payments' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data-raw '{
  "items": {
    "id": "MLB2907679857",
    "title": "Point Mini",
    "description": "Producto Point para cobros con tarjetas mediante bluetooth",
    "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
    "category_id": "electronics",
    "quantity": 1,
    "unit_price": 1000
  },
  "payer": {
    "id": "12",
    "first_name": "Test",
    "last_name": "Test"
  },
  "shipments": {
    "receiver_address": {
      "zip_code": "B16-2231FG",
      "state_name": "Rio de Janeiro",
      "city_name": "Buzios",
      "street_name": "Av das Nacoes Unidas",
      "street_number": 3003
    }
  },
  "description": "Payment for product",
  "external_reference": "MP0001",
  "payment_method_id": "visa",
  "token": "ff8080814c11e237014c1ff593b57b4d",
  "transaction_amount": 58.8
}'
```

#### Response (200 OK)

```postman
{
    "message": {
        "uuid": "d5d58c31-8c29-41d2-a2e0-88322cb0238d",
        "description": "Payment for product",
        "externalReference": "MP0001",
        "paymentMethodId": "visa",
        "token": "ff8080814c11e237014c1ff593b57b4d",
        "transactionAmount": 58.8,
        "items": {
            "id": "MLB2907679857",
            "title": "Point Mini",
            "description": "Producto Point para cobros con tarjetas mediante bluetooth",
            "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
            "category_id": "electronics",
            "quantity": 1,
            "unit_price": 1000
        },
        "payer": {
            "id": "12",
            "first_name": "Test",
            "last_name": "Test"
        },
        "shipments": {
            "receiver_address": {
                "street_number": 3003,
                "city_name": "Buzios",
                "state_name": "Rio de Janeiro",
                "zip_code": "B16-2231FG",
                "street_name": "Av das Nacoes Unidas"
            }
        }
    }
}
```

#### Response (400 Bad Request) --> Aplica a todos los atributos con validación

```postman
{
    "message": "Bad request, check request attributes for Item Object . Validate the following : The value of the item id must be between 1 and 25 characters,The id of item must be of type string,The id of item cannot be empty"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Other responses

<br>

<br>

### 2.1.2) Obtener todos los objetos Payment según filtro aplicado (descripción)

#### Request (GET) | Code snippet

```postman
curl --location 'http://localhost:4000/dev/v1/payments/list-with-filters?filter=description&filterValue=Payment&limit=10&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data ''
```

#### Response (200 OK)

```postman
{
    "message": [
        {
            "externalReference": "MP0001",
            "paymentMethodId": "visa",
            "transactionAmount": 58.8,
            "description": "Payment for product",
            "uuid": "d5d58c31-8c29-41d2-a2e0-88322cb0238d",
            "items": {
                "quantity": 1,
                "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
                "category_id": "electronics",
                "description": "Producto Point para cobros con tarjetas mediante bluetooth",
                "id": "MLB2907679857",
                "title": "Point Mini",
                "unit_price": 1000
            },
            "payer": {
                "first_name": "Test",
                "last_name": "Test",
                "id": "12"
            },
            "shipments": {
                "receiver_address": {
                    "street_number": 3003,
                    "city_name": "Buzios",
                    "state_name": "Rio de Janeiro",
                    "zip_code": "B16-2231FG",
                    "street_name": "Av das Nacoes Unidas"
                }
            },
            "token": "ff8080814c11e237014c1ff593b57b4d"
        }
        ETC....
    ]
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Other responses

<br>

<br>

### 2.1.3) Obtener un objeto payment según su uuid

#### Request (GET) | Code snippet

```postman
curl --location 'http://localhost:4000/dev/v1/payments/uuid/d5d58c31-8c29-41d2-a2e0-88322cb0238d' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data ''
```

#### Response (200 OK)

```postman
{
    "message": {
        "externalReference": "MP0001",
        "paymentMethodId": "visa",
        "transactionAmount": 58.8,
        "description": "Payment for product",
        "uuid": "d5d58c31-8c29-41d2-a2e0-88322cb0238d",
        "items": {
            "quantity": 1,
            "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
            "category_id": "electronics",
            "description": "Producto Point para cobros con tarjetas mediante bluetooth",
            "id": "MLB2907679857",
            "title": "Point Mini",
            "unit_price": 1000
        },
        "payer": {
            "first_name": "Test",
            "last_name": "Test",
            "id": "12"
        },
        "shipments": {
            "receiver_address": {
                "street_number": 3003,
                "city_name": "Buzios",
                "state_name": "Rio de Janeiro",
                "zip_code": "B16-2231FG",
                "street_name": "Av das Nacoes Unidas"
            }
        },
        "token": "ff8080814c11e237014c1ff593b57b4d"
    }
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Unable to get payment based on uuid d5d58c31-8c29-41d2-a2e0-88322cb0238d"
}
```

#### Other responses

<br>

<br>

### 2.1.4) Actualizar un objeto Payment según su uuid

#### Request (PUT) | Code snippet

```postman
curl --location --request PUT 'http://localhost:4000/dev/v1/payments/d5d58c31-8c29-41d2-a2e0-88322cb0238d' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data-raw '{
  "items": {
    "id": "test",
    "title": "test",
    "description": "test",
    "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
    "category_id": "electronics",
    "quantity": 1,
    "unit_price": 1000
  },
  "payer": {
    "id": "12",
    "first_name": "Test",
    "last_name": "Test"
  },
  "shipments": {
    "receiver_address": {
      "zip_code": "B16-2231FG",
      "state_name": "Rio de Janeiro",
      "city_name": "Buzios",
      "street_name": "Av das Nacoes Unidas",
      "street_number": 3003
    }
  },
  "description": "Payment for product",
  "external_reference": "MP0001",
  "payment_method_id": "visa",
  "token": "ff8080814c11e237014c1ff593b57b4d",
  "transaction_amount": 58.8
}'
```

#### Response (200 OK)

```postman
{
    "message": {
        "externalReference": "MP0001",
        "paymentMethodId": "visa",
        "transactionAmount": 58.8,
        "description": "Payment for product",
        "items": {
            "quantity": 1,
            "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
            "category_id": "electronics",
            "description": "test",
            "id": "test",
            "title": "test",
            "unit_price": 1000
        },
        "payer": {
            "first_name": "Test",
            "last_name": "Test",
            "id": "12"
        },
        "shipments": {
            "receiver_address": {
                "street_number": 3003,
                "city_name": "Buzios",
                "state_name": "Rio de Janeiro",
                "zip_code": "B16-2231FG",
                "street_name": "Av das Nacoes Unidas"
            }
        },
        "uuid": "d5d58c31-8c29-41d2-a2e0-88322cb0238d",
        "token": "ff8080814c11e237014c1ff593b57b4d"
    }
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Bad request, unable to update object in db as failed to get a payment by uuid. Check if the payment exists in the database and try again"
}
```

#### Other responses

<br>

<br>

### 2.1.5) Eliminar un objeto Payment según su uuid

#### Request (DELETE) | Code snippet

```postman
curl --location --request DELETE 'http://localhost:4000/dev/v1/payments/d5d58c31-8c29-41d2-a2e0-88322cb0238d' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Content-Type: application/json'
```

#### Response (200 ok)

```postman
{
    "message": "Successfully removed payment based on uuid d5d58c31-8c29-41d2-a2e0-88322cb0238d"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Unable to delete payment based on uuid d5d58c31-8c29-41d2-a2e0-88322cb0238d"
}
```

#### Other responses

<br>

</details>

<br>

## Sección 3) Prueba de funcionalidad y Referencias.

### 3.0) Prueba de funcionalidad [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>
<br>

#### Tipos de Operaciones | [Ver](https://www.youtube.com/playlist?list=PLCl11UFjHurBIy51oB_CZa46KSF1cWn9W)

![Index app](./doc/assets/img/playlist.png)

</details>

### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>
 <br>

#### Herramientas

*   [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0\&libs=aws4)
*   [Formateo y validador online JSON](https://jsonformatter.org/)
*   [Evaluador JSONPath Online](https://jsonpath.com/)
*   [Plataforma Postman API](https://www.postman.com/)
*   [Swagger Editor](https://editor.swagger.io/)
*   [Validador YAML](https://jsonlint.com/?mode=yaml)

#### Api Gateway

*   [Api gateway documentation](https://www.serverless.com/guides/amazon-api-gateway)
*   [Api gateway serverless yml definition](https://dev.to/leventov/enable-cors-with-custom-headers-for-an-aws-lambda-function-behind-api-gateway-in-serverless-framework-3702)
*   [Api Gateway Template Example](https://github.com/SeptiyanAndika/serverless-custom-authorizer/blob/master/index.js)
*   [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
*   [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)
*   [Guía del Desarrollador de AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
*   [Configuración de CORS en API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)

#### Librerías

*   [Validación de campos](https://www.npmjs.com/package/node-input-validator)
*   [Joi - Esquemas y validación de objetos](https://joi.dev/)
*   [Axios - Cliente HTTP basado en Promesas](https://www.npmjs.com/package/axios)
*   [AWS SDK para JavaScript](https://www.npmjs.com/package/aws-sdk)
*   [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)

<br>

</details>
