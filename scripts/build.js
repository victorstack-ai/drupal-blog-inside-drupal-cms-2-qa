const fs = require("fs/promises");
const path = require("path");
const { marked } = require("marked");

const projectRoot = path.resolve(__dirname, "..");

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildSite = async () => {
  const postPath = path.join(projectRoot, "src", "post.md");
  const templatePath = path.join(projectRoot, "src", "template.html");
  const outputDir = path.join(projectRoot, "dist");
  const outputPath = path.join(outputDir, "index.html");

  const rawPost = await fs.readFile(postPath, "utf8");
  const lines = rawPost.split("\n");
  let title = "Untitled";
  if (lines[0] && lines[0].startsWith("# ")) {
    title = lines.shift().slice(2).trim() || title;
    if (lines[0] && lines[0].trim() === "") {
      lines.shift();
    }
  }

  const bodyMarkdown = lines.join("\n");
  const htmlContent = marked.parse(bodyMarkdown);
  const template = await fs.readFile(templatePath, "utf8");
  const date = new Date().toISOString().slice(0, 10);

  const html = template
    .replace("{{title}}", escapeHtml(title))
    .replace("{{title}}", escapeHtml(title))
    .replace("{{date}}", escapeHtml(date))
    .replace("{{content}}", htmlContent);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, html);

  return { outputPath, title, date };
};

if (require.main === module) {
  buildSite();
}

module.exports = { buildSite };
