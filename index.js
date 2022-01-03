import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import  Yargs  from 'yargs';

// module.exports = () => {
//   // ...
// };
// const url = "https://www.google.com";
// fetch(url)
//   .then((response) => console.log(response.status))
//   .catch((error) => console.log(error));

// const path = require('path');
// const fileModule = require('./file.js')
const userPath = process.argv[2];
const option = Yargs(process.argv.slice(2)).argv;


// const isMdFile = (routes) =>{
//   const ext = path.extname(routes); //para encontrar la extension
//   if (ext === '.md'){ //verificar si es md
//     fs.readFileSync(routes, 'utf-8', (err, data)=>{ // lee el contenido del archivo
//       if (err) throw err;
//       const links = findLinks(data);
//       console.log(1, links);
      
//       // console.log(validateLinks(links));
//       // links.forEach(element => validateLink(element));
//       // links.forEach(element => console.log("este es un elemento de mi arreglo links" + JSON.stringify(element)
      
//       // console.log(links)
//       return links;
//     })
//   } else {
//     console.log('No es un archivo .md')
//   }
// };

//funcion para saber si es Archivo o Directorio
const fileOrDir = (userPath) =>{
  fs.lstatSync(userPath, (err, stats) => {
    if (err){
     console.log(err);
    }else {
      if(stats.isDirectory()){
        console.log('Si es un directorio');
        funReaddir();//si es un directorio lo lee
      } else if (stats.isFile()){
        console.log('Es un archivo')//si es archivo lo lee
        const url = isMdFile(userPath);
        return url;
      }
    }
  });
};
// funcion para leer un directorio
const funReaddir = () =>{
fs.readdirSync(userPath, (err, files) => {
  if(err){
    console.log(err);
  }else{
    files.forEach(file =>{
      // const file = path.resolve(`${userPath}${path.sep}${file}`);
      // console.log(file);
      isMdFile(file)
    })
  }
})
}

//----Funcion para encontrar los links-----//
const findLinks = (data) =>{
  let getLinks = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
  let getLinksFin = data.matchAll(getLinks)
  const allLinks =  [];
  for (const match of getLinksFin){
    allLinks.push({
      href: match[2], //el link entra en el índice 2
      text: match[1],//el texto del link entra en el índice 1
      file: userPath, // la ruta que nos da el usuario entra en el índice 0
    });
    // console.log(allLinks);
    // console.log(userPath + ' ' + match[2] + ' ' + `${match[1].slice(0, 50)}`);

  }
  return allLinks;
}
const validateLinks = (arrLinks) => {
  const status = arrLinks.map((element) =>
  fetch(element.href)
  .then((response) =>{
    return {
      href: element.href,
      text: element.text,
      file: element.file,
      status: response.status,
      statusText: "ok",
    }
  })
  )
  return Promise.all(status);
  }

  const mdLinks = (routes) =>{
    return new Promise((resolve, reject) =>{
      const total = isMdFile(routes);
      if(option.validate){
        resolve(validateLinks(arrLinks));
      }else {
        resolve(total);
      }
      reject();
    });
  };

  mdLinks(userPath).then((results)=> console.log(results));

  export { mdLinks, validateLinks, findLinks, funReaddir, fileOrDir, isMdFile }
// const mdLinks = (userPath) => {
//   let final = fileOrDir(userPath);
//   console.log(final);
// };
// mdLinks(userPath);