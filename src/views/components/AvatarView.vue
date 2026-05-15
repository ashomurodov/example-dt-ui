<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtAvatar, DtAvatarLabel, DtAvatarGroup, DtAvatarAdd, type AvatarSize, type AvatarGroupUser } from '@/components/ui/avatar'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const installSnippet = `npx dt-ui add avatar`

const fallbackTab = ref('preview')
const sizesTab = ref('preview')
const borderedTab = ref('preview')
const statusTab = ref('preview')
const customStatusTab = ref('preview')
const labelTab = ref('preview')
const labelCustomTab = ref('preview')
const groupTab = ref('preview')
const groupSlotTab = ref('preview')
const addTab = ref('preview')
const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const sampleImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces'

const fallbackCode = `<!-- Image (loads successfully) -->
<DtAvatar src="/avatars/mardon.jpg" name="Mardon Shonazarov" />

<!-- Initials derived from name -->
<DtAvatar name="Mardon Shonazarov" />

<!-- Explicit initials -->
<DtAvatar initials="MS" />

<!-- Nothing provided -> user icon -->
<DtAvatar />`

const sizesCode = `<DtAvatar size="xs" name="MS" />
<DtAvatar size="sm" name="MS" />
<DtAvatar size="md" name="MS" />
<DtAvatar size="lg" name="MS" />
<DtAvatar size="xl" name="MS" />
<DtAvatar size="2xl" name="MS" />`

const borderedCode = `<DtAvatar src="/avatars/mardon.jpg" bordered />
<DtAvatar name="Mardon Shonazarov" size="lg" bordered />
<DtAvatar size="xl" bordered />`

const statusCode = `<DtAvatar :src="img" status="online" />
<DtAvatar :src="img" status="offline" />
<DtAvatar name="MS" status="online" size="lg" />`

const customStatusCode = `<!-- Anything inside #status — brand icon, count badge, verified mark, etc. -->
<DtAvatar :src="img">
  <template #status>
    <svg viewBox="0 0 16 16" fill="#3b82f6">
      <path d="M14.96 1.04L1.04 6.96l4.94 1.06L13 3l-5.04 6.02 1.06 4.94z" />
    </svg>
  </template>
</DtAvatar>

<!-- Numeric count badge -->
<DtAvatar :src="img">
  <template #status>
    <span class="count-badge">8</span>
  </template>
</DtAvatar>

<!-- Verified checkmark on a green badge -->
<DtAvatar :src="img">
  <template #status>
    <span class="verified">
      <svg viewBox="0 0 12 12" fill="white">
        <path d="M5 8.5l-2-2 .9-.9L5 6.7l3.1-3.1.9.9z" />
      </svg>
    </span>
  </template>
</DtAvatar>`

const labelCode = `<!-- Single name -->
<DtAvatarLabel name="Mardon Shonazarov" />

<!-- Name + secondary text -->
<DtAvatarLabel
  name="Mardon Shonazarov"
  description="mardon.shonazarov@gmail.com"
  :src="img"
  size="md"
/>

<!-- Phone instead of email -->
<DtAvatarLabel
  name="Mardon Shonazarov"
  description="+998 90 123 45 67"
  :src="img"
/>

<!-- Three sizes -->
<DtAvatarLabel name="Mardon Shonazarov" description="@mardon"   :src="img" size="sm" />
<DtAvatarLabel name="Mardon Shonazarov" description="@mardon"   :src="img" size="md" />
<DtAvatarLabel name="Mardon Shonazarov" description="@mardon"   :src="img" size="lg" />`

