import {Haptics, ImpactStyle} from "@capacitor/haptics";

export function impact() {
    Haptics.impact({style: ImpactStyle.Medium}).then(()=> console.log("<impact>"));
}

