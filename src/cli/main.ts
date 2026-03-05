import { gua } from '@/cli/gua';
import { printAligned, HelpItem } from '@/utils/cli';

const COMMANDS: HelpItem[] = [
  { label: 'gua', description: 'Cast a hexagram and see the result' },
  { label: 'help', description: 'Show this help message' },
];

export const help = () => {
  console.log('usage:');
  console.log('  [command] [options] args');
  console.log('commands:');
  printAligned(COMMANDS);
};

export const main = () => {
  const args = process.argv.slice(2);
  const command = args[0];
  const remainingArgs = args.slice(1);

  if (command === 'gua') {
    gua(remainingArgs);
  } else {
    help();
  }
};
