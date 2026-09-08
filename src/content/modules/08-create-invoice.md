How to raise an invoice once you know the GST and Medicare rules. See [Module 7: GST, Cash & Entities](/modules/gst-cash-entities) first if you haven't.

## 1. Creating an Invoice

Four questions, in this order, decide how the invoice is built.

![Flowchart: choose the provider, apply GST, select the service, then confirm who is billed. Decide whether one invoice or two invoices are needed depending on whether a private fee is charged alongside a Medicare-rebate item. Bulk-billed items are doctor-only.](/images/modules/billing-financial-procedures/invoice-creation-flowchart.svg)

- **Provider assignment:** every invoice is raised under a doctor or the clinic. Check which before you start.
- **Billing minors:** patient under 18? Bill the head of family, not the child.
- **Clinic vs. doctor accounts:** cosmetic items generally bill to the clinic; medical and Medicare items bill to the doctor. See the GST table in [Module 7](/modules/gst-cash-entities).

## 2. Medicare Rebate Paths

![Decision tree: bulk-billed items go straight to Medicare at no cost to the patient and are processed by the doctor only. Private-fee items are paid in full by the patient, then rebated either instantly on the terminal (only for item 23 or 36 with a physical debit card) or later through an online claim to the patient's Medicare-registered bank account.](/images/modules/billing-financial-procedures/medicare-billing-decision-tree.svg)

> **If you're not sure:** Only use instant rebate for item 23 or 36 with a physical debit card. Not sure if the patient's card is physical, or if they bank with Macquarie? Don't attempt instant rebate; send it through as an online claim instead. Item 23/36 rebates land in about 24 hours; procedure items can take up to 7 days.

**When EasyClaim fails**

Tell the patient: "we'll process this online." Print the invoice so they can check the rebate in their bank. Wait 15 minutes, then reprocess: ✏️ Billing History → tick "Show payment/deposit" → right-click the invoice → **Send online patient claim**.

## 3. Phone Payments (MOTO)

Phone payment (MOTO) is for gift cards & deposits only.
✏️ Menu → Transactions → MOTO → Purchase → select provider → purchase amount → Telephone order → PIN 6291 → card no., exp, CVC → wait for connection → untick Tyro.

## 4. Invoice Walkthroughs by Procedure

**Skin Check**

✏️ Select patient → New Account → Provider: Dr → Bill to: Patient / Head of family → Add item 23 → $150 (double-click to change the amount if needed) → Pay Now.

Payment routing: send online to the patient's registered bank account, or process via physical debit/savings card. (No Macquarie Bank for instant rebate.)

![Best Practice payment details screen for a $150 skin check: tick "Pay full amount", then either "Send via Patient Claiming" to send online to the patient's registered bank account, or "Send via Easyclaim" for a physical debit/savings card (not Macquarie Bank), then click Process](/images/modules/create-invoice/skin-check-payment-screen.png)

**Skin Check & Biopsy**

Add item 30071 onto Skin Check (item 23, $150) or Spot Check (item 23, $100).
- 1 biopsy: +$50
- 2 biopsies: +$75
- 3 biopsies: +$100
- 4 biopsies: +$120
- Any additional: +$25

✏️ Add Medicare: Provider: Dr → Bill to: Medicare → MBS Item 30071 → Service details: location (no symbols or double spaces) → Restriction code: if more than 1 biopsy, mark "separate site" (or "not for comparison" if only 1 biopsy) → add another 30071 as needed.

![Fee amount dialog for a biopsy: Fee to Charge set to 200.00, Restriction code set to "Not for Comparison"](/images/modules/create-invoice/side-by-side-biopsy-fee-amount.png)
![Account item dialog for MBS item 30071 (skin biopsy): Service details field and Restriction code set to "Separate Sites"](/images/modules/create-invoice/side-by-side-biopsy-account-item.png)

**Skin Check & Cosmetics**

Bill separately: always do the Skin Check first, then the Cosmetic item.
✏️ New Account → Provider: Dr → Bill to: Patient / Head of family → select the service (e.g. Cosmetic Mole Removal) → $350 → if the item has GST ticked, must also tick "Fee includes GST" → Pay Now.

![Account item dialog with Cosmetic Mole Removal (Doctor) double-clicked from the Default list: Fee to Charge 350, "Item has GST" and "Fee includes GST" both ticked](/images/modules/create-invoice/cosmetic-mole-removal-account-item.png)

**Skin Excisions**

See [Module 10: Medicare Item Numbers](/modules/medicare-item-numbers) for the excision tables, and always double-check the gap before finalising.

![Skin Excisions invoice walkthrough: 1) enter the MBS item number (e.g. 31358) and select the matching description; 2) check the Fee to Charge and fill in Service details (e.g. "nose"); 3) click Add; 4) double-check the Gap amount on Account details; 5) click Pay now](/images/modules/create-invoice/skin-excisions-account-item-walkthrough.jpg)

**Skin Flap**

Item **45201** must be billed together with the excision item.
1. Add item 45201 → double-click → add "Gap" to the MBS rebate (e.g. $410.45 + $450 = $860.45) → service detail (e.g. "arm").
2. Add another item: the excision number (e.g. 31369) → double-click → change the fee to charge the same as the MBS rebate (e.g. $243.85) → service detail ("arm").
3. In Notes, record: "45201 related to 31369."
4. Check the gap matches the doctor's request, then Pay Now.

**Skin Graft**

Item **45451** can be billed with or without an excision item.
1. Add item 45451 → MBS rebate + gap (e.g. $469.80 + $450 = $919.80) → service detail (e.g. "nose").
2. Add another item: the excision item (e.g. 31358) → double-click → click MBS Rebate (fee to charge changes accordingly, e.g. $268.60) → service detail ("nose") → Add.
3. In Notes, record: "45451 related to 31358."
4. Check the gap fee before Pay Now.
