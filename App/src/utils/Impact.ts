import {Haptics, ImpactStyle} from "@capacitor/haptics";

export function impact() {
    Haptics.impact({style: ImpactStyle.Heavy}).then(() => console.log("<impact>"));
}

