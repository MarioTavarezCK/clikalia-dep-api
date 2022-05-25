# Clikalia Departments API

### Descarga de dependencias

Es necesario instalar las dependencias con el comando

```jsx
npm install
```

### Correr el proyecto de manera local

Por defecto se ejecutará el API en el puerto **3001**

```jsx
npm run dev
```

### Endpoints

| HTTP METHOD | URL              |
| ----------- | ---------------- |
| GET         | /departments     |
| POST        | /departments     |
| PUT         | /departments     |
| DELETE      | /departments/:id |

### Descargar contenedor

Te permitirá descargar el contenedor que se encuentra en docker hub

```jsx
docker pull mariotavarez/clikalia-departments:mariotavarez
```

### Correr el contenedor

Te permitirá correr el contenedor en el puerto **3000**

```jsx
docker run -it -p 3001:3001  clikalia-departments
```

### Ejecutar contenedor (Opcional)

Generar el contenedor

```jsx
docker build -t clikalia-departments ./
```

### Clean Architecture

Este proyecto comparte mucha similitud con el proyecto **clikalia-departaments** ya que ambos se encuentran con clean architecture (Hexagonal).

El hexágono es donde se encuentra nuestro código base, llamado **dominio** y cada uno de sus laterales es una interacción hacia un servicio externo, por ejemplo: servicios *http*
 de terceros, bases de datos, servicio de mensajería o renderización.

![hexagonal domain](https://user-images.githubusercontent.com/102178716/170360414-14691644-3f90-4582-abbc-d3ca957f3755.png)

La comunicación del **dominio** con el resto de actores se realiza en una capa denominada **infraestructura** donde se encuentra la implementación específica para cada una de estas tecnologías.
![hexagonal infraestructure](https://user-images.githubusercontent.com/102178716/170360498-6f1da41d-37bc-4f77-a265-a1540bee0759.png)


-  **Puerto**: Es la interfaz que deberán implementar las distintas variantes de nuestro código para abstraerse de la tecnología. En ella se ha de definir la firma de los métodos que existirán.
-  **Adaptador**: Es la implementación de la interfaz, en ella se generará el código específico para consumir una tecnología en concreto. Esta nunca se usará de forma directa en la aplicación, más allá de la declaración, ya que su uso se realizará a través del tipo del **puerto**.

### Estructura de carpetas

Se han desacoplado cada librería en la capa de infraestructure.

La carpeta **domain** contiene la lógica de negocio.

La carpeta **infraestructure** contiene los adaptadores que implementan de la carpeta **domain** (**repositories, controllers, ui, etc**). Adicionalmente se encuentran librerías que se encuentran completamente desacopladas (**axios y sweetalert2**).

-  **src**
   -  **domain**
      -  **entities**
      -  **interfaces**
   -  **infraestructure**
      -  **repositories**
      -  **controllers**
      -  **routes**
      -  **database**
         -  **connection
            mongoorm**
   -  **index.ts**
