import { describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import {
  currentSection,
  goToNextSection,
  openClawConfig,
  resetConfigStore,
  setActiveSection,
  updateAssistantIdentity,
} from './config-store'

describe('config store', () => {
  it('updates assistant ui fields', () => {
    resetConfigStore()
    updateAssistantIdentity({ name: 'OpenClawd' })

    expect(get(openClawConfig).ui.assistant.name).toBe('OpenClawd')
  })

  it('switches sections and advances to next section', () => {
    resetConfigStore()
    setActiveSection('messages')
    expect(get(currentSection).id).toBe('messages')

    goToNextSection()
    expect(get(currentSection).id).toBe('tools')
  })
})
