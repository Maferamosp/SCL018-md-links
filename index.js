// import fetch from "node-fetch"
const fs = require('fs');

// module.exports = () => {
//   // ...
// };
// const url = "https://www.google.com";
// fetch(url)
//   .then((response) => console.log(response.status))
//   .catch((error) => console.log(error));

const path = require('path');
// const fileModule = require('./file.js')
const userPath = process.argv[2];



const onRoutes = (routes) =>{
  const ext = path.extname(routes); //para encontrar la extension
  if (ext === '.md'){ //verificar si es md
    fs.readFile(routes, 'utf-8', (err, data)=>{ // lee el contenido del archivo
      if (err) throw err;
      const links = findLinks(data);
      console.log(links)
      return links;
    })
  } else {
    console.log('No es un archivo .md')
  }
};
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
    console.log(allLinks);
    
  }
  return allLinks;
}

// function onroutes(routes) {
//   return new Promise((resolve, reject =>{
//     if(routes){
//       let files = fileModule.filesFromPath(routes)
//     }
//     fs.readFile('README.md', 'utf-8', (err, data) => {
//       if(err) {
//         console.log('error: ', err);
//       } else {
//         let links = data.match(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gi)
//         console.log(links);
    
//       }
//     });
//   }))
// }


// function main(pathParam) {
//   return new Promise((resolve, reject) => {
//     if (pathParam) {
//       let files = reader.getMdFilesFromPath(pathParam)       // SABER CUANDO UNA RUTA ES RELATIVA USAR MODULO PATH DE NODE
      
//       if (files !== undefined) {
//         let filePromises = files.map(file => {
//           return reader.readMdFile(file)
//         })
  
//         Promise.all(filePromises).then((arrayData) => {
//           var links = arrayData.flatMap((data) => {
//             return data.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
//           })
//           resolve(links)
//         })
//       } else {
//         reject()
//       }
//     }else {
//       reject(err)
//     }  
//   })
// }


const mdLinks = (userPath) => {
  return onRoutes(userPath)
};
mdLinks(userPath);