# DetectorMutante

Antes de poder ejecutar la API se debe contar con NodeJS, MySQL y seguir los siguientes pasos:

1- Clonar el repositorio, branch master
2- Crear una base de datos y un usuario que utilizaremos para conectarnos en desde la API, ejecutar las siguientes líneas en la consola SQL de MySQL:

CREATE DATABASE detectormutante;
CREATE USER 'detectormutante'@'localhost' IDENTIFIED BY 'detectormutante';
GRANT ALL PRIVILEGES ON detectormutante.* TO 'detectormutante'@'localhost';
FLUSH PRIVILEGES;

3- Ejecutar "npm install"
4- Para ejecutar la API se debe correr el comando "node server.js" en una terminal.
5- Para analizar una secuencia se debera hacer un request post a http://localhost:8080/mutant, con el siguiente cuerpo, por ejemplo:

{"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}

Si se trata de un mutante la API devolverá un HTTP code 200, caso contrario un 403.

6- Para obtener las estadísticas se debe hacer un request tipo GET a http://localhost:8080/stats y la respuesta será, por ejemplo:

{“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}