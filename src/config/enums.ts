export enum DbConfig {
  User = 'dbConfig.user',
  Password = 'dbConfig.password',
  DbHost = 'dbConfig.dbHost',
  DbName = 'dbConfig.dbName',
  DbPort = 'dbConfig.dbPort',
}
export enum EnvConfig {
  Port = 'envConfig.port',
  NodeEnv = 'envConfig.nodeEnv',
  IsProd = 'envConfig.isProd',
  IsDev = 'envConfig.isDev',
}

export enum JwtConfig {
  AtSecret = 'jwtConfig.atSecret',
  AtExpiration = 'jwtConfig.atExpiration',
  RtSecret = 'jwtConfig.rtSecret',
  RtExpiration = 'jwtConfig.rtExpiration',
}
