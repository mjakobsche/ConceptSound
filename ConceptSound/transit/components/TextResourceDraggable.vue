<template>
	<main>
		<div class="wrapper">
			<Sortable
				:list="splitText"
				item-key="id"
				:options="{ handle: '.handle' }"
				@sort="(event) => UpdateComment(event)"
			>
				<template #item="{ element }">
					<span v-if="element.type == 'comment'">
						<p class="handle">{{ element.text }}</p>
					</span>
					<div v-else :key="element.id">{{ element.text }}</div>
				</template>
			</Sortable>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SortableJs from "sortablejs";
import { Sortable } from "sortablejs-vue3";
const emit = defineEmits(["updateComments"]);
const props = defineProps({
	text: String,
});

let updatedText = props.text ? props.text : "";

const splitText = computed(() => {
	const lines = updatedText.split(/\r\n|\r|\n/);
	const result: { id: number; text: string; type: "text" | "comment" }[] = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (line.includes("//")) {
			const segments = line.split("//");
			const text = segments[0].trim();
			const comment = segments[1]?.trim();
			if (comment && comment.length > 0) {
				result.push({ id: i, text: comment, type: "comment" });
			}
			if (text.length > 0) {
				result.push({ id: i, text, type: "text" });
			}
		} else {
			result.push({ id: i, text: line.trim(), type: "text" });
		}
	}
	return result;
});

function UpdateComment(event: SortableJs.SortableEvent) {
	let newId = event.newIndex;
	let oldId = event.oldIndex;
	if (oldId === undefined || newId === undefined) {
		return;
	}
	let newSplitText = splitText.value;
	const elementToMove = newSplitText.splice(oldId, 1)[0];
	newSplitText.splice(newId, 0, elementToMove);
	const mergedText = newSplitText
		.map((item) => {
			if (item.type === "comment") {
				return `//${item.text}`;
			}
			return item.text;
		})
		.join("\n");
	emit("updateComments", mergedText);
	updatedText = mergedText;
}
</script>

<style scoped>
.handle {
	color: #6272a4;
	font-size: x-small;
	text-align: end;
}
</style>
