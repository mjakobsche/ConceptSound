<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ musicBookName }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Tab 2</ion-title>
				</ion-toolbar>
			</ion-header>

			<ResourceAddButton @new-resource="(type) => addResource(type)" />
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { useCurrentMusicBook } from "@/stores/currentMusicBook";
import { storeToRefs } from "pinia";
import { ref, reactive, Suspense } from "vue";
import {
	IonPage,
	IonHeader,
	IonFab,
	IonFabButton,
	IonIcon,
	IonToolbar,
	IonTitle,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
} from "@ionic/vue";
import ResourceAddButton from "@/components/ResourceAddButton.vue";
import NoteResource from "@/components/NoteResource.vue";

import { Ref, onMounted } from "vue";
import TextResource from "@/components/TextResource.vue";
const store = useCurrentMusicBook();
const { musicBookName } = storeToRefs(store);
interface Resource {
	id: number;
	type: string;
	hidden: boolean;
	content: string;
}

let resources: Ref<Resource[]>;
resources = ref([]);

let id: number = 1;
let note: string = "X:1\nK:D\n";

function addResource(type: string) {
	switch (type) {
		case "text":
			resources.value.push({
				id: id++,
				type: "",
				hidden: false,
				content: "",
			});
			break;
		case "note":
			resources.value.push({
				id: id++,
				type: "",
				hidden: false,
				content: note,
			});
			break;
	}
}

function removeResource(id: number) {
	resources.value = resources.value.filter((t) => t.id !== id);
}
</script>
