export type ExportLazyModule = () => Promise<{
  default: () => JSX.Element;
  meta?: Record<string, any>;
}>;
export type ExportSyncModule = { default: () => JSX.Element };
