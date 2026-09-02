import { NextResponse } from "next/server";

export async function GET() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      return NextResponse.json({
        totalPageviews: 0,
        uniqueVisitors: 0,
        totalBlogPageviews: 0,
        uniqueBlogVisitors: 0,
        topCities: [],
        mapMarkers: [],
        dailyTrend: [],
        weeklyTrend: [],
        monthlyTrend: [],
        yearlyTrend: [],
        blogDailyTrend: [],
        blogWeeklyTrend: [],
        blogMonthlyTrend: [],
        blogYearlyTrend: []
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

    // 3. Fetch map markers
    const mapMarkersAgg = await db.collection("pageviews").aggregate([
      {
        $group: {
          _id: { 
            lat: { $round: ["$lat", 3] }, 
            lng: { $round: ["$lng", 3] },
            city: "$city"
          },
          count: { $sum: 1 }
        }
      },
      { $limit: 200 }
    ]).toArray();

    const mapMarkers = mapMarkersAgg.map((item: any) => ({
      lat: item._id.lat,
      lng: item._id.lng,
      city: item._id.city,
      count: item.count
    }));

    // 4. Fetch pageviews from the last 3 years to compute trends
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    const pageviews = await db.collection("pageviews").find({
      createdAt: { $gte: threeYearsAgo.toISOString() }
    }, {
      projection: { createdAt: 1, city: 1, userAgent: 1, path: 1 }
    }).toArray();

    const now = new Date();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const currentYr = now.getFullYear();

    // 4a. DAILY TREND (last 14 days)
    const dailyMap = new Map<string, { views: number; visitors: Set<string> }>();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const key = d.toISOString().split("T")[0]; // YYYY-MM-DD
      dailyMap.set(key, { views: 0, visitors: new Set() });
    }

    // 4b. WEEKLY TREND (last 8 weeks)
    const weeklyMap = new Map<string, { views: number; visitors: Set<string> }>();
    for (let i = 7; i >= 0; i--) {
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() || 7) - (i * 7) + 1);
      const key = `Wk ${startOfWeek.getDate()} ${startOfWeek.toLocaleString("en-US", { month: "short" })}`;
      weeklyMap.set(key, { views: 0, visitors: new Set() });
    }

    // 4c. MONTHLY TREND (last 6 months)
    const monthlyMap = new Map<string, { views: number; visitors: Set<string> }>();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().substring(2)}`;
      monthlyMap.set(key, { views: 0, visitors: new Set() });
    }

    // 4d. YEARLY TREND (last 3 years)
    const yearlyMap = new Map<string, { views: number; visitors: Set<string> }>();
    for (let i = 2; i >= 0; i--) {
      const yrKey = `${currentYr - i}`;
      yearlyMap.set(yrKey, { views: 0, visitors: new Set() });
    }

    // BLOG SPECIFIC TRENDS
    const blogDailyMap = new Map<string, { views: number; visitors: Set<string> }>();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const key = d.toISOString().split("T")[0];
      blogDailyMap.set(key, { views: 0, visitors: new Set() });
    }

    const blogWeeklyMap = new Map<string, { views: number; visitors: Set<string> }>();
    for (let i = 7; i >= 0; i--) {
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() || 7) - (i * 7) + 1);
      const key = `Wk ${startOfWeek.getDate()} ${startOfWeek.toLocaleString("en-US", { month: "short" })}`;
      blogWeeklyMap.set(key, { views: 0, visitors: new Set() });
    }

    const blogMonthlyMap = new Map<string, { views: number; visitors: Set<string> }>();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().substring(2)}`;
      blogMonthlyMap.set(key, { views: 0, visitors: new Set() });
    }

    const blogYearlyMap = new Map<string, { views: number; visitors: Set<string> }>();
    for (let i = 2; i >= 0; i--) {
      const yrKey = `${currentYr - i}`;
      blogYearlyMap.set(yrKey, { views: 0, visitors: new Set() });
    }

    let totalBlogPageviews = 0;
    const blogVisitorsSet = new Set<string>();

    // Distribute pageviews to trends
    for (const pv of pageviews) {
      if (!pv.createdAt) continue;
      const pvDate = new Date(pv.createdAt);
      const visitorKey = `${pv.city || "Unknown"}-${pv.userAgent || "Unknown"}`;
      const yrStr = `${pvDate.getFullYear()}`;

      // Overall Daily check
      const dayKey = pvDate.toISOString().split("T")[0];
      if (dailyMap.has(dayKey)) {
        const item = dailyMap.get(dayKey)!;
        item.views++;
        item.visitors.add(visitorKey);
      }

      // Overall Weekly check
      const daysDiff = Math.floor((now.getTime() - pvDate.getTime()) / (1000 * 60 * 60 * 24));
      const wkIndex = Math.floor(daysDiff / 7);
      if (wkIndex >= 0 && wkIndex < 8) {
        const wkKeys = Array.from(weeklyMap.keys());
        const targetKey = wkKeys[7 - wkIndex];
        if (targetKey) {
          const wItem = weeklyMap.get(targetKey)!;
          wItem.views++;
          wItem.visitors.add(visitorKey);
        }
      }

      // Overall Monthly check
      const monthLabel = `${monthNames[pvDate.getMonth()]} ${pvDate.getFullYear().toString().substring(2)}`;
      if (monthlyMap.has(monthLabel)) {
        const item = monthlyMap.get(monthLabel)!;
        item.views++;
        item.visitors.add(visitorKey);
      }

      // Overall Yearly check
      if (yearlyMap.has(yrStr)) {
        const item = yearlyMap.get(yrStr)!;
        item.views++;
        item.visitors.add(visitorKey);
      }

      // Blog check
      const isBlog = pv.path && pv.path.startsWith("/blog");
      if (isBlog) {
        totalBlogPageviews++;
        blogVisitorsSet.add(visitorKey);

        if (blogDailyMap.has(dayKey)) {
          const item = blogDailyMap.get(dayKey)!;
          item.views++;
          item.visitors.add(visitorKey);
        }

        if (wkIndex >= 0 && wkIndex < 8) {
          const wkKeys = Array.from(blogWeeklyMap.keys());
          const targetKey = wkKeys[7 - wkIndex];
          if (targetKey) {
            const wItem = blogWeeklyMap.get(targetKey)!;
            wItem.views++;
            wItem.visitors.add(visitorKey);
          }
        }

        if (blogMonthlyMap.has(monthLabel)) {
          const item = blogMonthlyMap.get(monthLabel)!;
          item.views++;
          item.visitors.add(visitorKey);
        }

        if (blogYearlyMap.has(yrStr)) {
          const item = blogYearlyMap.get(yrStr)!;
          item.views++;
          item.visitors.add(visitorKey);
        }
      }
    }

    const dailyTrend = Array.from(dailyMap.entries()).map(([date, item]) => {
      const d = new Date(date);
      const label = `${d.toLocaleString("en-US", { month: "short" })} ${d.getDate()}`;
      return {
        label,
        views: item.views,
        visitors: item.visitors.size
      };
    });

    const weeklyTrend = Array.from(weeklyMap.entries()).map(([label, item]) => ({
      label,
      views: item.views,
      visitors: item.visitors.size
    }));

    const monthlyTrend = Array.from(monthlyMap.entries()).map(([label, item]) => ({
      label,
      views: item.views,
      visitors: item.visitors.size
    }));

    const yearlyTrend = Array.from(yearlyMap.entries()).map(([label, item]) => ({
      label,
      views: item.views,
      visitors: item.visitors.size
    }));

    const blogDailyTrend = Array.from(blogDailyMap.entries()).map(([date, item]) => {
      const d = new Date(date);
      const label = `${d.toLocaleString("en-US", { month: "short" })} ${d.getDate()}`;
      return {
        label,
        views: item.views,
        visitors: item.visitors.size
      };
    });

    const blogWeeklyTrend = Array.from(blogWeeklyMap.entries()).map(([label, item]) => ({
      label,
      views: item.views,
      visitors: item.visitors.size
    }));

    const blogMonthlyTrend = Array.from(blogMonthlyMap.entries()).map(([label, item]) => ({
      label,
      views: item.views,
      visitors: item.visitors.size
    }));

    const blogYearlyTrend = Array.from(blogYearlyMap.entries()).map(([label, item]) => ({
      label,
      views: item.views,
      visitors: item.visitors.size
    }));

    // 5. Fetch Recent Blog Reader Activity Stream (last 200 blog reads)
    let recentBlogActivities: any[] = [];
    try {
      const recentBlogLogsRaw = await db.collection("pageviews").find({
        path: { $regex: "^/blog" }
      }).sort({ createdAt: -1 }).limit(200).toArray();

      recentBlogActivities = recentBlogLogsRaw.map((log: any) => {
        const pathClean = (log.path || "/blog").split("?")[0].replace(/\/$/, "");
        const slug = pathClean.replace(/^\/blog\/?/, "") || "blog-hub";
        return {
          id: log._id?.toString() || Math.random().toString(),
          path: log.path,
          slug: slug === "" ? "blog-hub" : slug,
          city: log.city || "Global Reader",
          country: log.country || "IN",
          timestamp: log.createdAt || new Date().toISOString(),
          referrer: log.referrer || "Google / Direct"
        };
      });
    } catch (e) {
      console.warn("Could not fetch recent blog logs:", e);
    }

    return NextResponse.json({
      totalPageviews,
      uniqueVisitors: topCities.reduce((acc: number, item: any) => acc + item.count, 0),
      totalBlogPageviews,
      uniqueBlogVisitors: blogVisitorsSet.size,
      topCities,
      mapMarkers,
      dailyTrend,
      weeklyTrend,
      monthlyTrend,
      yearlyTrend,
      blogDailyTrend,
      blogWeeklyTrend,
      blogMonthlyTrend,
      blogYearlyTrend,
      recentBlogActivities
    });
  } catch (error: any) {
    console.error("Error in admin analytics route:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
