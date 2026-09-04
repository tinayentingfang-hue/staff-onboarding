A walkthrough of how we apply GST, bill Medicare, raise an invoice, take payment and reconcile the day, in the order you'll actually use them.

**Before you touch a live invoice**
1. Cosmetic = GST. Medical / Medicare = no GST. Check the GST table below if you're not sure.
2. Bulk-billed (Medicare) items are processed by the doctor only: never add one without their direct instruction.
3. Instant Medicare rebates only work for item 23 or 36, with a physical debit card. Everything else goes through an online claim.
4. Every cash movement gets logged in the Cash In/Out log, whether the payment is finalised or left on hold.
5. Any mismatch between Tyro and Best Practice at end of day: tell Dr Tina immediately. Don't try to fix it yourself first.

## How It All Connects

Every billing task on the floor is one of five moments, in order:
1. Patient is seen for a service.
2. Invoice raised: provider, GST, service, who's billed.
3. Payment taken: EFTPOS, cash or phone.
4. Medicare claim, if the item carries a rebate.
5. End-of-day reconciliation.

## GST at a Glance

Correctly applying GST is a legal requirement, not a preference. The general rule: **cosmetic services and products carry GST, medical and Medicare items don't.** Know this table before you touch an invoice — it's one of the four questions you'll answer every time.

| Service | GST? | Billed to |
|---|---|---|
| Initial cosmetic consult | GST | Clinic |
| Skincare products | GST | Clinic |
| Photodynamic therapy (PDT) | No GST | Doctor |
| Insurance reports | GST | Doctor |
| Procedure fee / medications | No GST | Doctor or Clinic |
| Medicare item services | No GST | Doctor |
| Cosmetic mole removal | GST | Doctor |
| Cosmetic treatments | GST | Doctor or Clinic |

## Medicare Billing

The other question every invoice answers: is this a Medicare item, and if so, how does the patient want their rebate? The path a claim takes depends on how and when that happens.

![Decision tree: bulk-billed items go straight to Medicare at no cost to the patient and are processed by the doctor only. Private-fee items are paid in full by the patient, then rebated either instantly on the terminal (only for item 23 or 36 with a physical debit card) or later through an online claim to the patient's Medicare-registered bank account.](/images/modules/billing-financial-procedures/medicare-billing-decision-tree.svg)

> **If you're not sure:** Only use instant rebate for item 23 or 36 with a physical debit card. Not sure if the patient's card is physical, or if they bank with Macquarie? Don't attempt instant rebate — send it through as an online claim instead. Item 23/36 rebates land in about 24 hours; procedure items can take up to 7 days.

**When EasyClaim fails**

Tell the patient: "we'll process this online." Print the invoice so they can check the rebate in their bank. Wait 15 minutes, then reprocess: Billing History → tick "Show payment/deposit" → right-click the invoice → **Send online patient claim**.

## Creating an Invoice

You now know the GST table and the Medicare paths. This is where they actually get used. Four questions, in this order, decide how the invoice is built.

![Flowchart: choose the provider, apply GST, select the service, then confirm who is billed. Decide whether one invoice or two invoices are needed depending on whether a private fee is charged alongside a Medicare-rebate item. Bulk-billed items are doctor-only.](/images/modules/billing-financial-procedures/invoice-creation-flowchart.svg)

- **Provider assignment:** every invoice is raised under a doctor or the clinic. Check which before you start.
- **Billing minors:** patient under 18? Bill the head of family, not the child.
- **Clinic vs. doctor accounts:** cosmetic items generally bill to the clinic; medical and Medicare items bill to the doctor. See the GST table above.

## Taking Payments

**Phone payment (MOTO): gift cards & deposits only**
Menu → Transactions → MOTO → Purchase → select provider → purchase amount → Telephone order → PIN 6291 → card no., exp, CVC → wait for connection → untick Tyro.

**Cash payment**

Two things happen every single time, before anything else: the cash goes in the locked box, and the movement is logged. What happens next depends on whether the patient needs a receipt.

![Flowchart: cash always goes into the locked box and the Cash In/Out log immediately. If the patient needs a printed invoice, finalise the payment, print it, log it as finalised, and email Dr Tina. If not, leave the billing on hold with no email required.](/images/modules/billing-financial-procedures/cash-payment-flowchart.svg)

Worked example: an out-of-pocket payment that also carries an instant Medicare rebate. The private fee sits on hold; the rebate is bulk-billed separately under item 23.

| Service | Private fee (on hold, no GST) | Bulk-billed rebate (item 23) |
|---|---|---|
| Full skin check | $104.95 | $45.05 |
| Spot check | $54.95 | $45.05 |

## End-of-Day Reconciliation

At ISO, three merchant entities share one Tyro terminal day to day, plus a fourth that only appears when Dr David Fang is covering as backup doctor. The point of EOD is simple: make sure what Tyro recorded and what Best Practice recorded are the same number, for every provider, every day.

**Stage A: during every transaction — name the receipt**
Write the patient's name clearly on the Tyro receipt, or staple it to the patient's handwritten BP invoice.

**Stage B: print the EFTPOS summary, per provider — settle each merchant on Tyro**
Repeat this for every provider who worked that day: ISO Skin Cancer, JFu Medical, TF Skin, and Dr David Fang if he's covering.
Menu → 3. Settlement & Reports → 2. Reconciliation Report → select merchant → 1. Current → Summary → All cards → Print → **Settle**.

**Stage C: send the batch in Best Practice — bank each provider's takings**
BP Premier → Management → Banking → File → Now Batch → select bank → Add to batch → select date → select provider → Add → **Process**.
The paper should print out. Repeat for every provider working that day.

**Stage D: reconcile and file — match the numbers, then file**
Confirm the dollar amount matches between Tyro and Best Practice for every provider. Staple the receipts to the report and scan. Use extra pages if that's what it takes for every receipt to be legible.

> **Any mismatch:** tell Dr Tina immediately. Don't try to track it down or fix it yourself first.

**Which merchant is which provider**

Dr David Fang fills in as backup doctor when Dr Jack Fu and Dr Tina Fang are both away. His entity only appears on Tyro and in the batch during those periods.

| Tyro merchant ID | Represents |
|---|---|
| TFang Medical | ISO Skin Clinic |
| TF Skin | Dr Tina Fang |
| JFu Medical | Dr Jack Fu |
| Dr David Fang | Dr David Fang (backup doctor) |
