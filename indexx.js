import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import  Yargs  from 'yargs';

const userPath = process.argv[2];
const option = Yargs(process.argv.slice(2)).argv;

// funcion si es un directorio
const isDirectory = (dirRoutes)=>{
    try {
      const stats = fs.statSync(dirRoutes)
      return stats.isDirectory();
    } catch (err) {
      console.error(err)
    }
  };
 
// funcion si es un archivo
const isFile = (fileRoute) =>{
    const ext = path.extname(fileRoute); //para encontrar la extension
    if (ext === '.md'){ //verificar si es md
     const data = fs.readFileSync(fileRoute, { encoding: 'utf8', flag: 'r' })
       return findLinks(data);
 } else {
     console.log("No es un archivo MarkDown");
 }
}

//funcion para leer un directorio -------ARREGLAR!!
const funReaddir = (files) => {
  const folder = fs.readdirSync(files);
  folder.forEach(file=>{
    const absPath = path.join(files, file);
    if(isDirectory(absPath)){
      funReaddir(absPath)
    }else if (isFile(absPath)){
      funReaddir(absPath)
    }
  })
}
// const funReaddir = () =>{
//     fs.readdirSync(userPath, (err, files) => { //lee el contenido del directorio
//       if(err){
//         console.log(err);
//       }else{
//         files.forEach(file =>{
//           const absPath = path.join(file); //el metodo une los segmentos de ruta especificados en una ruta.
//           if (isDirectory(absPath)){
//             funReaddir();
//           }else if (isFile(absPath)){
//             funReaddir();
//           }
//         })
//       }
//     })
//     }

    //----Funcion para encontrar los links-----//
const findLinks = (data) =>{
   let getLinks = /(?<!\!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
   let getLinksFin = data.matchAll(getLinks)
   const allLinks =  [];
    for (const match of getLinksFin){
      allLinks.push({
        href: match[2], //el link entra en el índice 2
        text: match[1],//el texto del link entra en el índice 1
        file: userPath, // la ruta que nos da el usuario entra en el índice 0
      });
    }
    return allLinks;
  }

  const validateLinks = (arrLinks) => {
    const status = arrLinks.map((element) =>
    fetch(element.href) //metodo que regresa una promesa
    .then((response) =>{
      return {
        href: element.href,
        text: element.text,
        file: element.file,
        status: response.status,
        statusText: "Ok",
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

    const mdLinks = (fileRoute) =>{
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