<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap — Nisar Ali Portfolio</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Syne:wght@700;800&amp;display=swap');
          :root {
            --bg: #eeeae2;
            --ink: #151515;
            --paper: #f8f6f1;
            --accent: #ff5a36;
            --line: #cfcac0;
            --muted: #68675f;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'DM Sans', sans-serif;
            background: var(--bg);
            color: var(--ink);
            padding: 40px 20px;
            line-height: 1.6;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: var(--paper);
            border: 1px solid var(--line);
            padding: 40px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.06);
          }
          h1 {
            font-family: 'Syne', sans-serif;
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 10px;
            letter-spacing: -1px;
          }
          p.desc {
            color: var(--muted);
            font-size: 14px;
            margin-bottom: 25px;
          }
          p.desc a {
            color: var(--accent);
            text-decoration: none;
            font-weight: 700;
          }
          .stats {
            background: var(--bg);
            padding: 14px 18px;
            border-left: 4px solid var(--accent);
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 25px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background: var(--ink);
            color: #fff;
            text-align: left;
            padding: 12px 15px;
            font-family: 'Syne', sans-serif;
            font-size: 11px;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          td {
            padding: 14px 15px;
            border-bottom: 1px solid var(--line);
          }
          tr:hover td {
            background: rgba(255, 90, 54, 0.05);
          }
          a {
            color: var(--accent);
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            background: var(--ink);
            color: var(--bg);
            padding: 3px 8px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            border-radius: 2px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>XML Sitemap</h1>
          <p class="desc">Index of pages for <a href="https://codewithnisar.com/">Nisar Ali — Digital Craft Portfolio</a>.</p>
          <div class="stats">
            This XML Sitemap contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URL(s).
          </div>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Freq</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td>
                    <span class="badge">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:priority"/>
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
