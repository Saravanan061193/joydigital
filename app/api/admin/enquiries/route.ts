import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "enquiries.json");

// Helper to read enquiries
function readEnquiries() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Error reading enquiries file:", e);
    return [];
  }
}

// Helper to write enquiries
function writeEnquiries(data: any) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const enquiries = readEnquiries();
  return NextResponse.json(enquiries);
}

export async function PATCH(request: Request) {
  try {
    const { id, status, notes } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing enquiry ID" }, { status: 400 });
    }
    
    let enquiries = readEnquiries();
    let updated = false;
    
    enquiries = enquiries.map((enq: any) => {
      if (enq.id === id) {
        updated = true;
        return {
          ...enq,
          ...(status !== undefined && { status }),
          ...(notes !== undefined && { notes }),
        };
      }
      return enq;
    });
    
    if (updated) {
      writeEnquiries(enquiries);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }
    
    let enquiries = readEnquiries();
    const originalLength = enquiries.length;
    enquiries = enquiries.filter((enq: any) => enq.id !== id);
    
    if (enquiries.length < originalLength) {
      writeEnquiries(enquiries);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
