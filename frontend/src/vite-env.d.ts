/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_PROFILE_API_READY?: string;
  readonly VITE_PROFILE_DOWNLOADS_API_READY?: string;
  readonly VITE_PROFILE_CONTENT_API_READY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
