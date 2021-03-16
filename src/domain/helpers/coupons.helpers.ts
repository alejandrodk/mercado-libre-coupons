export function removeExpensiveProducts(items: Record<string, number>, maxPrice: number): Record<string, number> {
  return Object.entries(items)
    .filter(([key, value]) => value <= maxPrice)
    .reduce((acc, curr) => {
      const [_key, _value] = curr;
      acc[_key] = _value;
      return acc;
    }, {} as any);
}

export function removeCurrentProduct(items: Record<string, number>): Record<string, number> {
  const values = Object.entries(items);
  return values.reduce((acc, curr) => {
    const [key, value] = curr;
    if (key !== values[values.length - 1][0]) acc[key] = value;
    return acc;
  }, {} as any);
}
