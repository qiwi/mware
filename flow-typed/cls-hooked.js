declare module 'cls-hooked' {
  declare type IAny = any
  
  declare export type INamespace = {
    run: (fn: Function) => void,
    set: (name: string, data: IAny) => void,
    get: (name: string) => IAny,
    bindEmitter: (fn: Function) => void
  }
  
  declare module.exports: {
    createNamespace: (name: string) => INamespace,
    getNamespace: (name: string) => INamespace
  }
}
