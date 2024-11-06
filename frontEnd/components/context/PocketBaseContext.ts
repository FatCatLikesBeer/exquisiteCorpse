import { createContext } from "react";
import PocketBase from 'pocketbase';

const URL = process.env.EXPO_PUBLIC_EC_API_URL;
const pb = new PocketBase(URL);

const PocketBaseContext = createContext(pb);

export default PocketBaseContext;
