// pages/api/generate-mediamtx.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

type CameraPaths = {
  [key: string]: string
}

type RequestBody = {
  cameraPaths: CameraPaths
}

export default function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { cameraPaths } = req.body as RequestBody

  if (!cameraPaths || typeof cameraPaths !== 'object') {
    return res.status(400).json({ error: 'Invalid cameraPaths' })
  }

  const config = {
    webrtc: true,
    webrtcAddress: ':8889',
    webrtcEncryption: false,
    webrtcAllowOrigin: '*',
    rtmp: true,
    rtmpAddress: ':1935',
    paths: {} as Record<string, { source: string }>
  }

  for (const [name, url] of Object.entries(cameraPaths)) {
    config.paths[name] = { source: url }
  }

  try {
    const yamlStr = yaml.dump(config, { noRefs: true })
    const filePath = path.join(process.cwd(), 'mediamtx.yml')
    fs.writeFileSync(filePath, yamlStr, 'utf8')

    return res.status(200).json({ message: 'mediamtx.yml generated', filePath })
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to write YAML', details: err.message })
  }
}
