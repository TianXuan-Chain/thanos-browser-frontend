export default async function sleep(second) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, second * 1000);
  });
}
