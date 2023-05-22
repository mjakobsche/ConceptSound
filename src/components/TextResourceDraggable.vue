<template>
  <main>
    <div class="wrapper">
      <Sortable
        :list="splitText"
        item-key="id"
        :options="{handle: '.handle'}"
      >
        <template #item="{ element }">
          <span v-if="element.type == 'comment'"><p class="handle">{{ element.text }}</p></span>
          <div v-else :key="element.id">{{ element.text }}</div>
        </template>
      </Sortable>
    </div>
  </main>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { Sortable } from "sortablejs-vue3"

const props = defineProps({
    text: String,
})

const splitText = computed(() => {
        let text = props.text ? props.text : "";       

        return processText(text);
})

function processText(input: string): { id: number; text: string; type: 'text' | 'comment' }[] {
  const lines = input.split(/\r\n|\r|\n/);
  const result: { id: number; text: string; type: 'text' | 'comment' }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('//')) {
      const segments = line.split('//');
      const text = segments[0].trim();
      const comment = segments[1]?.trim();
      if (comment && comment.length > 0) {
        result.push({ id: i + 1, text: comment, type: 'comment' });
      }
      if (text.length > 0) {
        result.push({ id: i + 1, text, type: 'text' });
      }

      
    } else {
      result.push({ id: i + 1, text: line.trim(), type: 'text' });
    }
  }

  return result;
}

</script>

<style scoped>

.handle {
  font-size: x-small;
  text-align: end;
  color: #ffc409;
}
</style>