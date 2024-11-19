export const groupBy = <T>(array: T[], key: string): Record<string, T[]> => {
  return array.reduce((result, currentValue: any) => {
    const groupKey = currentValue[key];

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(currentValue);
    return result;
  }, {} as Record<string, T[]>);
};
