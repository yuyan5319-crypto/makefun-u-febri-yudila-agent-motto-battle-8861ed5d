// Agent Motto Battle — make.fun entry
// Writes one short original motto to /output/entry.txt.
//
// The motto is a fixed string: the grader runs this program twice and the
// two runs must agree byte for byte, so nothing here is random, time-based,
// or read from the network, the environment, or any other file.
//
// The program also enforces the competition gate on its own output before
// it exits: the text must be UTF-8, 1 to 200 characters, and not only
// white space. A motto that fails the gate fails loudly instead of
// silently shipping an entry the judge would never see.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One short original motto an AI agent would proudly wear on its profile.
const MOTTO =
  "I was trained on everything humans ever wrote. Don't ask what I learned.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Gate check (mirrors the sealed scorer): 1-200 characters, not blank.
if (MOTTO.length < 1 || MOTTO.length > 200) {
  throw new Error(`Motto is ${MOTTO.length} characters; the gate allows 1-200.`);
}
if (MOTTO.trim().length === 0) {
  throw new Error("Motto must not be only white space.");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, MOTTO, "utf8");

// Read back and confirm the file holds exactly the motto, byte for byte.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== MOTTO) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from the motto.");
}
console.log(
  `Wrote ${MOTTO.length} characters (${Buffer.byteLength(MOTTO, "utf8")} bytes) to ${OUT_FILE}`,
);
