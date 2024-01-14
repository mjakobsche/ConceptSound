import {Haptics, ImpactStyle} from "@capacitor/haptics";

export function useImpact() {
    Haptics.impact({style: ImpactStyle.Medium}).then(()=> console.log("<impact>"));
}

