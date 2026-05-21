const SHEET_URL = "https://script.google.com/macros/s/AKfycbx39SPsEamQf62vfF7bM59hlXroysNxX53kvlNjd1iZwkrV6Cpx0YcsiFB2OzcqLPQE/exec";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const response = await fetch(SHEET_URL + "?t=" + Date.now());
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const response = await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.toString() });
  }
}
