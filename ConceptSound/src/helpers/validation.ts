function tryExecute(func: any) {
	try {
		func();
	} catch (error) {
		console.log("ERROR: " + error);
	}
}

function validateSameObject(objA: object, objB: object) {
	tryExecute(() => {
		if (objA != objB) throw "object missmatch";
	});
}

export { tryExecute, validateSameObject };
