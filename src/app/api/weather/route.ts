import { NextResponse } from "next/server";

export async function GET(request:Request) {

  console.log(request)
  // console.log(context)
  return NextResponse.json({
    hello:"Welcome from location"
  });
  
}