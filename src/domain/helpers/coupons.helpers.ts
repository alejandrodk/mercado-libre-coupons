export function removeExpensiveProducts(items: Record<string, number>, maxPrice: number): Record<string, number> {
  return Object.entries(items)
    .filter(([key, value]) => value <= maxPrice)
    .reduce((acc, curr) => {
      const [_key, _value] = curr;
      acc[_key] = _value;
      return acc;
    }, {} as any);
}

export function getCheappestProductValue(items: Record<string, number>): number {
  return Object.values(items).sort((a, b) => a - b)[0];
}
