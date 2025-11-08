import Busboy from 'busboy'
import { IncomingMessage } from 'http'
import { FastifyRequest } from 'fastify'

export type ParsedFile = { buffer: Buffer; mimetype: string }

export interface FormData<TFields = Record<string, unknown>> {
  files: Record<string, ParsedFile | ParsedFile[]>
  fields: TFields
}

export async function parseMultipartFormData<TFields = Record<string, unknown>>(
  request: FastifyRequest
): Promise<FormData<TFields>> {
  const contentType = request.headers['content-type']
  if (!contentType || !contentType.includes('multipart/form-data')) {
    throw new Error('Content-Type da requisição não é multipart/form-data')
  }

  const busboy = Busboy({ headers: request.headers })

  const result: FormData = {
    files: {},
    fields: {},
  }

  return new Promise((resolve, reject) => {
    busboy.on('file', (fieldname, file, info) => {
      const { mimeType } = info
      const chunks: Buffer[] = []

      file.on('data', (chunk) => {
        chunks.push(chunk)
      })

      file.on('end', () => {
        const buffer = Buffer.concat(chunks)
        const fileObj = { buffer, mimetype: mimeType }

        if (!result.files[fieldname]) {
          result.files[fieldname] = fileObj
        } else if (Array.isArray(result.files[fieldname])) {
          ;(result.files[fieldname] as ParsedFile[]).push(fileObj)
        } else {
          result.files[fieldname] = [
            result.files[fieldname] as ParsedFile,
            fileObj,
          ]
        }
      })
    })

    busboy.on('field', (fieldname, value) => {
      result.fields[fieldname] = value
    })

    busboy.on('error', (err) => {
      reject(err)
    })

    busboy.on('finish', () => {
      resolve(result as FormData<TFields>)
    })

    const req = request.raw as IncomingMessage
    req.pipe(busboy)
  })
}
