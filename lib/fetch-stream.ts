import { prisma } from '@/lib/prisma';
import { StreamPhoto, GroupedStream } from '@/interfaces/index';
import { getMonday } from '@/lib/helpers';

export async function fetchStream() {
  return await prisma.photo.findMany({
    orderBy: [{ createdAt: 'desc' }],
  });
}

export async function fetchStreamCurrentWeek() {
  return await prisma.photo.findMany({
    where: { createdAt: { gte: getMonday(new Date()) } },
    orderBy: [{ createdAt: 'desc' }],
  });
}
