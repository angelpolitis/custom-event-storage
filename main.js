/* Create a storage object. */
var CustomEventStorage = [];


/* The function that finds a record in the storage by a given element. */
function findRecordByElement (element) {
	/* Iterate over every entry in the storage object. */
	for (var index = 0, length = CustomEventStorage.length; index < length; index++) {
		/* Cache the record. */
		var record = CustomEventStorage[index];

		/* Check whether the given element exists. */
		if (element == record.element) {
			/* Return the record. */
			return record;
		}
	}

	/* Return false by default. */
	return false;
}

/* The function that adds an event listener, while storing it in the storage object. */
function insertListener (element, event, listener, options) {
	/* Use the element given to retrieve the record. */
	var record = findRecordByElement(element);

	/* Check whether any record was found. */
	if (record) {
		/* Normalise the event of the listeners object, in case it doesn't exist. */
		record.listeners[event] = record.listeners[event] || [];
	}
	else {
		/* Create an object to insert into the storage object. */
		record = {
			element: element,
			listeners: {}
		};

		/* Create an array for event in the record. */
		record.listeners[event] = [];

		/* Insert the record in the storage. */
		CustomEventStorage.push(record);
	}

	/* Insert the listener to the event array. */
	record.listeners[event].push(listener);

	/* Add the event listener to the element. */
	element.addEventListener(event, listener, options);
}

/* The function that checks whether an event listener is set for a given event. */
function listenerExists (element, event, listener) {
	/* Use the element given to retrieve the record. */
	var record = findRecordByElement(element);

	/* Check whether a record was found & if an event array exists for the given event. */
	if (record && event in record.listeners) {
		/* Return whether the given listener exists. */
		return !!~record.listeners[event].indexOf(listener);
	}

	/* Return false by default. */
	return false;
}

/* The function that removes a listener from a given element & its storage record. */
function removeListener (element, event, listener, options) {
	/* Use the element given to retrieve the record. */
	var record = findRecordByElement(element);

	/* Check whether any record was found and, if found, whether the event exists. */
	if (record && event in record.listeners) {
		/* Cache the index of the listener inside the event array. */
		var index = record.listeners[event].indexOf(listener);

		/* Check whether listener is not -1. */
		if (~index) {
			/* Delete the listener from the event array. */
			record.listeners[event].splice(index, 1);
		}

		/* Check whether the event array is empty or not. */
		if (!record.listeners[event].length) {
			/* Delete the event array. */
			delete record.listeners[event];
		}
	}

	/* Add the event listener to the element. */
	element.removeEventListener(event, listener, options);
}