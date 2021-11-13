declare module 'ajv-formats' {
  import type Ajv from 'ajv'

  declare type FormatName = 'date' | 'time' | 'date-time' | 'duration' | 'uri' | 'uri-reference' | 'uri-template' | 'url' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'regex' | 'uuid' | 'json-pointer' | 'json-pointer-uri-fragment' | 'relative-json-pointer' | 'byte' | 'int32' | 'int64' | 'float' | 'double' | 'password' | 'binary'
  declare type FormatMode = 'fast' | 'full'
  declare interface FormatOptions {
    keywords?: true,
    mode?: FormatMode,
    formats?: FormatName[],
  }

  declare type FormatsPluginOptions = FormatName[] | FormatOptions

  declare module.exports: (ajv: Ajv, opts?: FormatsPluginOptions) => Ajv
}
