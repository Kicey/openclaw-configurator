<script lang="ts">
  import {
    SECTIONS,
    currentSection,
    openClawConfig,
    setActiveSection,
    updateAssistantIdentity,
  } from './lib/config-store'
  import type { SectionId } from './lib/sections'

  function handleSectionClick(nextSection: SectionId) {
    setActiveSection(nextSection)
  }
</script>

<div class="app-shell">
  <aside class="sidebar">
    <h1>OpenClaw Configurator</h1>
    <p>Phase 1 shell with section routing and shared store.</p>

    <ul class="nav-list" aria-label="Configuration sections">
      {#each SECTIONS as section}
        <li>
          <button
            class:active={$currentSection.id === section.id}
            class="nav-item"
            on:click={() => handleSectionClick(section.id)}
          >
            {section.label}
          </button>
        </li>
      {/each}
    </ul>
  </aside>

  <main class="content">
    <header class="content-header">
      <h2>{$currentSection.label}</h2>
      <p>{$currentSection.description}</p>
    </header>

    {#if $currentSection.id === 'assistant-ui'}
      <section class="panel" aria-label="Identity settings">
        <h3>Assistant UI</h3>
        <div class="field-grid">
          <label>
            Name
            <input
              value={$openClawConfig.ui.assistant.name}
              on:input={(event) => updateAssistantIdentity({ name: event.currentTarget.value })}
              placeholder="Clawd"
            />
          </label>

          <label>
            Avatar
            <input
              value={$openClawConfig.ui.assistant.avatar}
              on:input={(event) =>
                updateAssistantIdentity({ avatar: event.currentTarget.value })}
              placeholder="lobster"
            />
          </label>
        </div>
      </section>
    {:else}
      <section class="panel">
        <h3>{$currentSection.label}</h3>
        <p>This section shell is ready for Phase 2 data and validation wiring.</p>
      </section>
    {/if}

    <p class="meta">Config preview keys: {Object.keys($openClawConfig).join(', ')}</p>
  </main>
</div>
