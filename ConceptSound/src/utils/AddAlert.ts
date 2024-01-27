import {alertController} from "@ionic/vue";

export function addAlert(fn: Function) {
    alertController.create({
        header: 'Podaj nazwę nowego elementu',
        buttons: [
            {
                text: "Dodaj",
                handler: (data) => fn(data.name),
            },
        ],
        inputs: [
            {
                name: 'name',
                placeholder: 'Nazwa',
            },
        ]
    }).then((alert) => alert.present());
}
