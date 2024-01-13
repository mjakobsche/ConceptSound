function ripFromArray<T>(array: Array<T>, element: T) {
    return array.splice(array.indexOf(element), 1)[0];
}

function putToArray<T>(array: Array<T>, element: T, place: number = 0) {
    array.splice(place, 0, element);
}

export {ripFromArray, putToArray}