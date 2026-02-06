const assert = require("assert");
const fs = require("fs/promises");
const path = require("path");

const { buildSite } = require("../scripts/build.js");

describe("build", () => {
  it("creates html with expected title and link", async () => {
    await buildSite();
    const html = await fs.readFile(
      path.join(__dirname, "..", "dist", "index.html"),
      "utf8"
    );

    assert.ok(
      html.includes(
        "Inside Drupal CMS 2.0: Q&amp;A with Product Owner Pam Barone"
      )
    );
    assert.ok(html.includes("View Code"));
    assert.ok(html.includes("victorstack-ai/drupal-blog-inside-drupal-cms-2-qa"));
  });
});
