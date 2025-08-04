import { getDiskUsage } from "@/lib/diskUsage";

export async function GET() {
  const result = await getDiskUsage();
  if ('error' in result) {
    return Response.json({ error: result.error }, { status: 500 });
  }

  return Response.json({
    usage: `${result.usedFormatted} / ${result.totalFormatted}`,
  });
}