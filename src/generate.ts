import { configGenerator } from './fs/write';
import type { Alias } from './types';

export function generate(aliases: Alias[], path:string) {
  const generatedAliases = aliases.map((object)=>{
      return {
        [`${object.find}/*`] : [`${object.replacement}/*`]
      }
    }).reduce((obj, item)=>{
      {
        return {...obj,...item}
      }
    })

  configGenerator(path,generatedAliases)
}