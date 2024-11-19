export const calculateTotalAmount = (assets: any): number => {
  if (!assets || assets.length === 0) return 0;

  return assets.reduce(
    (sum: number, asset: any) => sum + parseFloat(asset.amount || 0),
    0
  );
};
