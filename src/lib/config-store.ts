import { derived, writable } from 'svelte/store'
import { getNextSectionId, type SectionId, type SectionMeta } from './sections'

export type OpenClawConfig = {
  ui: {
    assistant: {
      name: string
      avatar: string
    }
  }
  auth: {
    profiles: Record<string, { provider: string; mode: string }>
    order: Record<string, string[]>
    cooldowns: {
      billingBackoffHours: number
    }
  }
  models: {
    mode: 'merge' | 'replace'
    providers: Record<string, { baseUrl: string; models: Array<{ id: string }> }>
  }
  agents: {
    defaults: {
      workspace: string
      model: string
      heartbeat: {
        every: string
      }
    }
    list: Array<{ id: string }>
  }
  channels: {
    whatsapp: { enabled: boolean }
    telegram: { enabled: boolean }
    discord: { enabled: boolean }
    slack: { enabled: boolean }
  }
  messages: {
    messagePrefix: string
    queue: {
      mode: 'steer' | 'followup' | 'collect' | 'queue' | 'interrupt'
    }
    groupChat: {
      mentionPatterns: string[]
    }
  }
  tools: {
    profile: 'minimal' | 'coding' | 'messaging' | 'full'
  }
  gateway: {
    bind: 'auto' | 'loopback' | 'lan' | 'tailnet' | 'custom'
    port: number
    auth: {
      mode: 'none' | 'token' | 'password' | 'trusted-proxy'
    }
  }
  hooks: {
    enabled: boolean
    path: string
    token: string
    defaultSessionKey: string
  }
  session: {
    scope: 'per-sender' | 'global'
    dmScope: 'main' | 'per-peer' | 'per-channel-peer' | 'per-account-channel-peer'
    mainKey: string
    reset: {
      mode: 'daily' | 'idle'
      idleMinutes: number
      atHour: number
    }
  }
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 'assistant-ui',
    label: 'Assistant UI',
    description: 'Assistant display name and avatar basics.',
  },
  {
    id: 'auth',
    label: 'Auth',
    description: 'Auth profiles, order, and cooldown behavior.',
  },
  {
    id: 'models',
    label: 'Models',
    description: 'Model catalog mode and provider definitions.',
  },
  {
    id: 'agents',
    label: 'Agents',
    description: 'Agent defaults and explicit agent list.',
  },
  {
    id: 'channels',
    label: 'Channels',
    description: 'Core channel connectivity settings.',
  },
  {
    id: 'messages',
    label: 'Messages',
    description: 'Queue and mention gating behavior.',
  },
  {
    id: 'tools',
    label: 'Tools',
    description: 'Tool profile and policy controls.',
  },
  {
    id: 'gateway',
    label: 'Gateway',
    description: 'Bind, port, and auth mode basics.',
  },
  {
    id: 'hooks',
    label: 'Hooks',
    description: 'Webhook ingress and token defaults.',
  },
  {
    id: 'session',
    label: 'Session',
    description: 'Session scope, DM scope, and reset policy.',
  },
] as const

const initialConfig: OpenClawConfig = {
  ui: {
    assistant: {
      name: 'Clawd',
      avatar: 'lobster',
    },
  },
  auth: {
    profiles: {
      default: {
        provider: 'anthropic',
        mode: 'api_key',
      },
    },
    order: {
      anthropic: ['default'],
    },
    cooldowns: {
      billingBackoffHours: 5,
    },
  },
  models: {
    mode: 'merge',
    providers: {
      anthropic: {
        baseUrl: 'https://api.anthropic.com',
        models: [{ id: 'claude-opus-4-6' }],
      },
    },
  },
  agents: {
    defaults: {
      workspace: '~/.openclaw/workspace',
      model: 'anthropic/claude-opus-4-6',
      heartbeat: {
        every: '30m',
      },
    },
    list: [{ id: 'main' }],
  },
  channels: {
    whatsapp: { enabled: false },
    telegram: { enabled: false },
    discord: { enabled: false },
    slack: { enabled: false },
  },
  messages: {
    messagePrefix: '[openclaw]',
    queue: {
      mode: 'steer',
    },
    groupChat: {
      mentionPatterns: ['(?i)\\bclawd\\b'],
    },
  },
  tools: {
    profile: 'coding',
  },
  gateway: {
    bind: 'loopback',
    port: 18789,
    auth: {
      mode: 'token',
    },
  },
  hooks: {
    enabled: false,
    path: '/hooks',
    token: '',
    defaultSessionKey: 'hooks-default',
  },
  session: {
    scope: 'per-sender',
    dmScope: 'main',
    mainKey: 'main',
    reset: {
      mode: 'idle',
      idleMinutes: 720,
      atHour: 4,
    },
  },
}

const activeSectionId = writable<SectionId>(SECTIONS[0].id)

export const openClawConfig = writable<OpenClawConfig>(initialConfig)

export const currentSection = derived(activeSectionId, (currentId) => {
  const section = SECTIONS.find((candidate) => candidate.id === currentId)
  return section ?? SECTIONS[0]
})

export function setActiveSection(nextSectionId: SectionId) {
  activeSectionId.set(nextSectionId)
}

export function goToNextSection() {
  activeSectionId.update((currentId) => getNextSectionId(SECTIONS, currentId))
}

export function updateAssistantIdentity(
  assistantPatch: Partial<OpenClawConfig['ui']['assistant']>,
) {
  openClawConfig.update((current) => ({
    ...current,
    ui: {
      ...current.ui,
      assistant: {
        ...current.ui.assistant,
        ...assistantPatch,
      },
    },
  }))
}

export function updateIdentity(identityPatch: Partial<OpenClawConfig['ui']['assistant']>) {
  updateAssistantIdentity(identityPatch)
}

export function resetConfigStore() {
  openClawConfig.set(initialConfig)
  activeSectionId.set(SECTIONS[0].id)
}
