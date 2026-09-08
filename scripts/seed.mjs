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
  "introduction": [
    {
      q: "What type of doctors are Dr Tina Fang and Dr Jack Fu?",
      options: ["Dermatologists", "GPs with specialised training in skin cancer, cosmetic injectables and laser", "Plastic surgeons", "Oncologists"],
      correct: 1,
    },
    {
      q: "When is Dr Jack Fu at ISO Clinic?",
      options: ["Friday mornings", "Monday mornings", "Every afternoon", "Saturday"],
      correct: 0,
    },
    {
      q: "What does Dr Tina Fang place a strong emphasis on?",
      options: ["Marketing", "Efficiency: doing things the most effective way", "Hiring more doctors", "Opening a second location"],
      correct: 1,
    },
    {
      q: "What happens to patients who display rude or inappropriate behaviour?",
      options: ["Nothing, the patient is always right", "They are kindly declined further service", "They are given a discount to apologise", "Only Dr Tina can address it"],
      correct: 1,
    },
    {
      q: "Is staff parking provided on-site?",
      options: ["Yes, a dedicated staff car park", "No, staff parking is not provided on-site", "Only for doctors", "Only on weekends"],
      correct: 1,
    },
    {
      q: "Who should you contact for payroll questions?",
      options: ["Ivy Chin", "Phil at World Class Creatives", "Charles", "Denise Curtis"],
      correct: 0,
    },
    {
      q: "Who handles IT support for the clinic?",
      options: ["Breeze Connect", "Light Source Computing", "World Class Creatives", "Infinity Pathology"],
      correct: 1,
    },
    {
      q: "Who should you contact for website or email issues?",
      options: ["Ivy Chin", "Charles", "Phil at World Class Creatives", "Light Source Computing"],
      correct: 2,
    },
    {
      q: "Where should you check for a contact not listed in Module 1?",
      options: ["Ask Dr Jack Fu", "The contacts spreadsheet in the Admin folder on the S Drive", "Call Infinity Pathology", "Check the reception noticeboard"],
      correct: 1,
    },
  ],

  "clinic-policies": [
    {
      q: "What is the clinic's fragrance policy?",
      options: ["Any fragrance is fine", "No strong perfume or cologne; light or no fragrance is preferred", "Fragrance is banned entirely", "Only restricted in Room 2"],
      correct: 1,
    },
    {
      q: "What is the mandatory break requirement for shifts of 5 hours or more?",
      options: ["No break required", "15-minute break", "30-minute break", "1-hour break"],
      correct: 2,
    },
    {
      q: "When two staff members are on duty, what's the rule about breaks?",
      options: ["Take breaks together to save time", "One staff member must always be at reception; don't take breaks together", "Breaks are not permitted", "Breaks can only be taken after 3pm"],
      correct: 1,
    },
    {
      q: "What is the staff discount for cosmetic treatments performed by a colleague or by Dr Tina Fang personally?",
      options: ["10% off", "20% off", "30% off", "50% off"],
      correct: 2,
    },
    {
      q: "What is the friends & family discount, and who must perform the treatment?",
      options: ["2 x 20% off, only by a Registered Nurse or Dermal Clinician", "2 x 30% off, any provider", "1 x 50% off, Dr Tina Fang only", "No discount is available"],
      correct: 0,
    },
    {
      q: "What applies if a friend or family member is treated by Dr Tina Fang personally?",
      options: ["30% off", "20% off", "Full fees apply", "Free of charge"],
      correct: 2,
    },
    {
      q: "Which of these needs a doctor's attention immediately, without second-guessing?",
      options: ["A billing question", "An IT issue", "Vascular occlusion", "A scheduling question"],
      correct: 2,
    },
    {
      q: "What should you do with non-urgent matters like billing or IT issues?",
      options: ["Interrupt the doctor immediately", "Wait until the doctors aren't busy, or send an end-of-day summary email", "Ignore them", "Handle them without telling the doctor"],
      correct: 1,
    },
    {
      q: "Why can't Dr Tina Fang provide medical consultations to staff members?",
      options: ["She's not qualified to", "To avoid a conflict of interest, and it can't be billed to Medicare", "Staff aren't allowed to see any doctor", "It's against clinic hours policy"],
      correct: 1,
    },
    {
      q: "What should you do first if you can't work a rostered shift?",
      options: ["Contact Dr Tina Fang immediately", "Contact your colleagues directly to arrange cover", "Just don't show up", "Post in the group chat and wait"],
      correct: 1,
    },
    {
      q: "How often do Content Days happen?",
      options: ["Once a month", "Approximately 2-3 times a year", "Every week", "Once a year only"],
      correct: 1,
    },
    {
      q: "Who is the primary contact for HR concerns involving another staff member?",
      options: ["Dr Tina Fang", "Dr Jack Fu", "Ivy Chin", "The reception manager"],
      correct: 1,
    },
  ],

  "housekeeping": [
    {
      q: "Why are shared consumables stored in the same place in both rooms?",
      options: ["It's an insurance requirement", "So whichever room you're in, you always know where to look", "Room 2 is bigger", "Medicare requires it"],
      correct: 1,
    },
    {
      q: "What must be done to cardboard boxes before disposal?",
      options: ["Recycled separately from other rubbish", "Flattened", "Burned", "Left in Room 1"],
      correct: 1,
    },
    {
      q: "How often should Mail Box 209 be checked?",
      options: ["Daily", "Every Tuesday and Friday", "Once a week", "Only when expecting mail"],
      correct: 1,
    },
    {
      q: "What is Room 1 primarily used for?",
      options: ["Laser treatments", "Routine skin checks and minor procedures", "Staff breaks", "IV wellness drips only"],
      correct: 1,
    },
    {
      q: "What is Room 2 designated for?",
      options: ["Skin biopsies", "Laser treatments and related services", "Reception overflow", "Pathology storage"],
      correct: 1,
    },
    {
      q: "What is the ideal fill level for printer paper trays?",
      options: ["100%", "80%", "50%", "20%"],
      correct: 1,
    },
    {
      q: "At what fill level should printer trays be refilled?",
      options: ["Below 40%", "Below 90%", "Only when completely empty", "Never; refill daily regardless"],
      correct: 0,
    },
    {
      q: "What doubles as the staff room when it isn't being used for patient recovery?",
      options: ["Room 1", "Room 2", "The Recovery Room", "Reception"],
      correct: 2,
    },
    {
      q: "What's checked on the clinical bed setup for safety?",
      options: ["Only the sheets", "That all 4 wheels are locked", "Only the foot control", "Nothing; beds are pre-checked weekly"],
      correct: 1,
    },
    {
      q: "How many scoops of liquid nitrogen should typically be used for cryotherapy?",
      options: ["A full tank", "1-2 scoops", "5 scoops", "None; it's applied undiluted from the bottle"],
      correct: 1,
    },
    {
      q: "Who do you contact to order more liquid nitrogen?",
      options: ["East Coast Compounding", "Coregas Customer Service", "TerryWhite Chemmart", "IWG Compounding"],
      correct: 1,
    },
    {
      q: "How much time should be allocated for everyday cleaning tasks?",
      options: ["10 minutes", "At least 30 minutes each day", "2 hours", "Only on Fridays"],
      correct: 1,
    },
    {
      q: "Which of these counts as urgent during busy hours?",
      options: ["A billing question", "Bleeding non-stop", "A scheduling conflict", "An IT issue"],
      correct: 1,
    },
    {
      q: "What must be completed before you leave at the end of the day?",
      options: ["Only the cleaning tasks", "Only the phone call follow-ups", "Both the day's phone call follow-ups and the cleaning tasks", "Neither; it can wait until tomorrow"],
      correct: 2,
    },
  ],

  "records-pathology-photos": [
    {
      q: "What should you do if a patient has no known allergies?",
      options: ["Leave the allergy field blank", "View Record → Reactions → tick \"Nil known\"", "Write \"unknown\" in the notes", "Ask the patient to fill in a separate form"],
      correct: 1,
    },
    {
      q: "When should the New Patient Registration Form be prepared?",
      options: ["The morning of the appointment", "The day before, for the next day's patients", "A week in advance", "It's never needed if submitted online"],
      correct: 1,
    },
    {
      q: "Which treatments do NOT require a consent form?",
      options: ["Botox and filler", "Consultations, cryotherapy, and wart treatment", "PDT and Cosmetic Mole Removal", "All treatments require a consent form"],
      correct: 1,
    },
    {
      q: "How long does consent stay valid for Botox, skin boosters, and laser/IPL/microneedling/chemical peel treatments?",
      options: ["1 month", "6 months", "12 months", "Indefinitely"],
      correct: 2,
    },
    {
      q: "Do major procedures like dermal filler or PDT need a fresh consent even if the patient's existing consent is within 12 months?",
      options: ["No, the existing consent covers everything", "Yes, major procedures always need a fresh consent", "Only if the patient asks for one", "Only for new patients"],
      correct: 1,
    },
    {
      q: "Why personalise a consent form before printing it, rather than printing on autopilot?",
      options: ["It's a legal requirement", "It reflects the individual, considered care the clinic wants every patient to feel", "It saves paper", "It's faster to print"],
      correct: 1,
    },
    {
      q: "What is a Solar Keratosis?",
      options: ["A serious, life-threatening skin cancer", "A rough, scaly precancerous patch caused by long-term UV damage", "A benign mole", "An infection"],
      correct: 1,
    },
    {
      q: "What's the difference between IEC and SCC?",
      options: ["They are unrelated conditions", "IEC is an early, superficial form confined to the top layer; SCC can invade deeper tissue", "SCC is always benign", "IEC only occurs on the scalp"],
      correct: 1,
    },
    {
      q: "What is best practice when a patient calls to ask about histology results?",
      options: ["Tell them immediately over the phone", "Check with the doctors first before disclosing the result", "Refuse to discuss it at all", "Email the result without checking first"],
      correct: 1,
    },
    {
      q: "What should you offer if a patient calls with questions after a benign-result message?",
      options: ["Nothing, the message is sufficient", "Offer to email the result for their reference", "Book them in for another skin check", "Transfer them to Dr Tina Fang"],
      correct: 1,
    },
    {
      q: "Where do you find a pathology report the doctor has already checked?",
      options: ["BP Premier under the doctor's queue", "View Record → Investigation Reports", "The S Drive", "Call Infinity Pathology"],
      correct: 1,
    },
    {
      q: "What number do you call for an urgent pathology report?",
      options: ["1300 855 926", "1300 007 284", "1800 807 203", "07 3123 8888"],
      correct: 1,
    },
    {
      q: "What format should patient photos be named in?",
      options: ["DD.MM.YYYY", "YYYY.MM.DD", "The patient's name only", "A random file number"],
      correct: 1,
    },
    {
      q: "Where should patient photos be stored?",
      options: ["On the reception computer desktop", "The S Drive, under \"Patient photos to keep\"", "Personal phones", "They aren't stored, just AirDropped and deleted"],
      correct: 1,
    },
    {
      q: "How often should documents be scanned?",
      options: ["Every day, without exception", "Once a week, or whenever the clinic is quiet", "Only at the end of the month", "Never; everything stays on paper"],
      correct: 1,
    },
    {
      q: "What's the exception to scanning documents into the \"Scan 2\" folder?",
      options: ["Patient consent forms", "End-of-day (EOD) reconciliation paperwork", "Prescription paper", "There is no exception"],
      correct: 1,
    },
    {
      q: "How should you scan documents to USB?",
      options: ["All at once, in a batch", "One file at a time", "Only in PDF format", "Scanning to USB isn't allowed"],
      correct: 1,
    },
  ],

  "communication-booking": [
    {
      q: "What is the standard phone greeting?",
      options: ["\"ISO Clinic, how can I help?\"", "\"ISO Skin Cancer & Laser Clinic, [Your Name] speaking. How can I help you?\"", "\"Good morning, ISO Clinic speaking\"", "\"Thank you for calling, please hold\""],
      correct: 1,
    },
    {
      q: "If a patient is at reception and the phone rings, what takes priority?",
      options: ["The phone call", "The patient physically present in the clinic", "Whichever happened first", "Neither; let Jess handle both"],
      correct: 1,
    },
    {
      q: "When does full body photography start, and what does it cost?",
      options: ["Immediately, $100 per visit", "From January, $50 per visit", "From July, $75 per visit", "Free with every skin check"],
      correct: 1,
    },
    {
      q: "Does full body photography replace the doctor's Full Skin Examination (FSE)?",
      options: ["Yes, it's the same appointment", "No, it's a separate appointment and doesn't replace the doctor's skin check", "Only for new patients", "Only if requested in advance"],
      correct: 1,
    },
    {
      q: "What forms of ID can be used to confirm a new patient's identity?",
      options: ["Medicare card or driver's licence", "Passport only", "Verbal confirmation is enough", "A utility bill"],
      correct: 0,
    },
    {
      q: "Why does it matter whether a patient has been to the Upper Mt Gravatt clinic specifically?",
      options: ["It doesn't matter; any location counts", "Patients may have seen the doctor elsewhere and still need a new ISO file", "Only Medicare requires it", "It affects which SMS template is used"],
      correct: 1,
    },
    {
      q: "For phone bookings, what can staff do that they can't do for online bookings?",
      options: ["Nothing; they're treated the same", "Guide patients toward times that reduce schedule gaps", "Cancel other patients' appointments", "Offer bulk billing"],
      correct: 1,
    },
    {
      q: "Why should staff never say \"Let me check with the doctor\"?",
      options: ["It's rude", "It signals negotiation and invites pressure", "Doctors don't like being asked", "It wastes time"],
      correct: 1,
    },
    {
      q: "What should staff say if a requested appointment time isn't available?",
      options: ["Explain exactly why the doctor is busy", "Offer the nearest open slot instead of explaining why", "Say the doctor has gone out", "Tell the patient to call back later"],
      correct: 1,
    },
    {
      q: "Are cosmetic treatment prices (Botox, filler, etc.) published on the website?",
      options: ["Yes, always", "No; refer to Module 6: Services and quote directly from there", "Only for existing patients", "Prices are never disclosed over the phone"],
      correct: 1,
    },
    {
      q: "How should staff respond if a patient apologises for being late?",
      options: ["Point out that they're late", "Respond warmly, e.g. \"No worries at all, it works out perfectly!\"", "Ignore the apology", "Explain how it disrupts the schedule"],
      correct: 1,
    },
    {
      q: "What does a \"Green\" SMS template mean?",
      options: ["The patient has not yet confirmed", "The patient has already confirmed; it's a follow-up reminder sent closer to the date", "The appointment is cancelled", "It's only used for PDT patients"],
      correct: 1,
    },
    {
      q: "What does an \"Orange\" SMS template mean?",
      options: ["The patient has confirmed twice", "The patient has not yet confirmed; the appointment isn't secured until they do", "It's a reminder for LED treatments only", "It's sent only to new patients"],
      correct: 1,
    },
    {
      q: "Why are PDT reminder templates (1Day PDT, 1wk PDT) kept separate from the standard templates?",
      options: ["PDT patients don't need reminders", "The message needs to tell the patient the treatment takes around 3 hours", "PDT is billed differently", "There is no separate PDT template"],
      correct: 1,
    },
    {
      q: "Who is the \"1wk Routine Skin\" SMS template for?",
      options: ["New patients only", "Patients whose appointment was booked well in advance, e.g. 12 months ago", "Patients who cancelled and rebooked", "PDT patients only"],
      correct: 1,
    },
    {
      q: "How should appointment reminder SMS messages be sent?",
      options: ["In batches, to save time", "Individually, never in batches", "Only by email", "Only if the patient requests one"],
      correct: 1,
    },
    {
      q: "When a family comes in together, how many SMS messages should be sent?",
      options: ["One per family member", "One SMS per family, with all names and times included", "None; families don't need reminders", "Two per family"],
      correct: 1,
    },
    {
      q: "How should a positive Google review be handled?",
      options: ["Confirm the reviewer is a patient and thank them", "Thank the reviewer briefly and warmly, without confirming they are a patient", "Ignore it", "Offer them a discount"],
      correct: 1,
    },
    {
      q: "What is the first step after a Full Skin Exam (FSE)?",
      options: ["Book the next FSE", "Check if the patient is happy: \"How did it go?\"", "Take payment", "Print a receipt"],
      correct: 1,
    },
    {
      q: "What is the out-of-pocket payment for 1 biopsy after a Skin Check or Spot Check?",
      options: ["$25", "$50", "$100", "$150"],
      correct: 1,
    },
  ],

  "services": [
    {
      q: "What's the standard appointment length for Dr Tina Fang's medical aesthetics and hair restoration treatments?",
      options: ["15 minutes", "30 minutes", "1 hour", "45 minutes"],
      correct: 1,
    },
    {
      q: "How early should a patient arrive for a Dr Tina Fang appointment requiring numbing cream?",
      options: ["10 minutes", "30 minutes before", "No early arrival needed", "1 hour before"],
      correct: 1,
    },
    {
      q: "What is the price of a Full Skin Check?",
      options: ["$100", "$150", "$200", "$50"],
      correct: 1,
    },
    {
      q: "What is the gap fee for a single biopsy under the ISO Clinic table?",
      options: ["$25", "$50", "$75", "$100"],
      correct: 1,
    },
    {
      q: "What is the PDT price per region?",
      options: ["$300", "$500", "$700", "$900"],
      correct: 2,
    },
    {
      q: "Does PDT for early skin cancer need numbing cream?",
      options: ["Yes, always", "No; Dr Tina infiltrates with local anaesthetic instead", "Only for facial treatment", "Only if the patient requests it"],
      correct: 1,
    },
    {
      q: "Which product is sold only as a 100-unit vial, not per unit?",
      options: ["Botox", "Letybo", "Relfydess", "Daxxify"],
      correct: 3,
    },
    {
      q: "How is HIFU (Ultraformer III) typically priced?",
      options: ["A flat fee regardless of area", "Per shot or by area, decided after an in-person assessment", "Only by subscription", "It's not offered at ISO"],
      correct: 1,
    },
    {
      q: "Can IV Wellness therapies be booked under either brand?",
      options: ["No, ISO Clinic only", "No, Dr Tina Fang only", "Yes, offered under both brands at the same price", "Only for existing patients"],
      correct: 2,
    },
    {
      q: "If a patient asks online \"How much is Botox?\", what should staff do?",
      options: ["Say prices aren't available online", "Quote directly from the published price tables", "Ask them to book a consultation first", "Transfer them to Dr Tina Fang"],
      correct: 1,
    },
    {
      q: "Where should staff look for the full GST and Medicare rebate guide?",
      options: ["Module 5", "Module 7: GST, Cash & Entities", "Module 9", "It's fully explained in Module 6"],
      correct: 1,
    },
  ],

  "gst-cash-entities": [
    {
      q: "What is the general GST rule at ISO?",
      options: ["Everything is GST-free", "Cosmetic services and products carry GST; medical and Medicare items don't", "Only Medicare items carry GST", "GST applies equally to all services"],
      correct: 1,
    },
    {
      q: "Does Photodynamic Therapy (PDT) carry GST?",
      options: ["Yes", "No", "Only for cosmetic patients", "Only if billed to the clinic"],
      correct: 1,
    },
    {
      q: "Does Cosmetic Mole Removal carry GST?",
      options: ["No", "Yes", "Only for intimate area removals", "Only if paid by card"],
      correct: 1,
    },
    {
      q: "Who processes bulk-billed (Medicare) items?",
      options: ["Any staff member", "The doctor only", "Reception, with doctor approval after", "Best Practice does it automatically"],
      correct: 1,
    },
    {
      q: "Instant Medicare rebates only work for which items, and with what payment method?",
      options: ["Any item, any card", "Item 23 or 36, with a physical debit card", "Item 45201, with any card", "All Medicare items, cash only"],
      correct: 1,
    },
    {
      q: "What must happen with every cash movement, whether finalised or on hold?",
      options: ["Nothing; only finalised payments are logged", "It gets logged in the Cash In/Out log", "It's reported to Medicare", "It's held until end of month"],
      correct: 1,
    },
    {
      q: "If there's a mismatch between Tyro and Best Practice at end of day, what should you do?",
      options: ["Try to fix it yourself first", "See Module 9's Stage D for how to handle it", "Ignore it; it will balance out", "Delete the transaction and redo it"],
      correct: 1,
    },
    {
      q: "What are the two things that happen every time a cash payment is taken, before anything else?",
      options: ["Print a receipt and email Dr Tina", "The cash goes in the locked box and the movement is logged", "Count the till and call the bank", "Nothing; cash is processed like any other payment"],
      correct: 1,
    },
    {
      q: "Which Tyro merchant ID represents Dr Tina Fang's cosmetic entity?",
      options: ["TFang Medical", "TF Skin", "JFu Medical", "Dr David Fang"],
      correct: 1,
    },
    {
      q: "Which Tyro merchant ID represents ISO Skin Clinic?",
      options: ["TFang Medical", "TF Skin", "JFu Medical", "Dr David Fang"],
      correct: 0,
    },
    {
      q: "When does the \"Dr David Fang\" merchant entity appear on Tyro?",
      options: ["Every day", "When he's covering as backup doctor, i.e. when Dr Jack Fu and Dr Tina Fang are both away", "Only on weekends", "Never; it's not a real entity"],
      correct: 1,
    },
    {
      q: "Under the GST table, what is an insurance report billed to?",
      options: ["The clinic", "The doctor", "Medicare directly", "It's never billed"],
      correct: 1,
    },
  ],

  "create-invoice": [
    {
      q: "If a patient is under 18, who should the invoice be billed to?",
      options: ["The child directly", "The head of family", "Medicare only", "It can't be billed"],
      correct: 1,
    },
    {
      q: "Do cosmetic items generally bill to the clinic or the doctor?",
      options: ["The clinic", "The doctor", "Neither; they're bulk billed", "It depends on the patient's age"],
      correct: 0,
    },
    {
      q: "For instant Medicare rebates, which items and payment method are allowed?",
      options: ["Any item, any card", "Item 23 or 36, physical debit card only", "All items, physical card only", "Item 30071, any card"],
      correct: 1,
    },
    {
      q: "What should you tell a patient if EasyClaim fails?",
      options: ["\"We can't process this payment\"", "\"We'll process this online.\"", "\"Come back tomorrow\"", "\"You'll need to pay cash\""],
      correct: 1,
    },
    {
      q: "For a Skin Check invoice, which item number is added?",
      options: ["Item 30071", "Item 23", "Item 31358", "Item 45201"],
      correct: 1,
    },
    {
      q: "How much is added for 1 biopsy on top of a Skin Check or Spot Check?",
      options: ["$25", "$50", "$75", "$100"],
      correct: 1,
    },
    {
      q: "For Skin Check & Cosmetics, in what order should items be billed?",
      options: ["Cosmetic item first, then Skin Check", "Skin Check first, then the Cosmetic item", "They must be billed together in one line", "Order doesn't matter"],
      correct: 1,
    },
    {
      q: "Where should staff look for the excision tables when billing Skin Excisions?",
      options: ["Module 6", "Module 9", "Module 10: Medicare Item Numbers", "They aren't documented anywhere"],
      correct: 2,
    },
    {
      q: "Which item must be billed together with item 45201 (Skin Flap)?",
      options: ["A biopsy item", "The related excision item", "A PDT item", "Nothing else; it's billed alone"],
      correct: 1,
    },
    {
      q: "Can item 45451 (Skin Graft) be billed with or without an excision item?",
      options: ["No, always with an excision item", "Yes, it can be billed either way", "No, it's a standalone item only", "It cannot be billed at all"],
      correct: 1,
    },
  ],

  "end-of-day-reconciliation": [
    {
      q: "What is the overall point of the EOD process?",
      options: ["To count the cash box", "To make sure Tyro and Best Practice recorded the same number, for every provider", "To close the clinic for the night", "To reconcile staff hours"],
      correct: 1,
    },
    {
      q: "What should be written on the Tyro receipt during every transaction (Stage A)?",
      options: ["The provider's initials only", "The patient's name, clearly", "The item number", "Nothing; receipts are anonymous"],
      correct: 1,
    },
    {
      q: "In Stage B, what do you do for every provider who worked that day?",
      options: ["Print the EFTPOS summary and settle each merchant on Tyro", "Email Dr Tina a summary", "Count the till", "Nothing; Stage B is optional"],
      correct: 0,
    },
    {
      q: "In Stage C, where do you send the batch?",
      options: ["Tyro only", "Best Practice, to bank each provider's takings", "The bank directly, bypassing Best Practice", "It isn't required daily"],
      correct: 1,
    },
    {
      q: "In Stage D, which report should TF Skin Tyro receipts be stapled to?",
      options: ["The TFang Medical Pty Ltd report", "The JFu Medical report", "The TF Skin report", "They aren't stapled anywhere"],
      correct: 2,
    },
    {
      q: "Which report should ISO Clinic Tyro receipts be stapled to?",
      options: ["The TF Skin report", "The TFang Medical Pty Ltd report", "The JFu Medical report", "The Dr David Fang report"],
      correct: 1,
    },
    {
      q: "If there's a mismatch, what should you do?",
      options: ["Try to track it down and fix it yourself first", "Tell Dr Tina immediately", "Wait until the next day", "Ignore small mismatches"],
      correct: 1,
    },
    {
      q: "Which providers might you need to settle on Tyro on a given day?",
      options: ["Only ISO Skin Cancer", "ISO Skin Cancer, JFu Medical, TF Skin, and Dr David Fang if covering", "Only doctors, never technicians", "Whichever provider had the most patients"],
      correct: 1,
    },
    {
      q: "What should you do if extra pages are needed to keep every receipt legible?",
      options: ["Skip stapling those receipts", "Use extra pages, whatever it takes", "Photograph them instead", "Discard illegible receipts"],
      correct: 1,
    },
    {
      q: "What does Module 7 tell you, in relation to EOD?",
      options: ["The excision tables", "Which merchant ID belongs to which provider", "The GST rate", "The invoice walkthroughs"],
      correct: 1,
    },
  ],

  "medicare-item-numbers": [
    {
      q: "What body regions are covered under Area 1?",
      options: ["Trunk, upper arms and thighs", "Nose, eyelid, lip, ear and their contiguous areas, the digit, and the genitals", "Face, scalp, neck, nipple-areola complex, knee and forearm", "Only the face"],
      correct: 1,
    },
    {
      q: "What body regions are covered under Area 3?",
      options: ["Nose, eyelid, lip, ear", "Face, scalp and neck", "Trunk, upper arms and thighs, front and back", "Hands and feet only"],
      correct: 2,
    },
    {
      q: "What is item number 31358 for?",
      options: ["Benign excision <6mm, Area 1", "BCC/SCC excision ≥6mm, Area 1", "Melanoma excision <6mm, Area 1", "A biopsy item"],
      correct: 1,
    },
    {
      q: "What item number is used for a skin biopsy?",
      options: ["30072", "30071", "31220", "45201"],
      correct: 1,
    },
    {
      q: "What must item 45201 (Flap repair) be billed together with?",
      options: ["Nothing else", "The related excision item", "A biopsy item", "A skin graft item"],
      correct: 1,
    },
    {
      q: "What does item 45451 refer to?",
      options: ["Flap repair", "FTSG, full thickness skin graft", "Oral mucosa flap", "Lipoma removal"],
      correct: 1,
    },
    {
      q: "As of when were the rebates in Module 10 checked against MBS Online?",
      options: ["January 2026", "6 September 2026", "December 2025", "They've never been checked"],
      correct: 1,
    },
    {
      q: "What should staff always do before finalising a bill, according to Module 10?",
      options: ["Assume the gap is correct", "Double-check the gap amount, and confirm with Tina if in doubt", "Skip the gap check if in a hurry", "Wait for the doctor to check it"],
      correct: 1,
    },
    {
      q: "Where should staff look for step-by-step invoice walkthroughs using these item numbers?",
      options: ["Module 6", "Module 7", "Module 8: Create Invoice", "They aren't documented"],
      correct: 2,
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
