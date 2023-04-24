import React, {
	useCallback,
	useContext,
	useRef,
	useSyncExternalStore,
} from "react";
import {
	updateBlockTotals,
	updateSectionTotals,
	updateTableRow,
} from "../lib/valueChangeFunctions";

const Values = React.createContext();

export default function ValuesContext({ children, dbData }) {
	return (
		<div>
			<Values.Provider value={useValues(dbData)}>{children}</Values.Provider>
		</div>
	);
}

function useValues(dbData) {
	const data = useRef({
		...dbData.data,
	});

	console.log(data);

	const subscribers = useRef(new Set());

	const get = useCallback(() => data.current, []);

	const set = useCallback((callback) => {
		callback(get());
		//data.current.sections.push({ info: { title: "Wocap" }, items: [] });
		subscribers.current.forEach((callback) => callback());
	}, []);

	const subscribe = useCallback((callback) => {
		subscribers.current.add(callback);
		return () => subscribers.current.delete(callback);
	}, []);

	return {
		get,
		set,
		subscribe,
	};
	//return useContext(Values)
}

export function getValue(selector) {
	const data = useContext(Values);
	const state = useSyncExternalStore(data.subscribe, () =>
		selector(data.get())
	);

	return [state, data.set];
}
