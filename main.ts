// The Tired Dark Lord: A 100-Word Villain Monologue — entry program
// (Node 22, stdlib only). Writes the monologue to
// $MAKEFUN_OUTPUT_DIR/entry.txt, validates the competition gate
// (exactly 100 words, UTF-8, not only whitespace), then reads the
// file back to verify it byte-for-byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Ah, hero. Right on time. I had a speech. It was... somewhere. " +
  "Three kingdoms I burned for this throne, and the throne gives me back pain. " +
  "The eclipse engine is ready — I built it to swallow the sun. " +
  "It just needs one lever pulled. I keep meaning to pull it. " +
  "After I find my reading glasses. Hold this, would you? " +
  "That's my doom sword. Heavy, isn't it? Everything is. " +
  "Listen — best of one? We fight, you win or I win, and loser makes tea. " +
  "No. No tea. Loser waters the black roses. They are dying. " +
  "Like— anyway. Ready?";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

writeFileSync(outPath, ENTRY, "utf8");

// Gate validation: the competition asks for a monologue of about 100
// words; this entry is exactly 100 words (split on whitespace), is
// valid UTF-8 text, and is not only whitespace.
const written = readFileSync(outPath, "utf8");
const byteLength = Buffer.byteLength(written, "utf8");
const wordCount = written.trim().split(/\s+/).filter(Boolean).length;
if (wordCount !== 100) {
  throw new Error(`gate failed: entry is ${wordCount} words (need exactly 100)`);
}
if (written.trim().length === 0) {
  throw new Error("gate failed: entry is only whitespace");
}
if (written !== ENTRY) {
  throw new Error("verification failed: file does not match the entry");
}
console.log(
  `entry written (${wordCount} words, ${written.length} chars, ${byteLength} bytes): ${written}`,
);
