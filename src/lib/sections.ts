export type SectionId =
  | 'assistant-ui'
  | 'auth'
  | 'models'
  | 'agents'
  | 'channels'
  | 'messages'
  | 'tools'
  | 'gateway'
  | 'hooks'
  | 'session'

export type SectionMeta = {
  id: SectionId
  label: string
  description: string
}

export function getNextSectionId(sections: SectionMeta[], currentId: SectionId): SectionId {
  const currentIndex = sections.findIndex((section) => section.id === currentId)

  if (currentIndex < 0 || currentIndex + 1 >= sections.length) {
    return sections[0]?.id ?? currentId
  }

  return sections[currentIndex + 1].id
}
