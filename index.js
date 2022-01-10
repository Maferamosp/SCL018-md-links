#!/usr/bin/env node
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import  Yargs  from 'yargs';

const userPath = process.argv[2]; // linea de comando que contiene toda la ruta
const option = Yargs(process.argv.slice(2)).argv; // para analizar cadenas de opciones

// // funcion si es un directorio
// const isDirectory = (dirRoutes)=>{
//     try {
//       const stats = fs.statSync(dirRoutes)
//       return stats.isDirectory();
//     } catch (err) {
//       console.error(err)
//     }
//   };
 
// funcion si es un archivo
export const isFile = (fileRoute) =>{
    const ext = path.extname(fileRoute); //para encontrar la extension
    if (ext === '.md'){ //verificar si es md
     const data = fs.readFileSync(fileRoute, { encoding: 'utf8', flag: 'r' }) //ruta y opiones
       return findLinks(data);
 } else {
     console.log("No es un archivo MarkDown");
 }
}

// //funcion para leer un directorio -------ARREGLAR!!
// export const funReaddir = (files) => {
//   const folder = fs.readdirSync(files);
//   folder.forEach(file=>{
//     const absPath = path.join(files, file); //une todos los segmentos y normaliza la ruta
//     if(isDirectory(absPath)){
//       funReaddir(absPath)
//     }else if (isFile(absPath)){
//       isFile(absPath) // revisar 
//     }
//   })
// }

    //----Funcion para encontrar los links-----//
export const findLinks = (data) =>{
   let getLinks = /(?<!\!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
   let getLinksFin = data.matchAll(getLinks) // itera por la ER
   const allLinks =  [];
    for (const match of getLinksFin){ //obtenemos las ocurrencias dentro de ER
      allLinks.push({
        href: match[2], //el link entra en el índice 2
        text: match[1],//el texto del link entra en el índice 1
        file: userPath, // la ruta que nos da el usuario entra en el índice 0
      });
    }
    return allLinks;
  }

  export const validateLinks = (arrLinks) => {
    const status = arrLinks.map((element) => //iteramos por el Array
    fetch(element.href) //hago la peticion
    .then((response) =>{ 
      return {
        href: element.href,
        text: element.text,
        file: element.file,
        status: response.status,
        statusText: response.statusText,
      }
    })
    .catch((err) =>{
      console.log(err);
        return {
            href:element.href,
            text: element.text,
            file: element.file,
            status: 404,
            statusText: "Fail",
        }
    }) 
    )
    return Promise.all(status);
    };

    export const mdLinks = (fileRoute) =>{
        return new Promise((resolve, reject) =>{
          const total = isFile(fileRoute);
          if(option.validate){
            resolve(validateLinks(total));
          }else {
            resolve(total);
          }
          reject();
        });
      };
    
      mdLinks(userPath)
      .then(results => console.log(results))