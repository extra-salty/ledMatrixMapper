import { useRef } from 'react';
import { useDatabase } from '../DatabaseProvider/useDatabase';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/libs/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { PersistorOptions, persistStore } from 'redux-persist';
import { initMessageListener } from 'redux-state-sync';

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
	const db = useDatabase();

	const storeRef = useRef<AppStore>();

	if (!storeRef.current) {
		storeRef.current = makeStore(db);
	}
	const options: PersistorOptions = {};

	const persistor = persistStore(storeRef.current);

	initMessageListener(storeRef.current);

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default StateProvider;

// persistor.subscribe(() => {
//   /* Hydrate React components when persistor has synced with redux store */
//   const { bootstrapped } = persistor.getState();
//
//   if (bootstrapped) {
//       ReactDOM.hydrate(
//           <MyEntireApp />,
//           document.getElementById("appOrWhatever")
//     );
//   }
// });
