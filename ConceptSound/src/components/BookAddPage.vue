<template>
	<ion-fab vertical="bottom" horizontal="end" slot="fixed">
		<ion-fab-button size="small">
			<ion-icon :icon="addCircleOutline"></ion-icon>
		</ion-fab-button>

		<ion-fab-list side="top">
			<ion-fab-button @click="emit('addPage', 'Text')">
				<ion-icon :icon="languageOutline"></ion-icon>
			</ion-fab-button>
			<ion-fab-button @click="emit('addPage', 'Score')">
				<ion-icon :icon="musicalNoteOutline"></ion-icon>
			</ion-fab-button>
		</ion-fab-list>
	</ion-fab>
</template>

<script setup lang="ts">
import { IonIcon, IonFab, IonFabButton, IonFabList } from "@ionic/vue";
import {
	addCircleOutline,
	languageOutline,
	musicalNoteOutline,
} from "ionicons/icons";

const emit = defineEmits(["addPage"]);
</script>

<style scoped>
ion-fab-button {
	--border-radius: 15px;
	--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
		0px 1px 3px 1px rgba(0, 0, 0, 0.15);
	--color: white;
}
</style>
