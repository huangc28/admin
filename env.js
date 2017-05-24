const devEnv = {
  CLIENT_API_HOST: 'http://localhost:3005/api',
  ERP_API_HOST: 'http://localhost:3001',
  IMAGE_HOST: 'http://localhost:3001/clientImgs/gallery',
}

const prodEnv = {
  CLIENT_API_HOST: 'http://localhost:3005/api',
  ERP_API_HOST: 'http://localhost:3001',
  IMAGE_HOST: 'http://localhost:3001/clientImgs/gallery',
}

export default function env () {
  if (process.env.NODE_ENV === 'production') {
    return prodEnv
  }

  return devEnv
}