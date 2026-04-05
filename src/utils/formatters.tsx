export const formatPLN = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return '-';
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value);
  };