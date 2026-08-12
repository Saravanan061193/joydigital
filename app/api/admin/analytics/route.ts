import { NextResponse } from "next/server";

export async function GET() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      return NextResponse.json({
        totalPageviews: 0,
        uniqueVisitors: 0,
        topCities: [],
        mapMarkers: []
      });
    }

    const { getDb } = await import("@/lib/mongodb");
    const db = await getDb();

    // 1. Fetch total pageviews count
    const totalPageviews = await db.collection("pageviews").countDocuments();

    // 2. Fetch top cities (Aggregated)
    const topCitiesAgg = await db.collection("pageviews").aggregate([
      {
        $group: {
          _id: { city: "$city", country: "$country" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    const topCities = topCitiesAgg.map((item: any) => ({
      city: item._id.city,
      country: item._id.country,
      count: item.count
    }));

    // 3. Fetch map markers (coordinates aggregated by exact location or small grid)
    const mapMarkersAgg = await db.collection("pageviews").aggregate([
      {
        $group: {
          _id: { 
            // round lat/lng to 3 decimal places to cluster coordinates close together
            lat: { $round: ["$lat", 3] }, 
            lng: { $round: ["$lng", 3] },
            city: "$city"
          },
          count: { $sum: 1 }
        }
      },
      { $limit: 200 } // Cap markers to prevent browser lag
    ]).toArray();

    const mapMarkers = mapMarkersAgg.map((item: any) => ({
      lat: item._id.lat,
      lng: item._id.lng,
      city: item._id.city,
      count: item.count
    }));

    return NextResponse.json({
      totalPageviews,
      uniqueVisitors: topCities.reduce((acc: number, item: any) => acc + item.count, 0), // Mock unique approximation
      topCities,
      mapMarkers
    });
  } catch (error: any) {
    console.error("Error in admin analytics route:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
