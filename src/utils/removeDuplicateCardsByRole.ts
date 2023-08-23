import { CardData } from '../types/promptTypes';

export const removeDuplicateCardsByRole = (tasks: CardData[]): string[] => {
  const uniqueRoles = [...new Set(tasks.map((task) => task.role))];
  console.log(uniqueRoles);
  return uniqueRoles;
};
