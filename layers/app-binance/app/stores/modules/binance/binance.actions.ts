export function useActions(state: BinanceState) {
  async function handlePurchaseWithCoins(amount: number): Promise<void> {
    state.coins -= amount;
  }

  return {
    handlePurchaseWithCoins,
  };
}
