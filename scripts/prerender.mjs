import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");

async function prerender() {
  console.log("Starting prerender...");

  const prerenderer = new Prerenderer({
    staticDir: distPath,
    renderer: new PuppeteerRenderer({
      renderAfterDocumentEvent: "render-complete",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }),
  });

  try {
    await prerenderer.initialize();

    const renderedRoutes = await prerenderer.renderRoutes(["/"]);

    for (const route of renderedRoutes) {
      const filePath = path.join(distPath, route.route, "index.html");
      const dirPath = path.dirname(filePath);

      // Create directory if it doesn't exist
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Add meta tag to indicate prerendered content
      const html = route.html.replace(
        "</head>",
        '<meta name="prerendered" content="true"></head>'
      );

      fs.writeFileSync(filePath, html);
      console.log(`Prerendered: ${route.route}`);
    }

    console.log("Prerender complete!");
  } catch (error) {
    console.error("Prerender failed:", error);
    process.exit(1);
  } finally {
    await prerenderer.destroy();
  }
}

prerender();
