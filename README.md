# challenge-interbanking
Aplicación Web para el procesamiento de pagos bancarios


Consideraciones del challenge

Si tengo que traer la transacciones que se hicieron el ultimo mes, necesito tener un campo fecha en esa tabla
Para aplicar cierta normalización, pero sin complejizar demasiado el modelo de datos, agrego una tabla con las cuentas,
Que solo tenga algún que otro campo unívoco (cbu) y el tipo de cuenta, que sea obtenga de otra tabla de parametria
Para no salirme del alcance no lo relaciono con algún titular de la misma o le agrego un campo de saldo.
Elijo un enfoque que de cierta forma me permita normalizar la base de datos.

Genere un cuarto endpoint que me permite para un id de pago traerme todo el detalle de las demás relaciones.
Haciendo un eager fetching.

Comandos para ejecutar parado sobre la raíz del proyecto

--> npm run i (instalar todas las dependencias de npm de forma local)

--> npm run test:cov (correr todos los test unitarios del proyecto)

--> npm run start:dev (levantar la aplicación local)

En caso de hacer cambios y correr lint para embellecer el código

--> npm run eslint-fix

El proyecto tiene un piso de coverage tanto de branches, cómo funciones y líneas de 80% en caso de no cubrirlo
hay 2 hooks de husky que no permitirán ni commitear, ni pushear esos cambios

En el proyecto existe un archivo example_env, el mismo habrá que renombrarlo como .env
allí debería estar seteadas todas las variables de entorno de la base de datos (DB_HOST, DB_USERNAME, DB_PASSWORD, etc)
Ya que si no levantará por defecto las que tiene el archivo envs.config que son las del ambiente local con el que estuve trabajando


Además se deberán correr el DDL y el DML en ese orden respectivo, los cuales se encuentran dentro del proyecto.

Por último dentro de la carpeta postman del proyecto, existe una colección que tiene casi todas las pruebas de integración que hice sobre el proyecto


swagger local con la documentacion de todos los endpoints expuesto por la API

http://localhost:8080/api

Para los endpoints de get les dejo la posibilidad que si las personas me envían un rango de fechas distintos al mes, tome ese rango y no un rango de 30 días.
Además les agrego la posibilidad de poder paginar los resultados, para no devolver a memoria demasiadas cosas en el caso de que los selects devuelvan demasiados registros.