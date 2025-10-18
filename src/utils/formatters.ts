export function getInitials(name = '') {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatPhone(phone = '') {
  const numbers = phone.replace(/\D/g, '');
  if (numbers.length === 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }
  if (numbers.length === 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  return phone;
}

export function statusChipProps(status: any) {
  switch ((status || '').toUpperCase()) {
    case 'ACCEPTED':
      return {color: 'success', label: 'Aceito'};
    case 'PENDING':
      return {color: 'warning', label: 'Pendente'};
    case 'REJECTED':
      return {color: 'error', label: 'Recusado'};
    default:
      return {color: 'default', label: status || 'Desconhecido'};
  }
}