const teamUsers: AvatarGroupUser[] = [
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces', name: 'Mardon Shonazarov' },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces', name: 'Aziza R.' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces', name: 'Bobur T.' },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&h=160&fit=crop&crop=faces', name: 'Dilshoda K.' },
  { src: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=160&h=160&fit=crop&crop=faces', name: 'Eldor M.' },
  { src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&crop=faces', name: 'Farhod S.' },
  { name: 'Gulnoza A.' },
  { name: 'Husniya N.' },
  { name: 'Iskandar Q.' },
  { name: 'Jamshid B.' },
]

const groupCode = `<DtAvatarGroup :users="users" :max="5" size="md" show-add @add="invite" />

<!-- 'sm' and 'xs' sizes shrink the overlap proportionally -->
<DtAvatarGroup :users="users" :max="3" size="sm" />
<DtAvatarGroup :users="users" :max="3" size="xs" />`

const groupSlotCode = `<!-- Slot-based: full control over each avatar -->
<DtAvatarGroup size="md" show-add @add="invite">
  <DtAvatar src="/a.jpg" />
  <DtAvatar src="/b.jpg" bordered />
  <DtAvatar name="Mardon Shonazarov" />
  <DtAvatar initials="+12" />
</DtAvatarGroup>

<!-- Note: status indicators are hidden inside group stacks because the overlap
     clips them. Use a non-stacked layout if you need per-avatar status. -->`

const addCode = `<DtAvatarAdd size="xs" @click="invite" />
<DtAvatarAdd size="sm" @click="invite" />
<DtAvatarAdd size="md" @click="invite" />
<DtAvatarAdd size="md" disabled />`

function noop() { /* demo */ }

const labelCustomCode = `<!-- Description as a link -->
<DtAvatarLabel name="Mardon Shonazarov" :src="img">
  <template #description>
    <a href="mailto:m@example.com">m@example.com</a>
  </template>
</DtAvatarLabel>

<!-- Active-now indicator -->
<DtAvatarLabel name="Mardon Shonazarov" status="online" :src="img" size="lg">
  <template #description>
    <span style="color: var(--dt-color-success);">Active now</span>
  </template>
</DtAvatarLabel>

<!-- The status dot on the avatar already conveys "online"; the description text
     reinforces it. No need to repeat the bullet character. -->

<!-- Fully custom avatar (e.g. with a brand-icon status) -->
<DtAvatarLabel name="Mardon Shonazarov" description="Telegram: @mardon">
  <template #avatar="{ size }">
    <DtAvatar :size="size" :src="img">
      <template #status>
        <svg viewBox="0 0 16 16">...</svg>
      </template>
    </DtAvatar>
  </template>
</DtAvatarLabel>`

const sizeList: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '120px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '100px' },
  { key: 'desc', label: 'Description' },
]
const avatarPropsRows = [
  { name: 'src',      type: 'string',     default: '—',       desc: 'Image URL. Falls back if missing or fails to load.' },
  { name: 'alt',      type: 'string',     default: '—',       desc: 'Image alt text. Defaults to name.' },
  { name: 'name',     type: 'string',     default: '—',       desc: 'Full name; initials derived from first two words.' },
  { name: 'initials', type: 'string',     default: '—',       desc: 'Explicit 1–2 char override (wins over name).' },
  { name: 'size',     type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", desc: 'Box size (24/32/40/48/56/64).' },
  { name: 'bordered', type: 'boolean',    default: 'false',   desc: 'Outer 1px ring with a 2px breathing gap.' },
  { name: 'status',   type: "'online' | 'offline' | null",    default: 'null', desc: 'Built-in colored dot. Overridden by #status slot.' },
]

const labelPropsRows = [
  { name: 'name',        type: 'string',  default: 'required', desc: 'Primary text (bold).' },
  { name: 'description', type: 'string',  default: '—',        desc: 'Secondary text. Skip when using the #description slot.' },
  { name: 'size',        type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Avatar 32/40/48 and matching typography.' },
  { name: 'src / alt / initials / status / bordered', type: 'passthrough', default: '—', desc: 'Forwarded to the default DtAvatar.' },
]
</script>

<template>
  <DtPageView :title="t('nav.avatar')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.avatar.lead')" />

      <h2>Install</h2>
      <CodeBlock :code="installSnippet" lang="bash" />

      <h2>Fallback hierarchy</h2>
      <p>
        Pass an image; if it's missing or fails, the avatar falls back to initials, then to a
        generic user icon. You can also skip the image entirely and pass just <code>name</code>
        or <code>initials</code>.
      </p>
      <DtTabSwitcher v-model="fallbackTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="fallbackTab === 'preview'" class="dx-preview">
          <DtAvatar :src="sampleImg" name="Mardon Shonazarov" />
          <DtAvatar name="Mardon Shonazarov" />
          <DtAvatar initials="DT" />
          <DtAvatar />
        </div>
        <CodeBlock v-else :code="fallbackCode" lang="vue" />
      </div>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--align-end">
          <DtAvatar v-for="s in sizeList" :key="s" :size="s" name="Mardon Shonazarov" />
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Bordered</h2>
      <p>1px outer ring with a 2px transparent gap. Footprint stays the same.</p>
      <DtTabSwitcher v-model="borderedTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="borderedTab === 'preview'" class="dx-preview dx-preview--align-end">
          <DtAvatar :src="sampleImg" size="lg" bordered />
          <DtAvatar name="Mardon Shonazarov" size="lg" bordered />
          <DtAvatar size="lg" bordered />
          <DtAvatar :src="sampleImg" size="2xl" bordered />
        </div>
        <CodeBlock v-else :code="borderedCode" lang="vue" />
      </div>

      <h2>Status indicator</h2>
      <p>
        Pass <code>status="online"</code> or <code>"offline"</code> for the built-in colored
        dot. The component handles position, size, and the white halo against the avatar edge.
      </p>
      <DtTabSwitcher v-model="statusTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="statusTab === 'preview'" class="dx-preview dx-preview--align-end">
          <DtAvatar :src="sampleImg" status="online" />
          <DtAvatar :src="sampleImg" status="offline" />
          <DtAvatar name="MS" status="online" size="lg" />
          <DtAvatar status="offline" size="xl" />
        </div>
        <CodeBlock v-else :code="statusCode" lang="vue" />
      </div>

      <h3>Custom status content</h3>
      <p>
        Need a brand icon, a verified badge, or a count? Use the <code>#status</code> slot —
        the slot content fills the positioned wrapper. The avatar still handles the white halo.
      </p>
      <DtTabSwitcher v-model="customStatusTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="customStatusTab === 'preview'" class="dx-preview dx-preview--align-end">
          <!-- Telegram-ish blue paper plane -->
          <DtAvatar :src="sampleImg" size="lg">
            <template #status>
              <span class="dx-avatar-demo__brand" style="background: #229ED9;">
                <svg viewBox="0 0 16 16" fill="white" aria-hidden="true">
                  <path d="M14.96 1.04L1.04 6.96l4.94 1.06L13 3l-5.04 6.02 1.06 4.94z" />
                </svg>
              </span>
            </template>
          </DtAvatar>

          <!-- Numeric count badge -->
          <DtAvatar :src="sampleImg" size="lg">
            <template #status>
              <span class="dx-avatar-demo__count">8</span>
            </template>
          </DtAvatar>

          <!-- Verified checkmark on a green badge -->
          <DtAvatar :src="sampleImg" size="lg">
            <template #status>
              <span class="dx-avatar-demo__verified">
                <svg viewBox="0 0 12 12" fill="white" aria-hidden="true">
                  <path d="M5 8.5l-2.1-2.1.9-.9L5 6.7l3.2-3.2.9.9z" />
                </svg>
              </span>
            </template>
          </DtAvatar>
        </div>
        <CodeBlock v-else :code="customStatusCode" lang="vue" />
      </div>

      <h2>Avatar label group</h2>
      <p>
        <code>DtAvatarLabel</code> stacks an avatar with a name and an optional secondary line.
        The secondary line is a string by default, or anything you put in the
        <code>#description</code> slot — a link, a phone number, an "Active now" indicator.
      </p>
      <DtTabSwitcher v-model="labelTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="labelTab === 'preview'" class="dx-preview dx-preview--column">
          <DtAvatarLabel
            name="Mardon Shonazarov"
            description="mardon.shonazarov@gmail.com"
            :src="sampleImg"
            status="online"
            size="sm"
          />
          <DtAvatarLabel
            name="Mardon Shonazarov"
            description="mardon.shonazarov@gmail.com"
            :src="sampleImg"
            status="online"
            size="md"
          />
          <DtAvatarLabel
            name="Mardon Shonazarov"
            description="mardon.shonazarov@gmail.com"
            :src="sampleImg"
            status="online"
            size="lg"
          />
          <DtAvatarLabel
            name="Mardon Shonazarov"
            description="+998 90 123 45 67"
            :src="sampleImg"
          />
          <DtAvatarLabel name="Mardon Shonazarov" />
        </div>
        <CodeBlock v-else :code="labelCode" lang="vue" />
      </div>

      <h3>Custom description &amp; avatar slots</h3>
      <DtTabSwitcher v-model="labelCustomTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="labelCustomTab === 'preview'" class="dx-preview dx-preview--column">
          <DtAvatarLabel name="Mardon Shonazarov" :src="sampleImg" size="md">
            <template #description>
              <a href="mailto:mardon@example.com">mardon@example.com</a>
            </template>
          </DtAvatarLabel>

          <DtAvatarLabel name="Mardon Shonazarov" status="online" :src="sampleImg" size="lg">
            <template #description>
              <span style="color: var(--dt-color-success);">Active now</span>
            </template>
          </DtAvatarLabel>

          <DtAvatarLabel name="Mardon Shonazarov" description="Telegram: @mardon" size="md">
            <template #avatar="{ size }">
              <DtAvatar :size="size" :src="sampleImg">
                <template #status>
                  <span class="dx-avatar-demo__brand" style="background: #229ED9;">
                    <svg viewBox="0 0 16 16" fill="white" aria-hidden="true">
                      <path d="M14.96 1.04L1.04 6.96l4.94 1.06L13 3l-5.04 6.02 1.06 4.94z" />
                    </svg>
                  </span>
                </template>
              </DtAvatar>
            </template>
          </DtAvatarLabel>
        </div>
        <CodeBlock v-else :code="labelCustomCode" lang="vue" />
      </div>

      <h2>Avatar group</h2>
      <p>
        Stacked avatars with overlap (4 / 8 / 12px for xs / sm / md), a 1.5px white halo so
        they read cleanly against each other, an optional <code>+N</code> overflow chip via
        <code>max</code>, and an optional dashed add button via <code>show-add</code>.
      </p>
      <DtTabSwitcher v-model="groupTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="groupTab === 'preview'" class="dx-preview dx-preview--column">
          <DtAvatarGroup :users="teamUsers" :max="5" size="md" show-add @add="noop" />
          <DtAvatarGroup :users="teamUsers" :max="3" size="sm" show-add @add="noop" />
          <DtAvatarGroup :users="teamUsers" :max="3" size="xs" />
        </div>
        <CodeBlock v-else :code="groupCode" lang="vue" />
      </div>

      <h3>Slot-based group</h3>
      <p>
        Drop <code>DtAvatar</code> children directly when you need per-avatar control (status
        indicators, bordered, custom initials).
      </p>
      <DtTabSwitcher v-model="groupSlotTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="groupSlotTab === 'preview'" class="dx-preview">
          <DtAvatarGroup size="md" show-add @add="noop">
            <DtAvatar :src="sampleImg" />
            <DtAvatar :src="sampleImg" bordered />
            <DtAvatar name="Mardon Shonazarov" />
            <DtAvatar initials="+12" />
          </DtAvatarGroup>
        </div>
        <CodeBlock v-else :code="groupSlotCode" lang="vue" />
      </div>

      <h2>Avatar add button</h2>
      <p>
        Dashed circular "+" button used inside <code>DtAvatarGroup</code> (via
        <code>show-add</code>) or standalone for "invite member" affordances. Built-in hover,
        focus-visible, and disabled states.
      </p>
      <DtTabSwitcher v-model="addTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="addTab === 'preview'" class="dx-preview dx-preview--align-end">
          <DtAvatarAdd size="xs" @click="noop" />
          <DtAvatarAdd size="sm" @click="noop" />
          <DtAvatarAdd size="md" @click="noop" />
          <DtAvatarAdd size="md" disabled />
        </div>
        <CodeBlock v-else :code="addCode" lang="vue" />
      </div>

      <h2>DtAvatar props</h2>
      <DtDataTable :columns="propsCols" :items="avatarPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtAvatarLabel props</h2>
      <DtDataTable :columns="propsCols" :items="labelPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Accessibility</h2>
      <ul>
        <li><code>&lt;img&gt;</code> uses <code>alt</code> (or <code>name</code> as fallback). For decorative avatars pass <code>alt=""</code>.</li>
        <li>The user-icon fallback is <code>aria-hidden</code>.</li>
        <li>When initials render, a visually-hidden text node carries the full name so screen readers announce the person.</li>
        <li>Status colors are decorative — communicate meaningful state through accompanying text where possible.</li>
      </ul>
    </div>
  </DtPageView>
</template>

<style scoped>
.dx-preview--align-end {
  align-items: flex-end;
}
.dx-preview--column {
  flex-direction: column;
  align-items: flex-start;
}

.dx-avatar-demo__brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.dx-avatar-demo__brand svg {
  width: 70%;
  height: 70%;
}

.dx-avatar-demo__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--dt-color-error);
  color: var(--dt-color-white);
  border-radius: 50%;
  font-size: 10px;
  font-weight: var(--dt-font-medium);
  font-family: var(--dt-font-family);
}

.dx-avatar-demo__verified {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--dt-color-success);
  border-radius: 50%;
}
.dx-avatar-demo__verified svg {
  width: 70%;
  height: 70%;
}
</style>
