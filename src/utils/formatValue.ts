/** Passamos o parâmetro pt-BR que é a nossa linguagem
 * style: currency -> para colocar no formato de moeda
 * currency> BRL -> para que o formato da moeda seja reais (R$)
 */
const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default formatValue;
