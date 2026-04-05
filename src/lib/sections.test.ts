import { describe, expect, it } from 'vitest'
import { getNextSectionId, type SectionMeta } from './sections'

const sections: SectionMeta[] = [
  { id: 'assistant-ui', label: 'Assistant UI', description: '' },
  { id: 'auth', label: 'Auth', description: '' },
  { id: 'channels', label: 'Channels', description: '' },
]

describe('getNextSectionId', () => {
  it('returns next section when current exists and is not last', () => {
    expect(getNextSectionId(sections, 'assistant-ui')).toBe('auth')
  })

  it('wraps around to first section when current is last', () => {
    expect(getNextSectionId(sections, 'channels')).toBe('assistant-ui')
  })
})
