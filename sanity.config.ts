import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import schemaTypes from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Energy Nexus',

  projectId: 'zgs7rdoe',
  dataset: 'nexus-production',
  basePath: '/admin',
  apiVersion: '2024-03-18',
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
