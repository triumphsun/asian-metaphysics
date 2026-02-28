import { greet } from '@/utils/greet';

const main = () => {
  const args = process.argv.slice(2);
  const name = args[0] || 'World';
  console.log(greet(name));
};

if (require.main === module) {
  main();
}
