import connectMongoDB from "@/libs/mongodb";
import User from "@/models/chart";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  // Id của file
  const { id } = params;

  // Email của user
  const email = request.nextUrl.searchParams.get("email");

  await connectMongoDB();

  // Body của request
  const { fileName, chart } = await request.json();
  if (!fileName || !chart) {
    return NextResponse.json(
      { message: "fileName and chart are required" },
      { status: 400 },
    );
  }
  // Tìm user theo email
  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Tìm file theo id
  const file = user ? user.files.find((file) => file.id === id) : null;
  if (!file) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  // Update file
  file.fileName = fileName;
  file.chart = chart;
  await user.save();
  return NextResponse.json({ message: "Success", data: file }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  const email = request.nextUrl.searchParams.get("email");
  await connectMongoDB();
  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const file = user ? user.files.find((file) => file.id === id) : null;
  if (!file) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
  return NextResponse.json({ file: file || {} }, { status: 200 });
}
