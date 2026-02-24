export const PAGINATION_LIMIT = 20

export enum STAGE {
  PROD = 'PROD',
  HOMOLOG = 'HOMOLOG',
  DEV = 'DEV',
  TEST = 'TEST',
}

export class Environments {
  static stage: STAGE = (process.env.STAGE as STAGE) || STAGE.DEV

  static database_url: string =
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/postgres'

  // static bucketName: string =
  //   (process.env.BUCKET_NAME as string) || 'bucket-test'

  // static region: string = (process.env.AWS_REGION as string) || 'us-east-1'

  // static awsAccessKeyId: string =
  //   (process.env.AWS_ACCESS_KEY_ID as string) || ''

  // static awsSecretAccessKey: string =
  //   (process.env.AWS_SECRET_ACCESS_KEY as string) || ''
}
