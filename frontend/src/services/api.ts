const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUsuario = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

export const guardarSesion = (token: string, usuario: any) => {
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
};

export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error en la petición');
  }

  return data;
};

export default API_URL;

export const descargarArchivo = async (endpoint: string, signal?: AbortSignal) => {
  const token = getToken();
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    signal
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.mensaje || 'No se pudo descargar el reporte. Inténtalo nuevamente.');
  }
  if (!response.headers.get('Content-Type')?.includes('spreadsheetml.sheet')) {
    throw new Error('El servidor no devolvió un archivo Excel válido.');
  }
  const archivo = await response.blob();
  if (!archivo.size) throw new Error('El archivo descargado está vacío.');
  const disposicion = response.headers.get('Content-Disposition') || '';
  const nombre = disposicion.match(/filename="([\w.-]+\.xlsx)"/)?.[1] || 'ReportePedidos.xlsx';
  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombre;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return nombre;
};
