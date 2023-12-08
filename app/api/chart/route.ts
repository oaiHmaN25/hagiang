import connectMongoDB from "@/libs/mongodb";
import User from "@/models/chart";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, title, files } = await request.json();
  if (!title || !email || !files) {
    return NextResponse.json(
      { message: "Title, email and files are required" },
      { status: 400 },
    );
  }
  const data = { title, email, files };
  await connectMongoDB();

  let doc = await User.findOne({ email: email });

  if (doc) {
    doc.title = title;
    doc.files.push(...files);
    await doc.save();
  } else {
    doc = await User.create(data);
  }

  return NextResponse.json({ message: "Success", data: doc }, { status: 201 });
}

export async function GET(request) {
  const email = request.nextUrl.searchParams.get("email");
  await connectMongoDB();
  const user = await User.findOne({ email: email });
  return NextResponse.json({ user: user || {} });
}

export async function DELETE(request) {
  const { id } = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
/*

Post File: POST (body: {
  email: String,
  title: String,
  files: [{
    fileName: String,
    chart: {
      nodes:...,
      edges:...
    }
  }],
})

Get All: GET (email)VD: http://localhost:3000/api/chart?email=duonghiep416@gmail.com
Get File: GET (params: { id: String }) (email)
VD: http://localhost:3000/api/chart/65730c37dfba2bce7a14?email=duonghiep416@gmail.com
Sửa file: PUT /idFile?email=email (body: {
  fileName: String,
  chart: {
    nodes:...,
    edges:...
  }
})
*/
