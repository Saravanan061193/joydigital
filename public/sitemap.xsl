<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Joy Digital</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            margin: 0;
            padding: 32px 24px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          }
          h1 {
            margin: 0 0 8px 0;
            font-size: 24px;
            color: #38bdf8;
          }
          p {
            margin: 0;
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.5;
          }
          .stats {
            display: inline-block;
            margin-top: 14px;
            padding: 6px 14px;
            background-color: #1e293b;
            border: 1px solid #334155;
            border-radius: 20px;
            color: #e2e8f0;
            font-weight: 600;
            font-size: 13px;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background-color: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          }
          th {
            background-color: #0f172a;
            color: #cbd5e1;
            text-align: left;
            padding: 12px 16px;
            font-size: 12px;
            font-weight: 600;
            border-bottom: 1px solid #334155;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          td {
            padding: 12px 16px;
            font-size: 13px;
            color: #e2e8f0;
            border-bottom: 1px solid #334155;
            vertical-align: middle;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: #273549;
          }
          a {
            color: #38bdf8;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            background: #334155;
            color: #f1f5f9;
          }
          .priority-high {
            background: rgba(16, 185, 129, 0.2);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
          }
          .priority-medium {
            background: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
            border: 1px solid rgba(59, 130, 246, 0.3);
          }
          .priority-low {
            background: rgba(148, 163, 184, 0.2);
            color: #cbd5e1;
            border: 1px solid rgba(148, 163, 184, 0.3);
          }
          .alternates-list {
            margin: 6px 0 0 0;
            padding-left: 0;
            color: #94a3b8;
            font-size: 11px;
            list-style: none;
          }
          .alternates-tag {
            display: inline-block;
            margin-right: 6px;
            margin-top: 2px;
            padding: 1px 6px;
            background-color: #0f172a;
            border: 1px solid #334155;
            border-radius: 4px;
            color: #a7f3d0;
            font-size: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap</h1>
            <p>This is a XML Sitemap generated for search engines (Google, Bing, Yandex, DuckDuckGo). Below is a visual representation of all indexable URLs on <strong>joydigital.in</strong>.</p>
            <div class="stats">
              Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 45%;">URL Location</th>
                <th style="width: 15%;">Change Frequency</th>
                <th style="width: 15%;">Priority</th>
                <th style="width: 25%;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    <xsl:if select="xhtml:link">
                      <div class="alternates-list">
                        <span style="color: #64748b; font-weight: 500; margin-right: 4px;">Hreflang Alternates:</span>
                        <xsl:for-each select="xhtml:link">
                          <span class="alternates-tag">
                            <xsl:value-of select="@hreflang"/>
                          </span>
                        </xsl:for-each>
                      </div>
                    </xsl:if>
                  </td>
                  <td>
                    <span class="badge"><xsl:value-of select="sitemap:changefreq"/></span>
                  </td>
                  <td>
                    <xsl:variable name="p" select="sitemap:priority"/>
                    <span>
                      <xsl:attribute name="class">
                        <xsl:choose>
                          <xsl:when test="$p &gt;= 0.8">badge priority-high</xsl:when>
                          <xsl:when test="$p &gt;= 0.6">badge priority-medium</xsl:when>
                          <xsl:otherwise>badge priority-low</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
