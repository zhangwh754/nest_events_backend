import { resolve, basename } from 'path'
import { existsSync, createReadStream, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'

import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import type { Response } from 'express'
import { zip } from 'compressing'

import { FileChunksDto } from './dto/file.dto'

@Controller('file')
export class FileController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async upload(@UploadedFile() file: any) {
    // console.log('file', file)
    return [file.filename]
  }

  @UseInterceptors(FilesInterceptor('files'))
  @Post('uploadMulti')
  async uploadMulti(@UploadedFiles() files: any) {
    // console.log(files)
    return files.map(item => item.filename)
  }

  @Get('export/:filenames')
  async download(@Param('filenames') filenames: string, @Res() response: Response) {
    try {
      const filenameArr = filenames.split(',').map(filename => resolve(process.cwd(), `public/resource/${filename}`))

      const fileStream = new zip.Stream()

      filenameArr.forEach(filename => {
        if (existsSync(filename)) {
          fileStream.addEntry(filename)
        } else {
          throw `文件[${basename(filename)}]不存在`
        }
      })

      response.setHeader('Content-Type', 'application/octet-stream')

      response.setHeader('Content-Disposition', `attachment; filename=${new Date().getTime()}.zip`)

      fileStream.pipe(response)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('stream')
  async getImageStream(@Body('img') imgName, @Res() res: Response) {
    console.log(imgName)

    try {
      // 获取图片文件的绝对路径（假设图片存储在 /path/to/images 目录下）
      const imagePath = resolve(process.cwd(), `public/resource/${imgName}`)

      // 检查图片是否存在
      if (existsSync(imagePath)) {
        // 读取图片文件并发送给客户端
        const imageStream = createReadStream(imagePath)
        imageStream.pipe(res)
        res.status(200)
      } else {
        // 如果图片不存在，返回 404 Not Found
        res.status(404).send({
          statusCode: 404,
          message: 'Image not found.',
          result: 'Image not found.',
        })
      }
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: error,
        result: error,
      })
    }
  }

  @Get('base64')
  async getFileBase64() {
    try {
      // 获取图片文件的绝对路径（假设图片存储在 /path/to/images 目录下）
      const filePath = resolve(process.cwd(), `public/resource/test.pdf`)

      // 检查图片是否存在
      if (existsSync(filePath)) {
        // 读取图片文件并发送给客户端
        const fileBuffer = readFileSync(filePath)
        const base64Data = fileBuffer.toString('base64')
        return encodeURIComponent(base64Data)
      } else {
        // 如果图片不存在，返回 404 Not Found
        throw new HttpException('文件不存在', HttpStatus.BAD_REQUEST)
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('upload/chunks')
  async uploadChunks(@Body() fileChunksDto: FileChunksDto) {
    // 写入文件
    const filePath = resolve(process.cwd(), `public/temp/${fileChunksDto.fileMd5Value}`)
    const chunkFilePath = resolve(filePath, fileChunksDto.order.toString()) // 构建切片文件完整路径

    if (existsSync(chunkFilePath)) {
      return '秒传成功'
    } else {
      mkdirSync(filePath, { recursive: true }) // 不存在就创建对应的文件夹
      writeFileSync(chunkFilePath, fileChunksDto.fileData, { encoding: 'base64' }) // 写入切片
      return '上传成功'
    }
  }

  @Get('upload/merge/:md5Value')
  async mergeChunks(@Param('md5Value') md5Value: string) {
    const baseFilePath = resolve(process.cwd(), 'public/temp')
    const folderPath = resolve(baseFilePath, md5Value)

    const chunkFiles = readdirSync(folderPath)
    const sortedChunkFiles = chunkFiles
      .map(chunkFile => resolve(folderPath, chunkFile))
      .sort((a, b) => parseInt(a) - parseInt(b))

    const combinedData = sortedChunkFiles.map(chunkFile => readFileSync(chunkFile), { encoding: 'base64' }).join('')

    const mergedFilePath = resolve(process.cwd(), 'public/resource', `${md5Value}.pdf`) // 合并后的文件路径
    writeFileSync(mergedFilePath, combinedData, { encoding: 'base64' })

    return 'Chunks merged successfully'
  }
}
