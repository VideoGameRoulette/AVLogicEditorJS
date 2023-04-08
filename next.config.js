const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  reactStrictMode: true,
  basePath: isDev ? '' : '/AVLogicEditorJS',
  assetPrefix: isDev ? '' : '/AVLogicEditorJS',
}

module.exports = nextConfig;
