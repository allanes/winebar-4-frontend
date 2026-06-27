export type VitteConnectionStatus = 'online' | 'degraded' | 'offline';

export interface VitteStatus {
  status: VitteConnectionStatus;
  online: boolean;
  last_success_at?: string | null;
  last_error_at?: string | null;
  last_error?: string | null;
  cached_for_seconds: number;
  circuit_open_until?: string | null;
  catalog_last_sync_at?: string | null;
}

export const fetchVitteStatus = async (): Promise<VitteStatus> => {
  const response = await fetch('/backend/api/v1/vitte/status');
  if (!response.ok) {
    throw new Error(`No se pudo consultar el estado de Vitte (${response.status})`);
  }
  return response.json();
};

export const getVitteStatusLabel = (status: VitteStatus | null, failed = false): string => {
  if (failed || !status) {
    return 'Vitte (Sin conexión)';
  }

  if (status.status === 'online') {
    return 'Vitte (Conectado)';
  }

  if (status.status === 'degraded') {
    return 'Vitte (Datos locales)';
  }

  return 'Vitte (Sin conexión)';
};

