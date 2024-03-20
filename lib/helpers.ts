import { StreamPhoto, GroupedStream } from '@/interfaces/index';

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function convertToClosestFraction(decimal: number): string {
  const epsilon = 1.0e-5;
  let numerator = 1;
  let denominator = 1;
  let error = Math.abs(decimal - numerator / denominator);

  for (let d = 2; d <= 10000; d++) {
    const n = Math.round(decimal * d);
    const newError = Math.abs(decimal - n / d);

    if (newError < error) {
      numerator = n;
      denominator = d;
      error = newError;
    }

    if (error < epsilon) {
      break;
    }
  }

  denominator = Math.round(denominator / 100) * 100;

  return `${numerator}/${denominator}`;
}

export function groupByWeek(array: Array<StreamPhoto>): Array<GroupedStream> {
  const weekArrays: any = {};

  array.forEach((obj) => {
    const createdAt = new Date(obj.createdAt);
    const year = createdAt.getFullYear();
    const weekNumber = getWeekNumber(createdAt);
    const weekYear = `${year}-${weekNumber}`;

    if (!weekArrays[weekYear]) {
      weekArrays[weekYear] = {
        year,
        week: weekNumber,
        weekBegins: getMonday(createdAt),
        posts: [],
      };
    }

    weekArrays[weekYear].posts.push(obj);
  });

  const grouped: Array<GroupedStream> = Object.values(weekArrays);

  return grouped;
}

export function getMonday(d: Date) {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return new Date(d);
}

export function getWeekNumber(date: Date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    // @ts-ignore
    ((date - onejan) / 86400000 + onejan.getDay() - 1) / 7
  );
  return weekNumber;
}
