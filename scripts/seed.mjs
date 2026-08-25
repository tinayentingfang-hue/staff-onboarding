// Seeds the 8 training modules + starter quiz questions into Supabase.
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
  { num: 1, slug: "introduction-orientation", title: "Introduction & Orientation" },
  { num: 2, slug: "services-overview", title: "Services Overview" },
  { num: 3, slug: "patient-interaction-bookings", title: "Patient Interaction & Bookings" },
  { num: 4, slug: "sms-communication", title: "SMS & Patient Communication" },
  { num: 5, slug: "billing-financial-procedures", title: "Billing & Financial Procedures" },
  { num: 6, slug: "clinical-support-records", title: "Clinical Support & Records" },
  { num: 7, slug: "facility-maintenance-daily-ops", title: "Facility Maintenance & Daily Operations" },
  { num: 8, slug: "billing-item-numbers", title: "Billing — Item Numbers & Procedure Codes" },
];

const QUIZZES = {
  "introduction-orientation": [
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
      q: "What should you do with your personal belongings at the end of a shift?",
      options: [
        "Leave them in the staff room overnight",
        "Take all personal items home — nothing should be left in the clinic",
        "Store them in the reception desk drawers",
        "Leave them in Room 1 or Room 2",
      ],
      correct: 1,
    },
  ],
  "services-overview": [
    {
      q: "How long is a standard skin check appointment?",
      options: ["10 minutes", "15 minutes", "30 minutes", "45 minutes"],
      correct: 1,
    },
    {
      q: "What is the price and Medicare rebate for a Full Skin Check?",
      options: [
        "$100, rebate $43.90",
        "$150, rebate $43.90",
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
      q: "What price should be confirmed with a patient booking a laser treatment with Dr Tina Fang (vs a Clinician/Technician)?",
      options: [
        "$350 with Dr Tina, $800 with a Clinician",
        "$800 with Dr Tina, $350 with a Clinician/Technician",
        "$500 either way",
        "Laser treatments are always free with a consult",
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
  "patient-interaction-bookings": [
    {
      q: "What should you say when you need to place a phone caller on hold to help a patient in front of you?",
      options: [
        "\"Can you hold on a sec?\"",
        "\"ISO Skin Cancer & Laser Clinic, may I please place you on hold?\"",
        "Just put them on hold without saying anything",
        "\"I'll call you back later.\"",
      ],
      correct: 1,
    },
    {
      q: "A patient says they've seen Dr Tina before, but only at Sundoctors — never at ISO Upper Mt Gravatt. What do you do?",
      options: [
        "Book under their existing Sundoctors file",
        "Treat them as new to ISO and create a new patient file",
        "Refuse to book them",
        "Ask them to bring proof from Sundoctors first",
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
      q: "What should you check to confirm a new patient's identity?",
      options: [
        "Their social media profile",
        "Their Medicare card or driver's licence",
        "A verbal date of birth only, no ID needed",
        "Their employer's details",
      ],
      correct: 1,
    },
  ],
  "sms-communication": [
    {
      q: "How many reminders should a standard appointment (booked more than a week out) receive?",
      options: [
        "None — reminders are optional",
        "Just a 1-day reminder",
        "A 1-week reminder and a 1-day reminder",
        "Three reminders across the week",
      ],
      correct: 2,
    },
    {
      q: "Should reminder messages be sent individually or in batches?",
      options: [
        "In batches, to save time",
        "Individually, to avoid mistakes",
        "It doesn't matter",
        "Only in batches after 5pm",
      ],
      correct: 1,
    },
    {
      q: "When a family comes in together, how should you message them?",
      options: [
        "Send one SMS per family member",
        "Don't send SMS to families",
        "Send one SMS per family, listing everyone's name and time",
        "Call each family member instead",
      ],
      correct: 2,
    },
    {
      q: "What must you manually adjust for a patient's appointment reminder if they need numbing cream?",
      options: [
        "The clinic room",
        "The appointment time in the message",
        "The doctor's name",
        "The SMS template colour",
      ],
      correct: 1,
    },
    {
      q: "Why should you minimise spaces in SMS messages?",
      options: [
        "To make them harder to read",
        "To reduce the cost of SMS credits",
        "It has no real reason",
        "To fit the clinic logo",
      ],
      correct: 1,
    },
  ],
  "billing-financial-procedures": [
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
      q: "For a finalised cash payment, what must you email to Dr Tina?",
      options: [
        "Nothing — cash payments don't need reporting",
        "The invoice, with subject \"Finalised Cash Payment\"",
        "A photo of the cash box",
        "Only a verbal confirmation",
      ],
      correct: 1,
    },
    {
      q: "If you're unsure whether a patient has a physical debit card or uses Macquarie Bank, should you attempt an instant rebate?",
      options: [
        "Yes, always try it first",
        "No — don't attempt instant rebate if unsure",
        "Only on Fridays",
        "Ask the patient to decide",
      ],
      correct: 1,
    },
    {
      q: "Which Tyro merchant ID represents ISO Skin Clinic?",
      options: ["JFu Medical", "TF Skin", "TFang Medical", "ISO Cosmetic"],
      correct: 2,
    },
  ],
  "clinical-support-records": [
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
    {
      q: "What is the out-of-pocket cost for one biopsy?",
      options: ["$25", "$50", "$100", "It's always bulk billed"],
      correct: 1,
    },
  ],
  "facility-maintenance-daily-ops": [
    {
      q: "Which of these counts as urgent during busy hours?",
      options: [
        "A general pricing question",
        "Bleeding that won't stop",
        "A request to update contact details",
        "A question about opening hours",
      ],
      correct: 1,
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
      q: "What PPE should be worn while filling the cryotherapy tank?",
      options: ["No PPE required", "Gloves and eye protection", "A face mask only", "Ear protection"],
      correct: 1,
    },
    {
      q: "What should be done with leftover liquid nitrogen after a procedure?",
      options: [
        "Poured down the sink",
        "Poured back into the tank",
        "Left in the applicator overnight",
        "Thrown in the general rubbish bin",
      ],
      correct: 1,
    },
  ],
  "billing-item-numbers": [
    {
      q: "What MBS item number is used for a standard skin biopsy?",
      options: ["23", "30071", "31357", "45201"],
      correct: 1,
    },
    {
      q: "Item 45201 (flap repair) must always be billed together with what?",
      options: ["A biopsy item", "An excision item", "A PDT item", "Nothing else — it's billed alone"],
      correct: 1,
    },
    {
      q: "What should you always double-check before finalising a skin excision bill?",
      options: ["The patient's postcode", "The gap amount", "The doctor's signature colour", "The appointment length"],
      correct: 1,
    },
    {
      q: "If EasyClaim fails, how long should you wait before reprocessing the claim?",
      options: ["Immediately retry", "15 minutes", "24 hours", "7 days"],
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
