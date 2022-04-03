const getReadableDate = (isoDate: string): string => new Date(isoDate).toLocaleDateString('es-ES',
  {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

export { getReadableDate };
