import { getApp } from 'realm-web';

export const useApp_temp = () => getApp(process.env.NEXT_PUBLIC_MONGO_APP_ID);
