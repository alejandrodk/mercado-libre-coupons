# Mercado Libre Cupones 🏷
#
## Ejercicio técnico.
#
#
>Mercado Libre está implementando un nuevo beneficio para los usuarios que más usan la
plataforma con un cupón de cierto monto gratis que les permitirá comprar tantos items
marcados como favoritos que no excedan el monto total. Para esto se está analizando
construir una API que dado una lista de item_id y el monto total pueda darle la lista de items
que maximice el total gastado sin excederlo.

#### Ejemplo:
Dada la siguiente lista de precios y un cupón válido por **$500**
| Item_id | Precio |
| ------ | ------ |
| MLA1 | $100 |
| MLA2 | $210 |
| MLA3 | $260 |
| MLA4 | $80 |
| MLA5 | $90 |
La respuesta sería
```sh
[“MLA1”, “MLA2”, “MLA4”, “MLA5”]
```

#### Requerimientos
\.**1.**  Programar (en cualquier lenguaje de programación) la funcionalidad mencionada
respetando la siguiente firma: _(Lenguajes sugeridos: Java, Golang, Javascript.)_
```sh
List<String> calculate(Map<String, Float> items, Float amount)
```
\.**2.** Crear una **API REST**, con el servicio “/coupon/” en donde se pueda enviar la lista de
item_ids y el monto del cupón y devuelva los items que tendría que comprar el usuario y
el monto total gastado

`Consideraciones:`
\- Sólo se puede comprar una unidad por item_id.
\- No hay preferencia en la cantidad total de items siempre y cuando gasten el máximo posible.
\- El precio puede contener hasta 2 decimales.

**Ejemplo para solicitud: POST /coupon/**

Request Body:
```sh
{
    "item_ids": ["MLA1", "MLA2", "MLA3", "MLA4", "MLA5"],
    "amount": 500
}
```
Response:
```sh
{
    "item_ids": ["MLA1", "MLA2", "MLA4", "MLA5"],
    "total": 480
}
```
\.**3.** Hostear esa API en un cloud computing libre (Google App Engine, Amazon AWS, etc).

`consideraciones:`
\- Hay usuarios que tienen miles de items en favoritos.
\- Esta api tendría que escalar para soportar tráfico de hasta 100K rpm.
\- Generalmente los usuarios suelen marcar como favoritos a los mismos items.
___

## Instalación

\.**1.** Clonar repositorio del proyecto
```sh
https://github.com/alejandrodk/mercado-libre-coupons
```
\.**2.** Entrar en la carpeta contenedora e instalar dependencias
```sh
cd mercado-libre-coupons && yarn
```
\.**3.** Iniciar aplicación
```
docker-compose up -d
```

\* Por defecto la aplicación se ejecuta en el puerto `5000`
```
http://localhost:5000/coupon
```
\* Dentro de la carpeta **Utils** se encuentra el archivo **request.json** con un body válido que se puede utilizar para probar la aplicación con productos reales.

## Usabilidad

**Enlace a la aplicación**
```
http://meli-coupon-app-loadbalancer-2084293797.us-east-2.elb.amazonaws.com
```

| Método | Endpoint | descripción |
|--|--|--|
|POST|/coupon| Obtener productos disponibles según monto del cupón

**Esquema de body**
```sh
{
    "item_ids": String[],  # Listado con ID de productos favoritos
    "amount": Number       # Monto del cupón
}
```
`Consideraciones:`
1. Si el body del mensaje no posee el formato correcto, se responderá con un código **400**
    ```sh
    {
        "statusCode": 400,
        "message": "Validation failed",
        "error": "Bad Request"
    }
    ```
2. El código de los productos debe coincidir con el siguiente formato **MLA** + **000000000**
    de lo contrario el servidor responderá con un estado **400**
    Ejemplo:  **MLA879479072**

3. Si el monto del cupón no es suficiente para comprar al menos un producto, el servidor responderá con un estado **404**


# Dependencias

| Nombre | Descripción |
|--|--|
|[NestJs](https://nestjs.com/)| Framework utilizado para el desarrollo
|[yarn](https://yarnpkg.com/)| Manejo de dependencias
|[Joi](https://www.npmjs.com/package/@hapi/joi)| Validación de esquemas (body)
|[Faker](https://www.npmjs.com/package/faker)| Generación de data para mocks
|[Jest](https://www.npmjs.com/package/jest)| Tests
|[cache-manager]()| Gestión de Cache
|[cache-manager-ioredis](https://www.npmjs.com/package/cache-manager-ioredis)| Utilizar gestor de cache con cliente Redis
|[Dotenv]()|Cargar variables de entorno
|[Dotenv-flow](https://www.npmjs.com/package/dotenv-flow) / [Dotenv-expand](https://www.npmjs.com/package/dotenv-expand)| Utilizar archivos .env según entorno
|[class-transformer]() / [class-validator]()| Validar propiedades de clases

# Test Coverage
```sh
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------
All files                |  98.72 |    94.12 |     100 |   98.72 |
 application/controllers |     100 |      100 |     100 |     100 |
  app.controller.ts      |     100 |      100 |     100 |     100 |
 application/pipes       |     100 |      100 |     100 |     100 |
  payloadToDto.pipe.ts   |     100 |      100 |     100 |     100 |
  validation.pipe.ts     |     100 |      100 |     100 |     100 |
 domain/enums            |     100 |      100 |     100 |     100 |
  http.enums.ts          |     100 |      100 |     100 |     100 |
 domain/schemas          |     100 |      100 |     100 |     100 |
  payload.schema.ts      |     100 |      100 |     100 |     100 |
 domain/services         |   97.65 |     91.3 |     100 |   97.65 |
  coupons.service.ts     |     100 |    85.71 |     100 |     100 | 16
  products.service.ts    |   95.65 |    93.75 |     100 |   95.65 | 22-23
```