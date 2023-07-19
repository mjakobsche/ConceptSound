<template>
	<suspense>
		<ion-app>
			<ion-router-outlet />
		</ion-app>
	</suspense>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>
