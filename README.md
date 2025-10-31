<div align="center">

![Index app](./doc/assets/img/CRUD_Amazon_DynamoDB_AWS.drawio.png)

</div>

<div align="right">
  <img width="25" height="25" src="./doc/assets/icons/devops/png/aws.png" />
  <img width="25" height="25" src="./doc/assets/icons/aws/png/lambda.png" />
  <img width="27" height="27" src="./doc/assets/icons/devops/png/postman.png" />
  <img width="29" height="27" src="./doc/assets/icons/devops/png/git.png" />
  <img width="28" height="27" src="./doc/assets/icons/aws/png/api-gateway.png" />
  <img width="27" height="25" src="./doc/assets/icons/aws/png/parameter-store.png" />
  <img width="27" height="27" src="./doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
  <img width="27" height="27" src="./doc/assets/icons/backend/javascript-typescript/png/typescript.png" />
   <img width="27" height="27" src="./doc/assets/icons/aws/png/dynamo.png" />
</div>

<br>

<br>

<div align="right">
 <a href="./translations/README.es.md" target="_blank">
 <img src="./doc/assets/translation/arg-flag.jpg" width="10%" height="10%" />
 </a>
 <a href="./README.md" target="_blank">
 <img src="./doc/assets/translation/eeuu-flag.jpg" width="10%" height="10%" />
 </a>
</div>

<div align="center">

# Payments MP DynamoDB AWS ![(status-completed)](./doc/assets/icons/badges/status-completed.svg)

</div>

Microservice to manage MercadoPago payments with AWS DynamoDB implemented using API Gateway, Systems Manager Parameter Store, Serverless Framework, Lambda, TypeScript, DynamoDB, aws-sdk-v3, and more.

