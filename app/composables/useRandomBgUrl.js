// Give random Background images urls
export default function useRandomBgUrl() {
  const upperLimit = 29;
  return `/images/background/${Math.floor(Math.random() * upperLimit) + 1}.jpg`;
}
