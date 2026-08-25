## Billing Basics

**Creating an invoice**
1. Choose the **provider**: Doctor or Clinic.
2. Decide **GST / No GST** (see the GST guide below).
3. Double-click the chosen service — fees can be changed if needed.
4. Decide who to **bill to**: patient, or head of family if the patient is under 18. Medicare items are bulk-billed.

**Two invoices?** Create two invoices when a private fee is billed on a Medicare-rebate item **and** the patient also has a separate private fee without a Medicare rebate.

**Bulk billing:** only let the doctors process bulk-billed items (e.g. billing to Medicare). Do not add a bulk-billed item without the doctor's instruction.

**GST application guideline**

| Item | GST? | Billed to |
|---|---|---|
| Initial Cosmetic Consult | GST | Clinic |
| Skincare Products | GST | Clinic |
| Photodynamic Therapy (PDT) | No GST | Doctor |
| Insurance Reports | GST | Doctor |
| Procedure Fee / Medications | No GST | Doctor / Clinic |
| Medicare Item Services | No GST | Doctor |
| Cosmetic Mole Removal | GST | Doctor |
| Cosmetic Treatments | GST | Doctor / Clinic |

Correctly applying GST is a legal requirement. General rule: cosmetic services and products incur GST, while most medical services do not.

## Medicare vs Private Billing

Understanding the difference between bulk-billing and private billing is essential for patient communication.

- **Bulk billed (Online Claim / Instant Rebate):** the invoice is sent directly to Medicare — no out-of-pocket cost to the patient.
- **Private fee:** the patient pays the full invoice amount at time of service, then claims a rebate from Medicare.
  - If the patient has a **physical debit card**, we can process the Medicare rebate on the spot through our terminal (only applies to items 23/36).
  - Otherwise, we can submit the claim to Medicare on their behalf online — the rebate is paid to the bank account registered with Medicare.
  - If unsure whether the patient has a physical debit card or uses Macquarie Bank, don't attempt instant rebate. Item 23/36 instant rebates take 24 hrs to process; procedure items can take up to 7 days.

## Provider & Patient Rules

- **Provider assignment:** always confirm which provider (doctor or clinic) the service is billed under.
- **Billing minors:** bill to the head of family for patients under 18.
- **Clinic vs doctor accounts:** some items bill to the clinic entity, others to the individual doctor — see the GST guideline table above.

## Payments

**Cash payment**
1. Record in the billing system as "On Hold."
2. If needed, recreate the billing and cancel the previous one.
3. Put the cash in the cash box immediately.
4. Document in the Cash In/Out log.

Scenarios:
- *Patient requires an invoice (payment finalised):* tick "pay full amount," Cash → Pay Now → print the invoice and give it to the patient → write "Finalised" in the rightmost (R) column of the log book → email Tina the invoice at tina.yenting.fang@gmail.com, subject "Finalised Cash Payment."
- *Patient does not require an invoice (payment on hold):* put the billing on hold (do not finalise) — it will show green in the system. No email required.
- *Out-of-pocket payment with instant rebate:* follow the instant rebate process above.

Rules: all finalised cash payments require email notification to Dr Tina with the invoice attached; on-hold cash payments do not require notification. Always put cash in the designated cash box immediately and document in the Cash In/Out log.

**Tyro merchant setup:** multiple merchant entities share the same Tyro EFTPOS terminal. Each merchant ID maps to a billing category:
- TFang Medical → ISO Skin Clinic
- TF Skin → Dr Tina Fang
- JFu Medical → Dr Jack Fu / Dr David Fang

**Phone payments via Tyro (gift cards / deposits)**
Menu → Transactions → MOTO → Purchase → select provider → purchase amount → Telephone order → PIN 6291 → enter card number, expiry, CVC → wait for connection → untick Tyro.

## Medicare

**When EasyClaim fails**
1. Tell the patient: "We will process this online."
2. Print the invoice for the patient to check the Medicare rebate in their bank.
3. Wait 15 minutes before reprocessing: Billing History → tick "Show payment/deposit" → right-click the correct invoice → Send online patient claim.

**Checking payments:** confirm the Medicare rebate has landed before closing out a query — see the EasyClaim retry steps above if it hasn't.

## End of Day (EOD)

**EOD billing procedure** — to ensure Tyro records match Best Practice (BP):
1. **During each transaction:** write the patient's name clearly on the Tyro receipt (or staple it to the patient's BP invoice if handwritten).
2. **At the end of the day:** print the EFTPOS summary report from Tyro for each merchant.
   Tyro steps: Menu → 3. Settlement & Reports → 2. Reconciliation Report → select merchant (1. ISO Skin Cancer / 2. JFu Medical / 3. TF Skin) → 1. Current → Summary → All cards → Print → Settle.
3. Repeat for all providers working that day.

**Recording transactions & printing EFTPOS/BP reports**
BP steps: BP Premier → Management → Banking → File → Now Batch → Bank to account (select bank) → Add to batch → select date → select provider (e.g. TFang Medical = ISO Skin Cancer) → Add → Process → paper should print out. Ensure the dollar amount matches Tyro — notify Dr Tina immediately of any discrepancies. Repeat for all providers working that day. Staple receipts to the report and scan (may need multiple pages to clearly show each receipt).

**Sending new batches:** follow the same BP Banking → Now Batch flow above once all providers for the day are reconciled.
