// Centralized OpenAPI spec for the API
// Keep this file focused on the spec only to avoid long route files

const docs: any = {
  openapi: '3.0.3',
  info: {
    title: 'PalaGuideBot API',
    version: '1.0.0',
    description: 'API documentation for PalaGuideBot (AdonisJS v6).',
  },
  servers: [{ url: 'https://api.palaguidebot.fr', description: 'Production server' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {},
}

function addPath(method: string, path: string, operation: any) {
  if (!docs.paths[path]) docs.paths[path] = {}
  docs.paths[path][method] = operation
}

// --- Begin endpoints ---
addPath('get', '/bot/statistics', {
  tags: ['bot'],
  summary: 'Get bot statistics',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('post', '/bot/commands', {
  tags: ['bot'],
  summary: 'Record a command interaction',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('post', '/bot/guilds', {
  tags: ['bot'],
  summary: 'Update bot guilds list',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              icon: { type: 'string' },
              memberCount: { type: 'number' },
              id: { type: 'string' },
            },
            required: ['name', 'memberCount', 'id'],
          },
        },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('post', '/bot/users', {
  tags: ['bot'],
  summary: 'Update bot users count',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { type: 'object', properties: { users: { type: 'number' } }, required: ['users'] },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Events
addPath('get', '/events/qdf', {
  tags: ['events'],
  summary: 'Faction quest',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/events/on-your-marks', {
  tags: ['events'],
  summary: 'On your marks',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/events/daily', {
  tags: ['events'],
  summary: 'Agenda events',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Leaderboard
addPath('get', '/leaderboard/{category}', {
  tags: ['leaderboard'],
  summary: 'Get leaderboard by category',
  parameters: [
    {
      name: 'category',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        enum: [
          'alliance',
          'boss',
          'chorus',
          'clicker',
          'egg_hunt',
          'end',
          'factions',
          'job.alchemist',
          'job.hunter',
          'job.farmer',
          'job.miner',
          'koth',
          'money',
        ],
      },
    },
    { name: 'from', in: 'query', schema: { type: 'string', format: 'date' } },
    { name: 'to', in: 'query', schema: { type: 'string', format: 'date' } },
  ],
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/leaderboard/trixium/{category}', {
  tags: ['leaderboard'],
  summary: 'Get trixium leaderboard',
  parameters: [
    {
      name: 'category',
      in: 'path',
      required: true,
      schema: { type: 'string', enum: ['player', 'faction'] },
    },
    { name: 'from', in: 'query', schema: { type: 'string', format: 'date' } },
    { name: 'to', in: 'query', schema: { type: 'string', format: 'date' } },
  ],
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Link/Minecraft
addPath('post', '/link/generate-token', {
  tags: ['link'],
  summary: 'Generate link token',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: { discordId: { type: 'string' } },
          required: ['discordId'],
        },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('post', '/link/verify-token', {
  tags: ['link'],
  summary: 'Verify link token',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: { minecraftUUID: { type: 'string' }, token: { type: 'string' } },
          required: ['minecraftUUID', 'token'],
        },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/link/discord/{discordId}', {
  tags: ['link'],
  summary: 'Get linked Minecraft by Discord',
  parameters: [{ name: 'discordId', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'OK' },
    404: { description: 'Not found' },
    401: { description: 'Unauthorized' },
  },
})
addPath('delete', '/link/discord/{discordId}', {
  tags: ['link'],
  summary: 'Unlink by Discord',
  parameters: [{ name: 'discordId', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'OK' },
    404: { description: 'Not found' },
    401: { description: 'Unauthorized' },
  },
})
addPath('get', '/link/discord', {
  tags: ['link'],
  summary: 'List linked Discord IDs',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/link/minecraft/{minecraftUUID}', {
  tags: ['link'],
  summary: 'Get linked Discord by Minecraft',
  parameters: [{ name: 'minecraftUUID', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'OK' },
    404: { description: 'Not found' },
    401: { description: 'Unauthorized' },
  },
})
addPath('delete', '/link/minecraft/{minecraftUUID}', {
  tags: ['link'],
  summary: 'Unlink by Minecraft',
  parameters: [{ name: 'minecraftUUID', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'OK' },
    404: { description: 'Not found' },
    401: { description: 'Unauthorized' },
  },
})
addPath('get', '/link/minecraft', {
  tags: ['link'],
  summary: 'List linked Minecraft UUIDs',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Other / Giveaways
addPath('get', '/giveaways', {
  tags: ['giveaways'],
  summary: 'List giveaways',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/giveaways/active', {
  tags: ['giveaways'],
  summary: 'Active giveaway',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/giveaways/check', {
  tags: ['giveaways'],
  summary: 'Check active state',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/giveaways/{id}', {
  tags: ['giveaways'],
  summary: 'Get giveaway by id',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'OK' },
    404: { description: 'Not found' },
    401: { description: 'Unauthorized' },
  },
})
addPath('post', '/giveaways', {
  tags: ['giveaways'],
  summary: 'Create giveaway',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            start: { type: 'string', format: 'date-time' },
            end: { type: 'string', format: 'date-time' },
            prizes: { type: 'array', items: { type: 'string' } },
          },
          required: ['title', 'start', 'end', 'prizes'],
        },
      },
    },
  },
  responses: { 201: { description: 'Created' }, 401: { description: 'Unauthorized' } },
})
addPath('put', '/giveaways/{id}', {
  tags: ['giveaways'],
  summary: 'Update giveaway',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            active: { type: 'boolean' },
            start: { type: 'string', format: 'date-time' },
            end: { type: 'string', format: 'date-time' },
            prizes: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('delete', '/giveaways/{id}', {
  tags: ['giveaways'],
  summary: 'Delete giveaway',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  responses: { 204: { description: 'No Content' }, 401: { description: 'Unauthorized' } },
})
addPath('post', '/giveaways/{id}/participate', {
  tags: ['giveaways'],
  summary: 'Participate',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('post', '/giveaways/{id}/leave', {
  tags: ['giveaways'],
  summary: 'Leave',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('post', '/giveaways/{id}/draw', {
  tags: ['giveaways'],
  summary: 'Draw winners',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { type: 'object', properties: { count: { type: 'number' } }, required: ['count'] },
      },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/update', {
  tags: ['other'],
  summary: 'Statistics scheduler update',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Paladium
addPath('get', '/paladium/seasons', {
  tags: ['paladium'],
  summary: 'Seasons list',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Status
addPath('get', '/status/database', {
  tags: ['status'],
  summary: 'Database status',
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad' },
    401: { description: 'Unauthorized' },
  },
})
addPath('get', '/status/paladium', {
  tags: ['status'],
  summary: 'Paladium servers informations',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Unique
addPath('get', '/players', {
  tags: ['players'],
  summary: 'Latest players added (latest when ?latest=1)',
  parameters: [{ name: 'latest', in: 'query', schema: { type: 'string' } }],
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/players/{username}', {
  tags: ['players'],
  summary: 'Get player',
  parameters: [
    { name: 'username', in: 'path', required: true, schema: { type: 'string' } },
    { name: 'from', in: 'query', schema: { type: 'string', format: 'date' } },
    { name: 'to', in: 'query', schema: { type: 'string', format: 'date' } },
  ],
  responses: {
    200: { description: 'OK' },
    404: { description: 'Not found' },
    401: { description: 'Unauthorized' },
  },
})
addPath('post', '/players/{username}', {
  tags: ['players'],
  summary: 'Create player',
  parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad request' },
    401: { description: 'Unauthorized' },
  },
})
addPath('get', '/players/{username}/clicker', {
  tags: ['players'],
  summary: 'Get clicker info',
  parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'OK' },
    404: { description: 'Not found' },
    401: { description: 'Unauthorized' },
  },
})
addPath('get', '/players/{username}/flags', {
  tags: ['players'],
  summary: 'Get user flags',
  parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'OK' },
    404: { description: 'Not found' },
    401: { description: 'Unauthorized' },
  },
})
addPath('get', '/players/{username}/jobs', {
  tags: ['players'],
  summary: 'Get player jobs',
  parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/players/{username}/wrapped', {
  tags: ['players'],
  summary: 'Get player wrapped',
  parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Usage
addPath('get', '/usage/statistics', {
  tags: ['usage'],
  summary: 'Usage statistics',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Utils
addPath('post', '/utils/jobs/calculate', {
  tags: ['utils'],
  summary: 'Calculate jobs xp',
  requestBody: {
    required: true,
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/JobsCalculateInput' } },
    },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/utils/jobs/items', {
  tags: ['utils'],
  summary: 'Jobs items',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/utils/jobs/levels', {
  tags: ['utils'],
  summary: 'Jobs levels',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('post', '/utils/pog/calculate', {
  tags: ['utils'],
  summary: 'Calculate POG',
  requestBody: {
    required: true,
    content: { 'application/json': { schema: { $ref: '#/components/schemas/PogCalculateInput' } } },
  },
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/utils/pog/items', {
  tags: ['utils'],
  summary: 'POG items',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/utils/clicker/buildings', {
  tags: ['utils'],
  summary: 'Clicker buildings',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/utils/clicker/upgrades', {
  tags: ['utils'],
  summary: 'Clicker upgrades',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/utils/craft/{item}/{amount}', {
  tags: ['utils'],
  summary: 'Craft compute',
  parameters: [
    { name: 'item', in: 'path', required: true, schema: { type: 'string' } },
    { name: 'amount', in: 'path', required: true, schema: { type: 'string' } },
  ],
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})
addPath('get', '/utils/craft/items', {
  tags: ['utils'],
  summary: 'Craft items',
  responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } },
})

// Schemas
docs.components.schemas = {
  JobsCalculateInput: {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          mode: { type: 'string', enum: ['standard', 'reverse'] },
          job: { type: 'string' },
          currentLevel: { type: 'number', minimum: 0 },
          bonusXp: { type: 'number', minimum: 0, maximum: 500 },
          currentXp: { type: 'number', minimum: 0 },
          targetLevel: { type: 'number', minimum: 0 },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                quantity: { type: 'number' },
                itemId: { type: 'string' },
                action: { type: 'string' },
              },
              required: ['quantity', 'itemId', 'action'],
            },
          },
        },
        required: ['mode', 'job', 'currentLevel', 'bonusXp', 'currentXp'],
      },
    },
    required: ['body'],
  },
  PogCalculateInput: {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          block: { type: 'string' },
          currentLevel: { type: 'number', minimum: 0, maximum: 100 },
          currentXp: { type: 'number' },
          goodPickaxePercentage: { type: 'number', minimum: 0, maximum: 40 },
          experiencedPickaxePercentage: { type: 'number', minimum: 0, maximum: 30 },
        },
        required: ['block', 'currentLevel'],
      },
    },
    required: ['body'],
  },
}

export default docs
