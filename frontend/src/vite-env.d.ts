/// <reference types="vite/client" />

declare module 'typeface-almarai';
declare module 'typeface-public-sans';
declare module 'typeface-eb-garamond';

interface ImportMetaEnv {
  readonly REACT_APP_API_BASE_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
