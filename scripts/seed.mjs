// Seeds the training modules + starter quiz questions into Supabase.
// Run once after the schema migration, with the service role key available:
//
//   node --env-file=.env.local scripts/seed.mjs
//
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (Project Settings → API).
// This key bypasses row-level security — never expose it to the browser or
// commit it to git. It's fine to remove it from .env.local after seeding.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local first."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const MODULES = [
  { num: 1, slug: "introduction", title: "Introduction" },
  { num: 2, slug: "clinic-policies", title: "Clinic Policies" },
  { num: 3, slug: "housekeeping", title: "Housekeeping" },
  { num: 4, slug: "records-pathology-photos", title: "Records, Pathology & Patient Photos" },
  { num: 5, slug: "communication-booking", title: "Communication & Booking" },
  { num: 6, slug: "services", title: "Services" },
  { num: 7, slug: "gst-cash-entities", title: "GST, Cash & Entities" },
  { num: 8, slug: "create-invoice", title: "Create Invoice" },
  { num: 9, slug: "end-of-day-reconciliation", title: "End of Day Reconciliation" },
  { num: 10, slug: "medicare-item-numbers", title: "Medicare Item Numbers" },
];

const QUIZZES = {
  introduction: [
    {
      q: "Where is ISO Skin Cancer & Laser Clinic located?",
      options: [
        "Suite 209, 1808 Logan Road, Upper Mount Gravatt",
        "Suite 105, 1808 Logan Road, Upper Mount Gravatt",
        "Suite 12, 200 Kessels Road, Upper Mount Gravatt",
        "Suite 209, 1808 Beenleigh Road, Upper Mount Gravatt",
      ],
      correct: 0,
    },
    {
      q: "If no staff parking is available on Basement Level 2 (B2), what should you do?",
      options: [
        "Park in a reserved Body Corporate space",
        "Use street parking",
        "Leave the car in the loading zone",
        "Wait in the car park until a space opens up",
      ],
      correct: 1,
    },
    {
      q: "What does Dr Tina Fang emphasise so the clinic has more face-to-face time with patients?",
      options: [
        "Hiring more reception staff",
        "Efficiency — doing things the most effective way",
        "Shorter appointment times for everyone",
        "Closing the clinic earlier",
      ],
      correct: 1,
    },
    {
      q: "What happens if a patient is rude or behaves inappropriately toward staff?",
      options: [
        "Nothing — the patient is always right",
        "They are kindly declined further service",
        "They are given a discount to apologise",
        "Only Dr Tina can address it",
      ],
      correct: 1,
    },
    {
      q: "Who should you contact for IT support issues at the clinic?",
      options: ["Ivy Chin", "Light Source Computing", "Phil at World Class Creatives", "Charles"],
      correct: 1,
    },
  ],
  "clinic-policies": [
    {
      q: "What is ISO's fragrance policy for staff?",
      options: [
        "Any fragrance is fine as long as it's not overpowering indoors",
        "Only fragrance-free products are allowed on shift",
        "No strong perfume or cologne — light or no fragrance is preferred",
        "Fragrance is only restricted in Room 2",
      ],
      correct: 2,
    },
    {
      q: "When two staff members are on duty, what's the rule about breaks?",
      options: [
        "They should take breaks together to save time",
        "Breaks are not permitted during a shift",
        "One staff member must always remain at reception — do not take breaks together",
        "Breaks can only be taken after 3pm",
      ],
      correct: 2,
    },
    {
      q: "Why should food with strong odours be avoided in the staff room?",
      options: [
        "It's against health regulations",
        "We're a small clinic and it lingers for patients and colleagues",
        "The microwave can't handle it",
        "Dr Tina Fang dislikes the smell of all food",
      ],
      correct: 1,
    },
    {
      q: "What should you do with your personal belongings at the end of a shift?",
      options: [
        "Leave them in the staff room overnight",
        "Take all personal items home — nothing should be left in the clinic",
        "Store them in the reception desk drawers",
        "Leave them in Room 1 or Room 2",
      ],
      correct: 1,
    },
    {
      q: "Which of these needs a doctor's attention immediately, without second-guessing?",
      options: [
        "A billing question from a patient",
        "An allergic reaction, of any degree",
        "An IT issue with the computer",
        "A booking availability question",
      ],
      correct: 1,
    },
  ],
  housekeeping: [
    {
      q: "Why are shared consumables like gauze and micropore stocked identically in Room 1 and Room 2?",
      options: [
        "So each room can specialise in only one type of procedure",
        "So whichever room you're in, you always know where to look",
        "To save money on ordering",
        "Because Room 1 and Room 2 are never used on the same day",
      ],
      correct: 1,
    },
    {
      q: "What should be done with cardboard boxes before disposal?",
      options: ["Left as-is in the bin", "Flattened", "Burned", "Returned to the supplier"],
      correct: 1,
    },
    {
      q: "Which item is stocked in Printer Tray 2?",
      options: ["Blank paper", "Prescription paper", "Pathology paper", "Laminator sheets"],
      correct: 2,
    },
    {
      q: "How much liquid nitrogen should typically be used per cryotherapy application?",
      options: ["A full tank", "1–2 scoops", "5 scoops", "None — it's applied undiluted from the bottle"],
      correct: 1,
    },
    {
      q: "How much time should be allocated each day for essential cleaning tasks?",
      options: ["5 minutes", "At least 30 minutes", "2 hours", "Cleaning is only done weekly"],
      correct: 1,
    },
    {
      q: "What two things should be completed before staff leave each day?",
      options: [
        "Cliniva AI phone call follow-ups and the cleaning tasks",
        "Only the cleaning tasks",
        "Only the Cliniva AI calls",
        "Restocking Room 1 only",
      ],
      correct: 0,
    },
  ],
  "records-pathology-photos": [
    {
      q: "When a patient calls asking about histology results, what's best practice?",
      options: [
        "Always disclose the result immediately",
        "Check with the doctors first before disclosing the result",
        "Refuse to discuss it under any circumstances",
        "Tell them to check their MyGov account",
      ],
      correct: 1,
    },
    {
      q: "Where are pathology records filed?",
      options: [
        "Email inbox only",
        "S Drive → Pathology → YYYY.MM.DD",
        "Printed and stored in a binder only",
        "Patient's phone via SMS",
      ],
      correct: 1,
    },
    {
      q: "How should patient photos be named?",
      options: [
        "By the patient's first name only",
        "By the date taken, in the format YYYY.MM.DD",
        "By a random reference number",
        "By the doctor's initials",
      ],
      correct: 1,
    },
    {
      q: "How long should patients expect to wait for biopsy results?",
      options: ["24 hours", "3 days", "7 working days", "1 month"],
      correct: 2,
    },
  ],
  "communication-booking": [
    {
      q: "If a patient is waiting at reception and the phone rings at the same time, what should you do?",
      options: [
        "Answer the phone first — the patient can wait",
        "Attend to the patient at reception first, and let the call go to Jess, our Cliniva AI receptionist",
        "Ignore both until you're free",
        "Put the patient on hold and answer the phone",
      ],
      correct: 1,
    },
    {
      q: "What should you never say to a patient about the schedule?",
      options: [
        "\"That slot is booked, but I have an alternative time.\"",
        "\"Let me check with the doctor.\"",
        "\"Would you prefer morning or afternoon?\"",
        "\"That time isn't available.\"",
      ],
      correct: 1,
    },
    {
      q: "A patient walks in late without apologising. What's the correct response?",
      options: [
        "Point out that they're late",
        "Simply check them in and say nothing further about the lateness",
        "Ask them to reschedule immediately",
        "Explain how it affects the doctor's schedule",
      ],
      correct: 1,
    },
    {
      q: "Should appointment reminder SMS messages be sent individually or in batches?",
      options: [
        "In batches, to save time",
        "Individually, to avoid mistakes",
        "It doesn't matter",
        "Only in batches after 5pm",
      ],
      correct: 1,
    },
    {
      q: "When a family comes in together, how should you send appointment reminders?",
      options: [
        "Send one SMS per family member",
        "Don't send SMS to families",
        "Send one SMS per family, listing everyone's name and time",
        "Call each family member instead",
      ],
      correct: 2,
    },
    {
      q: "When replying to a negative Google review on behalf of the clinic, what should you do?",
      options: [
        "Argue with the reviewer publicly",
        "Disclose the patient's treatment details to prove them wrong",
        "Reply briefly and professionally, invite them to contact the clinic directly, and flag it to Dr Tina Fang",
        "Delete the review",
      ],
      correct: 2,
    },
    {
      q: "What is the first of the \"4 steps\" after every procedure (FSE, Spot Check, Biopsy, etc.)?",
      options: [
        "Book the next appointment immediately",
        "Check if the patient is happy — \"How did it go?\"",
        "Take payment first",
        "Print the aftercare sheet",
      ],
      correct: 1,
    },
  ],
  services: [
    {
      q: "A patient asks online if you can check a mole for them. Which brand handles this?",
      options: [
        "ISO Clinic",
        "Dr Tina Fang",
        "Either brand, doesn't matter",
        "Neither — refer them elsewhere",
      ],
      correct: 0,
    },
    {
      q: "How long is a standard skin check appointment?",
      options: ["10 minutes", "15 minutes", "30 minutes", "45 minutes"],
      correct: 1,
    },
    {
      q: "What is the price and Medicare rebate for a Full Skin Check?",
      options: [
        "$100, rebate $45.05",
        "$150, rebate $45.05",
        "$150, no rebate",
        "$200, rebate $100",
      ],
      correct: 1,
    },
    {
      q: "Which days is Photodynamic Therapy (PDT) available?",
      options: [
        "Monday, Wednesday, Friday afternoons",
        "Tuesday, Thursday and Friday mornings",
        "Every weekday",
        "Weekends only",
      ],
      correct: 1,
    },
    {
      q: "A patient asks over email how much Botox costs with Dr Tina Fang. What do you say?",
      options: [
        "Quote the per-unit price directly — $12/unit",
        "Say it's free with a consult",
        "Refuse, and say pricing can only be discussed at a consultation",
        "Tell them to check the website",
      ],
      correct: 0,
    },
    {
      q: "A Dermal Clinician/Registered Nurse appointment is booked for 1 hour and the patient needs numbing cream. What do you tell them?",
      options: [
        "Arrive 30 minutes early for the numbing cream",
        "Nothing extra — numbing cream time is already included in the 1-hour slot",
        "Numbing cream isn't available for RN/Clinician treatments",
        "Book a separate appointment for numbing cream",
      ],
      correct: 1,
    },
    {
      q: "What is the general GST rule for ISO's services?",
      options: [
        "All services incur GST",
        "No services incur GST",
        "Cosmetic services and products incur GST; most medical services do not",
        "Only Medicare-billed services incur GST",
      ],
      correct: 2,
    },
  ],
  "gst-cash-entities": [
    {
      q: "What is the general GST rule at ISO?",
      options: [
        "Cosmetic services and products incur GST; most medical services do not",
        "All services incur GST",
        "No services incur GST",
        "GST only applies to Medicare items",
      ],
      correct: 0,
    },
    {
      q: "Who is allowed to process bulk-billed items?",
      options: ["Any receptionist", "Only the doctors", "Only Tina", "Anyone, with a manager's verbal approval"],
      correct: 1,
    },
    {
      q: "When can you use an instant Medicare rebate?",
      options: [
        "Any time the patient asks for it",
        "Only for item 23 or 36, with a physical debit card",
        "Only for cosmetic items",
        "Only on weekends",
      ],
      correct: 1,
    },
    {
      q: "What must happen with every cash movement, even if the payment is left on hold?",
      options: [
        "Nothing, until it's finalised",
        "It must be logged in the Cash In/Out log",
        "It must be emailed to Medicare",
        "It must be counted twice by two staff",
      ],
      correct: 1,
    },
    {
      q: "Which Tyro merchant ID represents ISO Skin Clinic?",
      options: ["JFu Medical", "TF Skin", "TFang Medical", "ISO Cosmetic"],
      correct: 2,
    },
  ],
  "create-invoice": [
    {
      q: "When billing a patient under 18, who should the invoice be billed to?",
      options: [
        "The child directly",
        "The head of family",
        "Medicare only",
        "It cannot be billed until they turn 18",
      ],
      correct: 1,
    },
    {
      q: "If EasyClaim fails, how long should you wait before reprocessing the claim?",
      options: ["Immediately retry", "15 minutes", "24 hours", "7 days"],
      correct: 1,
    },
    {
      q: "What is phone payment (MOTO) used for?",
      options: [
        "Any invoice over $500",
        "Gift cards & deposits only",
        "Medicare rebates only",
        "Cosmetic consultations only",
      ],
      correct: 1,
    },
    {
      q: "Item 45201 (flap repair) must always be billed together with what?",
      options: ["A biopsy item", "An excision item", "A PDT item", "Nothing else — it's billed alone"],
      correct: 1,
    },
    {
      q: "When billing a Skin Check together with a Cosmetic item, what's the correct order?",
      options: [
        "Bill them together as one item",
        "Bill separately — the Cosmetic item first",
        "Bill separately — the Skin Check first",
        "Only bill the Cosmetic item",
      ],
      correct: 2,
    },
  ],
  "end-of-day-reconciliation": [
    {
      q: "In Stage A of end-of-day reconciliation, what should you do with every Tyro receipt?",
      options: [
        "Throw it away once payment is taken",
        "Write the patient's name clearly on it, or staple it to their BP invoice",
        "Email it to Medicare",
        "File it under the doctor's name only",
      ],
      correct: 1,
    },
    {
      q: "What does Stage B of end-of-day reconciliation involve?",
      options: [
        "Printing and settling the EFTPOS summary for each provider on Tyro",
        "Sending the batch in Best Practice",
        "Filling the cryotherapy tank",
        "Emailing Dr Tina a summary",
      ],
      correct: 0,
    },
    {
      q: "What does Stage C of end-of-day reconciliation involve?",
      options: [
        "Sending the batch in Best Practice to bank each provider's takings",
        "Settling the Tyro terminal",
        "Writing patient names on receipts",
        "Restocking the cash box",
      ],
      correct: 0,
    },
    {
      q: "If Tyro and Best Practice don't match at the end of the day, what should you do?",
      options: [
        "Adjust the numbers yourself so they match",
        "Ignore it if the difference is small",
        "Tell Dr Tina immediately — don't try to track it down or fix it yourself first",
        "Wait until the next day to check",
      ],
      correct: 2,
    },
  ],
  "medicare-item-numbers": [
    {
      q: "What MBS item number is used for a standard skin biopsy?",
      options: ["23", "30071", "31357", "45201"],
      correct: 1,
    },
    {
      q: "What should you always double-check before finalising a skin excision bill?",
      options: ["The patient's postcode", "The gap amount", "The doctor's signature colour", "The appointment length"],
      correct: 1,
    },
    {
      q: "Item 45451 is used for which procedure?",
      options: [
        "Full thickness skin graft (FTSG)",
        "Cryotherapy",
        "Curettage and cautery",
        "Lip, eyelid, or ear wedge repair",
      ],
      correct: 0,
    },
    {
      q: "Which item number is used for curettage and cautery?",
      options: ["30075", "30062", "30084", "31220"],
      correct: 0,
    },
    {
      q: "What is the Medicare rebate (85%) for item 31358 (BCC/SCC ≥6mm excision, Area 1)?",
      options: ["$275.60", "$225.20", "$363.25", "$170.95"],
      correct: 0,
    },
  ],
};

