import fs from 'fs';
import {defaultJson } from '../constants';
import { GeneratedAliases } from '../types';

function checkAccess(config:string){
  console.log("Checking access ...")
  fs.access(config, fs.constants.W_OK, function(err){
    if(err) {
      console.error("We have a problem :", err);
      process.exit()
    }
    else {
      console.log("Checking complete, begin next step.");
    }
  })
}

function checkFile(config:string){
  if(fs.existsSync(config)) {
    console.log(`${config} exists :`)
  } else {
    console.log(`${config} don't exists, creating file`)
    fs.writeFileSync(config,JSON.stringify(defaultJson, null, 2))
  }
}

export function configGenerator(config:string, aliases:GeneratedAliases) {
  checkAccess(config);
  checkFile(config);
  let file = JSON.parse(fs.readFileSync(config).toString())
  file.compilerOptions.paths = {...file.compilerOptions.paths, ...aliases}
  fs.writeFileSync(config,JSON.stringify(file, null, 2))
}