# POC MicroFrontend

<div style="display: flex;">
    <div>
        <img src="./images/README images/logo_Single-spa.jpg" style="width: 100px;"/>
    </div>
    <div>
        <img src="./images/README images/logo_Angular.png" style="width: 100px;"/>
        <img src="./images/README images/logo_React.png" style="width: 100px;"/>
        <img src="./images/README images/logo_Vue.png" style="width: 100px;"/>
    </div>
</div>

El objetivo de esta POC es demostrar cómo funcionan los microfrontends mediante la utilización del framework single-spa a través de la convivencia entre aplicaciones desarrolladas con tecnologías diferentes pero que al unirlas en conjunto conforman una única página completamente funcional.

Para eso, se creó una app denominada "root-config" la cual consumirá 3 aplicaciones hechas en React.js, Angular.js y Vue.js, denominadas "react-app", "angular-app" y "vue-app" respectivamente. Adicionalmente, se creó un servicio websocket para transmitir el estado de un contador desde React hacia las otras 2 aplicaciones como una alternativa de estado compartido.

![Pantalla principal](./images/README%20images/pantalla_root-config.png)

Cabe recalcar que el contenido de las aplicaciones será visualizada siempre a través de la pantalla principal de la aplicación "root-config", si se desea visualizar el contenido en cada aplicación individualmente se deberá realizar modificaciones adicionales indicadas en la página principal de cada aplicación individual.

Adicionalmente, este tipo de infraestructura permite que si alguna de las aplicaciones deja de funcionar, la aplicación principal de root-config sigue visualizando la información de las otras apps.

Para más información sobre cómo funciona y configura el framework single-spa dirigirse acá: https://single-spa.js.org/docs/getting-started-overview/


## Buenas prácticas y recomendaciones para compartir el estado de una aplicación

The list below shows some common practices:

- Create a shared API utility microfrontend that caches fetch/XHR requests and their responses. All microfrontends call into the API microfrontend when making a request, so that the microfrontend can control whether to refetch the data or not.

- Create a shared Auth utility microfrontend that exposes a userCanAccess function for other microfrontends to use when checking permissions. The auth module may also include other exports such as the logged in user object, auth tokens, etc.

- Export shared state from the public interface of your microfrontend so that libraries can import it. For values that change over time, Observables (RxJS docs) can be useful. Create a ReplaySubject so that you can push new values out to all subscribers at any time.

- Use custom browser events to communicate. Fire them on the window in one microfrontend, and listen to the event in a different microfrontend.

- Use cookies, local/session storage, or other similar methods for storing and reading that state. These methods work best with things that don't change often, e.g. logged-in user info.

Más información en el siguiente link: https://single-spa.js.org/docs/faq/#how-can-i-share-application-state-between-applications


## Creación y ejecución de aplicaciones

### Creación de aplicaciones

Para la creación de la aplicación angular-app, react-app y vue-app se ejecutó el siguiente comando:

~~~
npx create-single-spa --moduleType app-parcel
~~~

Se siguió el paso a paso seleccionando las herramientas deseadas y eligiendo el framework/librearía correspondiente como template para la creación del mismo.


### root-config

Para la creación de la aplicación root-config se ejecutó el siguiente comando:

~~~
npx create-single-spa --moduleType root-config
~~~

Adicionalmente, se agregaron configuraciones adicionales a los archivos src/index.ejs y src/microfrontend-layout.html para poder visualizar las 3 aplicaciones desde la aplicación root-config

#### root-config\src\index.ejs

![Primera configuración a realizar en index.ejs de root-config](./images/README%20images/Configuracion_index.ejs_1.png)

![Segunda configuración a realizar en index.ejs de root-config](./images/README%20images/Configuracion_index.ejs_2.png)

![Tercera configuración a realizar en index.ejs de root-config](./images/README%20images/Configuracion_index.ejs_3.png)


#### root-config\src\microfrontend-layout.html

![Configuración a realizar en microfrontend-layout.html de root-config](./images/README%20images/Configuracion_microfrontend-layout.hrml_1.png)


### Ejecución de aplicaciones

A continuación se detallan las modificaciones que se tuvieron que hacer sobre los templates ya armados de single-spa que fueron necesarios para poder levantar las aplicaciones por alguna configuración faltante.

### angular-app

Para su ejecución es necesario primero crear una carpeta denominada "environments" y dentro crear un archivo .ts llamado environment, el cual deberá tener el siguiente contenido:

~~~
export const environment = {production: false}
~~~

Esto es para evitar un error al ejecutar la aplicación donde se espera que exista este archivo que no es contemplado en el template de Angular.

Luego ejecutar la instalación de paquetes y dependencias faltantes

~~~
yarn install
~~~

Una vez hecho esto, se podrá ejecutar la aplicación mediante el siguiente comando

~~~
ng serve
~~~


### react-app y root-config

Para su ejecución simplemente se deberá ejecutar el siguiente comando:

~~~
yarn start
~~~


### vue-app

Para esta aplicación se deberá modificar el archivo "vue.config.js" agregando la siguiente configuración de webpack:

~~~
module.exports = {
...
configureWebpack: {
    output: {
      libraryTarget: 'system'
    },
  }
}
~~~

Esto es para solventar un error que se genera al momento de intentar leer el script con información de la aplicación relacionado con webpack.

Finalmente se deberá ejecutar el siguiente comando:

~~~
yarn serve
~~~


### websocketService

Se deberá instalar el paquete "ws" para poder ejecutar el websocket, para eso ejecutar lo siguiente:

~~~
yarn add ws
~~~

Ejecutar el siguiente comando para correr el websocket

~~~
node webSocketService
~~~


## Diagrama de comunicación entre microfrontends

![Diagrama de comunicación entre microfrontends](/images/README%20images/POC%20Microfrontend.drawio.png)