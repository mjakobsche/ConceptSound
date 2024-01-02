<template>
  <div v-for="element in splitText">
    <div :class="element.type">
      {{element.text}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  data: {
    required: true,
    type: String,
    default: ""
  },
});

const splitText = computed(() => {
  const textLines = props.data ? props.data.split(/\n|\r|\[@]/) : [];
  const result: { id: number; text: string; type: "text" | "comment" }[] = [];
  for (let i = 0; i < textLines.length; i++) {
    const line = textLines[i];
    if (line.includes("@")) {
      const segments = line.split("@");
      const text = segments[0].trim();
      const comment = segments[1]?.trim();
      if (comment && comment.length > 0) {
        result.push({id: i, text: comment, type: "comment"});
      }
      if (text.length > 0) {
        result.push({id: i, text, type: "text"});
      }
    } else {
      result.push({id: i, text: line.trim(), type: "text"});
    }
  }
  return result;
});
</script>

<style scoped>
.comment {
  color: #6272a4;
  font-size: math;
  text-align: end;
}
.text {
  font-size: medium;
  color: white;
}
</style>
