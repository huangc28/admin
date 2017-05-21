const devEnv = {
  CLIENT_API_HOST: 'http://localhost:3005/api',
  ERP_API_HOST: 'http://localhost:3001',
}

const prodEnv = {
  CLIENT_API_HOST: 'http://localhost:3005/api',
  ERP_API_HOST: 'http://localhost:3001',
}

export default function env () {
  if (process.env.NODE_ENV === 'production') {
    return prodEnv
  }

  return devEnv
}