async function main() {
  for (const m of MODULES) {
    const content = readFileSync(
      path.join(__dirname, "..", "src", "content", "modules", `${String(m.num).padStart(2, "0")}-${m.slug}.md`),
      "utf-8"
    );

    const { data: moduleRow, error: moduleError } = await supabase
      .from("modules")
      .upsert(
        { slug: m.slug, order_index: m.num, title: m.title, content },
        { onConflict: "slug" }
      )
      .select()
      .single();

    if (moduleError) {
      console.error(`Failed to upsert module ${m.slug}:`, moduleError.message);
      continue;
    }

    console.log(`Module ${m.num} "${m.title}" seeded.`);

    const questions = QUIZZES[m.slug] ?? [];

    // Clear existing questions for this module so re-running the seed is safe.
    await supabase.from("quiz_questions").delete().eq("module_id", moduleRow.id);

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const { data: questionRow, error: qError } = await supabase
        .from("quiz_questions")
        .insert({ module_id: moduleRow.id, question: q.q, order_index: i })
        .select()
        .single();

      if (qError) {
        console.error(`  Failed to insert question "${q.q}":`, qError.message);
        continue;
      }

      const { error: optError } = await supabase.from("quiz_options").insert(
        q.options.map((text, idx) => ({
          question_id: questionRow.id,
          option_text: text,
          is_correct: idx === q.correct,
          order_index: idx,
        }))
      );
      if (optError) console.error(`  Failed to insert options:`, optError.message);
    }

    console.log(`  ${questions.length} quiz questions seeded.`);
  }

  console.log("\nDone. You can now remove SUPABASE_SERVICE_ROLE_KEY from .env.local.");
}

main();
