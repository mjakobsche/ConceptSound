import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentMusicBook = defineStore("currentMusicBook", () => {
	const musicBookName = ref("");
	function setName(name: string) {
		musicBookName.value = name;
	}
	return { setName, musicBookName };
});
