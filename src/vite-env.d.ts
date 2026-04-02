interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
	readonly VITE_API_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
	readonly glob: (pattern: string, options?: { query?: string; eager?: boolean; import?: string }) => Record<string, any>;
}
