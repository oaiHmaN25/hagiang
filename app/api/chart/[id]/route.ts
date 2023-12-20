import connectMongoDB from "@/libs/mongodb";
import User from "@/models/chart";
import { NextResponse } from "next/server";
export async function PUT(request, { params }) {
  // Id của file
  const { id } = params;
  const { fileName = "", chart = {} } = await request.json();
  // Email của user
  const email = request.nextUrl.searchParams.get("email");
  await connectMongoDB();

  // Body của request
  // Tìm user theo email
  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Tìm file theo id
  const file = user ? user.files.find((file) => file.idFile === id) : null;
  if (!file) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  // Update file
  if (fileName) file.fileName = fileName;
  if (Object.keys(chart).length > 0) file.chart = chart;
  await user.save();
  return NextResponse.json({ message: "Success", data: file }, { status: 200 });
}

//Get file
export async function GET(request, { params }) {
  const { id } = params;
  const email = request.nextUrl.searchParams.get("email");
  await connectMongoDB();
  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const file = user ? user.files.find((file) => file.idFile === id) : null;
  if (!file) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
  return NextResponse.json({ file: file || {} }, { status: 200 });
}

// Delete file
export async function DELETE(request, { params }) {
  const { id } = params;
  const email = request.nextUrl.searchParams.get("email");
  await connectMongoDB();
  // Body của request
  // Tìm user theo email
  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Tìm file theo id
  const file = user ? user.files.findIndex((file) => file.idFile === id) : null;
  if (file === -1) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
  user.files.splice(file, 1);
  await user.save();
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
