import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';

export async function GET(
  req: Request,
  res: Response,
) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ error: 'File name is required' }, { status: 400 });
  }
  const sanitizedFileName = path.basename(fileName);

  const filePath = path.join(process.cwd(), 'public', 'raffles', `${sanitizedFileName}.json`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);

    return NextResponse.json(jsonData);
  } catch (error) {
    return NextResponse.json({ error: 'File not found or invalid JSON' }, { status: 404 });
  }

}
