// scripts/generate-issue-report.js
// ESM version for Node 20 + "type": "module"

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Download all images found in HTML and embed as Base64 data URIs.
 * This fixes GitHub/S3/user-attachments URLs in wkhtmltopdf.
 */
async function embedImages(html, token) {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const matches = [ ...html.matchAll(imgRegex) ];
  let result = html;
  const imageDataUris = [];

  for (const match of matches) {
    const url = match[ 1 ];
    if (!url || !url.startsWith("http")) continue;

    try {
      // Add auth header for GitHub-hosted resources; harmless for others
      const headers = {};
      if (
        url.includes("github.com") ||
        url.includes("githubusercontent.com") ||
        url.includes("github-production-user-asset") ||
        url.includes("user-attachments")
      ) {
        headers[ "Authorization" ] = `Bearer ${token}`;
        headers[ "User-Agent" ] = "jira-style-report";
      }

      const res = await fetch(url, { headers });

      if (!res.ok) {
        console.warn("⚠️ Failed to fetch image:", url, res.status);
        continue;
      }

      const contentType = res.headers.get("content-type") || "image/png";
      const arrayBuffer = await res.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUri = `data:${contentType};base64,${base64}`;

      imageDataUris.push(dataUri);
      // Remove the original img tag
      result = result.replace(match[ 0 ], '');
    } catch (e) {
      console.warn("⚠️ Error embedding image:", url, e.message);
      // keep original URL if we fail
    }
  }

  // Wrap all images in a single div with class img-wrapper
  if (imageDataUris.length > 0) {
    const imgTags = imageDataUris.map(uri => `<img src="${uri}" alt="Image">`).join('\n        ');
    result += `\n<div class="img-wrapper">\n        ${imgTags}\n</div>`;
  }

  return result;
}

async function main() {
  const repoFull = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;

  if (!repoFull || !token) {
    console.error("Missing GITHUB_REPOSITORY or GITHUB_TOKEN env");
    process.exit(1);
  }

  const [ owner, repo ] = repoFull.split("/");

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=50`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "jira-style-report",
    },
  });

  if (!res.ok) {
    console.error("GitHub API error:", res.status, await res.text());
    process.exit(1);
  }

  const issuesJson = await res.json();
  const issues = issuesJson.filter((i) => !i.pull_request); // skip PRs

  const issueBlocks = [];

  for (const issue of issues) {
    const created = new Date(issue.created_at).toLocaleString();
    const updated = new Date(issue.updated_at).toLocaleString();

    const labels = (issue.labels || [])
      .map((l) => (typeof l === "string" ? l : l.name))
      .join(", ");

    // 1) Markdown → HTML
    let descriptionHtml = marked(issue.body || "");

    // 2) Embed images as Base64
    descriptionHtml = await embedImages(descriptionHtml, token);
    const block = `
<table class="issue">
  <tr class="issue-header">
    <td colspan="4">
      [BUG#${issue.number}]
      <a href="${issue.html_url}">
        ${issue.title}
      </a>
      <div style="font-weight:normal;font-size: 12px;color: #333;margin-top: 7px;">
        Created: ${created}
      </div>
    </td>
  </tr>

  <tr>
    <td class="label-cell">Status:</td>
    <td>${issue.state}</td>
    <td class="label-cell">Labels:</td>
    <td>${labels || "-"}</td>
  </tr>

  <tr>
    <td class="label-cell">Type:</td>
    <td>Issue</td>
    <td class="label-cell">Assignee:</td>
    <td>${issue.assignee?.login || "Unassigned"}</td>
  </tr>

  <tr>
    <td colspan="4" class="section-header">Description</td>
  </tr>
  <tr>
    <td colspan="4">
      <div class="container">
        ${descriptionHtml}
      </div>
    </td>
  </tr>
</table>
<br/>
`;
    issueBlocks.push(block);
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${repo} – Issue Report</title>
  <style>

    html, body {
      height: auto;
      font-family: Arial, 
      sans-serif; 
      font-size: 14px; 
    }

    * {
      page-break-before: avoid;
      page-break-after: avoid;
      page-break-inside: avoid;
    }

    table.issue { border-collapse: collapse; width: 100%; }
    table.issue td { border: 1px solid #b5b5b5; padding: 4px; vertical-align: top; }
    .issue-header { background: #f4f4f4; font-weight: bold; font-size: 14px; }
    .label-cell { background: #e6e6e6; font-weight: bold; width: 15%; white-space: nowrap; }
    .section-header { background: #d9d9d9; font-weight: bold; }
    a { color: #0000ff; text-decoration: underline; }
    .container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 10px;
        overflow: hidden;
    }

    .img-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }

    .img-wrapper img {
        width: calc(50% - 20px);
        height: 100%;
        object-fit: contain;
        border-radius: 7px;
        border: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <h1>${repo} – Issue Report</h1>
  ${issueBlocks.join("\n") || "<p>No issues found.</p>"}
</body>
</html>`;

  const outPath = path.join(__dirname, "issue-report.html");
  await fs.writeFile(outPath, html);
  console.log("✔ Generated:", outPath);
}

await main();