*   [MercadoPago Payments API docs](https://www.mercadopago.com.ar/developers/es/reference/payments/_payments/post)
*   [Playlist](https://www.youtube.com/playlist?list=PLCl11UFjHurBIy51oB_CZa46KSF1cWn9W)<a href="https://www.youtube.com/playlist?list=PLCl11UFjHurBIy51oB_CZa46KSF1cWn9W" target="_blank"> <img src="./doc/assets/social-networks/yt.png" width="25" />

<br>

## Index 📜

<details>
 <summary> View </summary>

 <br>

### Section 1) Description, setup and technologies

*   [1.0) Project description.](#10-description-)
*   [1.1) Run the project.](#11-run-the-project-)
*   [1.2) Technologies.](#12-technologies-)

### Section 2) Endpoints and Examples

*   [2.0) Endpoints and resources.](#20-endpoints-and-resources-)

### Section 3) Demo and References

*   [3.0) Demo.](#30-demo-)
*   [3.1) References.](#31-references-)

<br>

</details>

<br>

## Section 1) Description, setup and technologies

### 1.0) Description [🔝](#index-)

<details>
  <summary>View</summary>
 <br>

### 1.0.0) General Description

This project implements a CRUD system for managing [MercadoPago payment objects](https://www.mercadopago.com.ar/developers/es/reference/payments/_payments/post) using Amazon DynamoDB. It is built on a serverless architecture with AWS Lambda, API Gateway, Systems Manager Parameter Store, and Serverless Framework. The backend is written in TypeScript and uses AWS SDK v3 to interact with the database. Structure, operations, and data follow MercadoPago's official payments API, enabling create, read, update, and delete operations on payments.

`Important`: There are dependabot security alerts related to the "serverless-dynamodb-local" plugin. Do not apply security patches to that plugin, since version `^1.0.2` has issues creating tables and starting the local DynamoDB service. Keep the last stable version `^0.2.40` even if security alerts are present.

### 1.0.1) Architecture and Flow

The AWS architecture diagram shows the overall application flow. Any request to the app starts from a client (e.g., Postman, server, etc.).
Flow description:

*   `Step 0`: A request is sent to one of the implemented features, received by API Gateway, and only validated if the correct x-api-key header is present.
*   `Steps 1A, 1B, etc.`: Each of these corresponds to a specific endpoint and resource. For example, create payment (1A) is http://localhost:4000/dev/v1/payments ... See section 2 for endpoints. Each Lambda validates x-api-key and token.
*   `Step 2`: Lambdas validate SSM parameters via Systems Manager Parameter Store (token, DB connection values, etc.).
*   `Step 3`: Lambdas execute the described transactions and operations against DynamoDB.

<br>

</details>

### 1.1) Run the Project [🔝](#index-)

<details>
  <summary>View</summary>
  <br>

*   Create a working directory in your IDE; you may or may not create a project root folder. Navigate into it:

```git
cd 'projectRootName'
```

*   Clone the project:

```git
git clone https://github.com/andresWeitzel/Payments_MP_Dynamo_AWS
```

*   Install the LTS version of [Node.js (v18)](https://nodejs.org/en/download)
*   Install Serverless Framework globally if you haven't yet. I recommend version 3 as it’s free and doesn’t require credentials. You can also use v4, but it’s paid.

```git
npm install -g serverless@3
```

*   Check the installed Serverless version:

```git
sls -v
```

*   Install dependencies:

```git
npm i
```

`Important`: There are dependabot security alerts related to the "serverless-dynamodb-local" plugin. Do not apply security patches to that plugin, since version `^1.0.2` has issues creating tables and starting the local DynamoDB service. Keep the last stable version `^0.2.40` even if security alerts are present.

*   SSM variables are kept in the project to simplify setup. It’s recommended to add the corresponding file (`serverless_ssm.yml`) to `.gitignore`.
*   The following `package.json` script starts serverless-offline:

```git
 "scripts": {
   "serverless-offline": "sls offline start",
   "start": "npm run serverless-offline"
 },
```

*   Start the app from the terminal:

```git
npm run start
```

*   If ports 4000 or 8000 are in use, kill them and try again:

```git
npx kill-port 4000 (serverless)
npx kill-port 8000 (dynamo)
npm start
```

<br>

</details>

### 1.2) Technologies [🔝](#index-)

<details>
  <summary>View</summary>
 <br>

| **Technology** | **Version** | **Purpose** |
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.17.0  | Automatic module injection for Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.38.0 | AWS services core |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.3.0 | Environment variable management |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.57.0 | API management, auth, control and processing |
| [Amazon DynamoDB](https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/Introduction.html) | 2024.03.11 | NoSQL database service |
| [Typescript](https://www.typescriptlang.org/) | 5.4.5 | Strongly typed language |
| [NodeJS](https://nodejs.org/en/) | 20.12.2  | JavaScript runtime |
| [VSC](https://code.visualstudio.com/docs) | 1.89.1  | IDE |
| [Postman](https://www.postman.com/downloads/) | 11.0.5  | HTTP client |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Command line |
| [Git](https://git-scm.com/downloads) | 2.45.0  | Version control |

</br>

| **Serverless Plugin** | **Description** |
| -------------  | ------------- |
| [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild) | Transpiles and bundles TypeScript/JavaScript |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | Emulates AWS Lambda and API Gateway locally |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) | Replaces SSM parameters from a file at build-time |
| [serverless-dynamodb-local](https://www.serverless.com/plugins/serverless-dynamodb-local) | Local DynamoDB for development |

<br>

</details>

<br>

## Section 2) Endpoints and Examples.

### 2.0) Endpoints and resources [🔝](#index-)

<details>
  <summary>View</summary>

### GET operations:

*   http://localhost:4000/dev/v1/payments/list
*   http://localhost:4000/dev/v1/payments/list-with-filters
*   http://localhost:4000/dev/v1/payments/uuid/{uuid}
*   `All endpoints are optionally paginated except /uuid/{uuid}`

### POST operations:

*   http://localhost:4000/dev/v1/payments

### PUT operations:

*   http://localhost:4000/dev/v1/payments/{uuid}

### DELETE operations:

*   http://localhost:4000/dev/v1/payments/{uuid}

### Notes

*   {required-value}
*   Default pagination: ?page=0\&limit=5
*   Optional pagination: ?page={n}\&limit={n}

<br>

</details>

### 2.1) Examples [🔝](#index-)

<details>
  <summary>View</summary>
<br>

### 2.1.0) Variables in Postman

| **Variable** | **Initial value** | **Current value** |
| ------------- | ------------- | ------------- |
| base\_url | http://localhost:4000/dev/v1 | http://localhost:4000/dev/v1 |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer\_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c |

<br>

<br>

### 2.1.1) Create a payment object

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

#### Response (400 Bad Request) --> Applies to all validated attributes

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

### 2.1.2) Get all payment objects by applied filter (description)

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

### 2.1.3) Get a payment object by uuid

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

### 2.1.4) Update a payment object by uuid

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

### 2.1.5) Delete a payment object by uuid

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

## Section 3) Demo and References.

### 3.0) Demo [🔝](#index-)

<details>
  <summary>View</summary>
<br>

#### Operation types | [View](https://www.youtube.com/playlist?list=PLCl11UFjHurBIy51oB_CZa46KSF1cWn9W)

![Index app](./doc/assets/img/playlist.png)

</details>

### 3.1) References [🔝](#index-)

<details>
  <summary>View</summary>
 <br>

#### Tools

*   [AWS design tool app.diagrams.net](https://app.diagrams.net/?splash=0\&libs=aws4)
*   [Online JSON formatter/validator](https://jsonformatter.org/)
*   [JSONPath Online Evaluator](https://jsonpath.com/)
*   [Postman API Platform](https://www.postman.com/)
*   [Swagger Editor](https://editor.swagger.io/)
*   [YAML Validator](https://jsonlint.com/?mode=yaml)

#### API Gateway

*   [API Gateway documentation](https://www.serverless.com/guides/amazon-api-gateway)
*   [API Gateway serverless yml definition](https://dev.to/leventov/enable-cors-with-custom-headers-for-an-aws-lambda-function-behind-api-gateway-in-serverless-framework-3702)
*   [API Gateway template example](https://github.com/SeptiyanAndika/serverless-custom-authorizer/blob/master/index.js)
*   [API Gateway best practices](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
*   [Create custom API keys](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)
*   [AWS API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
*   [API Gateway CORS Setup](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)

#### Libraries

*   [Field validation](https://www.npmjs.com/package/node-input-validator)
*   [Joi - Object schema description and validation](https://joi.dev/)
*   [Axios - Promise based HTTP client](https://www.npmjs.com/package/axios)
*   [AWS SDK for JavaScript](https://www.npmjs.com/package/aws-sdk)
*   [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)

<br>

</details>
