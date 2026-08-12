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
  let SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  if (SUPABASE_URL && !SUPABASE_URL.startsWith("http")) {
    SUPABASE_URL = `https://${SUPABASE_URL}.supabase.co`;
  }

  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries?order=created_at.desc`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!res.ok) {
        throw new Error(`Supabase GET returned status ${res.status}`);
      }
      const data = await res.json();
      const mapped = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        companyName: d.company_name,
        website: d.website,
        email: d.email,
        mobile: d.mobile,
        service: d.service,
        message: d.message,
        source: d.source,
        region: d.region,
        status: d.status,
        createdAt: d.created_at,
        notes: d.notes || ""
      }));
      return NextResponse.json(mapped);
    } catch (e: any) {
      console.error("Error reading from Supabase:", e);
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

    let SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (SUPABASE_URL && !SUPABASE_URL.startsWith("http")) {
      SUPABASE_URL = `https://${SUPABASE_URL}.supabase.co`;
    }

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries?id=eq.${id}`, {
          method: "PATCH",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...(status !== undefined && { status }),
            ...(notes !== undefined && { notes })
          })
        });
        if (!res.ok) {
          throw new Error(`Supabase PATCH returned status ${res.status}`);
        }
        return NextResponse.json({ success: true });
      } catch (e: any) {
        console.error("Error updating Supabase:", e);
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

    let SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (SUPABASE_URL && !SUPABASE_URL.startsWith("http")) {
      SUPABASE_URL = `https://${SUPABASE_URL}.supabase.co`;
    }

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries?id=eq.${id}`, {
          method: "DELETE",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        if (!res.ok) {
          throw new Error(`Supabase DELETE returned status ${res.status}`);
        }
        return NextResponse.json({ success: true });
      } catch (e: any) {
        console.error("Error deleting from Supabase:", e);
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
