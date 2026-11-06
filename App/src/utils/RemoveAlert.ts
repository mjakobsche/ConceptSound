import {alertController} from "@ionic/vue";

export function removeAlert(fn: Function) {
    alertController.create({
        header: 'Czy chcesz usunąć element?',
        buttons: [
            {
                text: "Anuluj",
                handler: () => {},
            },
            {
                text: "Usuń",
                handler: () => fn(),
            },
        ],
    }).then((alert) => alert.present());
}
