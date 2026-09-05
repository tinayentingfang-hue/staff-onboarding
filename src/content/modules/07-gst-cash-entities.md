Billing at ISO is split across three modules: GST and cash handling rules here, invoicing in [Module 8: Create Invoice](/modules/create-invoice), and closing out the day in [Module 9: End of Day Reconciliation](/modules/end-of-day-reconciliation).

## 1. GST at a Glance

Correctly applying GST is a legal requirement, not a preference. The general rule: **cosmetic services and products carry GST, medical and Medicare items don't.** Know this table before you touch an invoice.

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

## 2. Cash Handling Rules

- Bulk-billed (Medicare) items are processed by the doctor only: never add one without their direct instruction.
- Instant Medicare rebates only work for item 23 or 36, with a physical debit card. Everything else goes through an online claim.
- Every cash movement gets logged in the Cash In/Out log, whether the payment is finalised or left on hold.
- Any mismatch between Tyro and Best Practice at end of day: tell Dr Tina immediately. Don't try to fix it yourself first.

## 3. Taking Cash Payments

Two things happen every single time, before anything else: the cash goes in the locked box, and the movement is logged. What happens next depends on whether the patient needs a receipt.

![Flowchart: cash always goes into the locked box and the Cash In/Out log immediately. If the patient needs a printed invoice, finalise the payment, print it, log it as finalised, and email Dr Tina. If not, leave the billing on hold with no email required.](/images/modules/billing-financial-procedures/cash-payment-flowchart.svg)

Worked example: an out-of-pocket payment that also carries an instant Medicare rebate. The private fee sits on hold; the rebate is bulk-billed separately under item 23.

| Service | Private fee (on hold, no GST) | Bulk-billed rebate (item 23) |
|---|---|---|
| Full skin check | $104.95 | $45.05 |
| Spot check | $54.95 | $45.05 |

## 4. Entities — Which Merchant Is Which Provider

At ISO, three merchant entities share one Tyro terminal day to day, plus a fourth that only appears when Dr David Fang is covering as backup doctor.

Dr David Fang fills in as backup doctor when Dr Jack Fu and Dr Tina Fang are both away. His entity only appears on Tyro and in the batch during those periods.

| Tyro merchant ID | Represents |
|---|---|
| TFang Medical | ISO Skin Clinic |
| TF Skin | Dr Tina Fang |
| JFu Medical | Dr Jack Fu |
| Dr David Fang | Dr David Fang (backup doctor) |
