export const getFirstName = (nameComplete: string): string => {
  const nomes = nameComplete.trim().split(' ')
  return nomes[0]
}
