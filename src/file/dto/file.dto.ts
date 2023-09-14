export enum Sex {
  male = 'male',
  female = 'female',
}

export class FileChunksDto {
  chunks: number
  fileData: string
  fileMd5Value: string
  order: number
}
