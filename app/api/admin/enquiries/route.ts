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
  const MONGODB_URI = process.env.MONGODB_URI;

  if (MONGODB_URI) {
    try {
      const { getDb } = await import("@/lib/mongodb");
      const db = await getDb();
      const data = await db.collection("enquiries")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      const mapped = data.map((d: any) => ({
        id: d.id || d._id?.toString(),
        name: d.name,
        companyName: d.companyName,
        website: d.website,
        email: d.email,
        mobile: d.mobile,
        service: d.service,
        message: d.message,
        source: d.source,
        region: d.region,
        status: d.status,
        createdAt: d.createdAt,
        notes: d.notes || ""
      }));
      return NextResponse.json(mapped);
    } catch (e: any) {
      console.error("Error reading from MongoDB Atlas:", e);
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  } else {
    const enquiries = readEnquiries();
    return NextResponse.json(enquiries);
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status, notes } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing enquiry ID" }, { status: 400 });
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    if (MONGODB_URI) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        const updateFields: any = {};
        if (status !== undefined) updateFields.status = status;
        if (notes !== undefined) updateFields.notes = notes;

        const result = await db.collection("enquiries").updateOne(
          { id: id },
          { $set: updateFields }
        );
        if (result.matchedCount === 0) {
          return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
      } catch (e: any) {
        console.error("Error updating MongoDB Atlas:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
      }
    } else {
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

    const MONGODB_URI = process.env.MONGODB_URI;

    if (MONGODB_URI) {
      try {
        const { getDb } = await import("@/lib/mongodb");
        const db = await getDb();
        const result = await db.collection("enquiries").deleteOne({ id: id });
        if (result.deletedCount === 0) {
          return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
      } catch (e: any) {
        console.error("Error deleting from MongoDB Atlas:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
      }
    } else {
      let enquiries = readEnquiries();
      const originalLength = enquiries.length;
      enquiries = enquiries.filter((enq: any) => enq.id !== id);
      
      if (enquiries.length < originalLength) {
        writeEnquiries(enquiries);
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
      }
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
