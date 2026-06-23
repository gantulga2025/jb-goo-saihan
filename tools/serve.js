const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".php": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function resolvePath(url) {
  const clean = decodeURIComponent(url.split("?")[0]);
  const requested = clean === "/" ? "/index.html" : clean;
  const file = path.normalize(path.join(root, requested));
  if (!file.startsWith(root)) return null;
  return file;
}

http
  .createServer((req, res) => {
    const file = resolvePath(req.url || "/");
    if (!file) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`JY Mongolian site running at http://localhost:${port}/`);
  });
