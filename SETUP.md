# ISO Training Portal — Setup Guide

This is a step-by-step guide for Tina (no coding needed) to get the portal live
with real data, running on your own computer to start.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up / log in.
2. Click **New Project**. Name it "ISO Training Portal," choose a database
   password (save it somewhere safe), and pick a region close to Australia
   (e.g. Sydney).
3. Wait a minute or two for the project to finish setting up.

## 2. Create the database tables

1. In your Supabase project, open the **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open the file [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
   in this project, copy the whole thing, paste it into the SQL editor, and
   click **Run**.
4. You should see "Success. No rows returned." That means all the tables
   (staff profiles, modules, quiz questions, progress, notes) are created.

## 3. Get your API keys

1. In Supabase, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. In this project folder, copy `.env.local.example` to a new file named
   `.env.local`, and paste those two values in.
4. Also copy the **service_role** key (further down the same page) into
   `.env.local` — you'll need it once, in the next step, to load the training
   content.

## 4. Load the training content

Run this from the project folder:

```bash
node --env-file=.env.local scripts/seed.mjs
```

This loads the 8 training modules and their starter quiz questions into your
Supabase database. You can re-run it any time to reset the modules back to
their original text (it won't touch staff accounts, progress, or notes).

Once it finishes, you can delete the `SUPABASE_SERVICE_ROLE_KEY` line from
`.env.local` — it's only needed for this one-off step, and it's powerful
enough to bypass all security, so it shouldn't stay around.

## 5. Configure sign-in emails

In Supabase, go to **Authentication → URL Configuration**.
- Set **Site URL** to `http://localhost:3000` for now (you'll update this to
  your real web address once the portal is deployed online).
- Add `http://localhost:3000/**` to **Redirect URLs**.

That's it — no need to edit the email templates. (Editing them requires
connecting your own outgoing email service, which isn't necessary here: the
portal is built to work with Supabase's default invite/reset emails as-is.)

## 6. Run the portal locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the login
page.

## 7. Set up your own admin account

1. In Supabase, go to **Authentication → Users → Add user → Invite user**.
2. Enter `tina.yenting.fang@gmail.com` and send the invite.
3. Check that inbox for the invite email, click the link — it'll take you to
   the portal to set a password. You'll be signed in as **admin**
   automatically (the system recognises this email).

## 8. Invite a new receptionist

1. In Supabase: **Authentication → Users → Add user → Invite user**.
2. Enter their email address and send the invite.
3. They'll get an email with a link to set their own password — after that
   they can log in and start working through the modules.
4. Once they've logged in at least once, go to the portal's **Admin** page —
   you'll see them listed, and can track their progress there. (Their name
   and start date can be added from the SQL Editor for now — ask if you'd
   like a proper profile-editing screen added.)

## 9. Putting it online (so staff can access it from anywhere)

The portal runs locally on your computer for testing. To make it available
as a real website:

1. Push this project to a GitHub repository.
2. Create a free account at [vercel.com](https://vercel.com) and import the
   repository.
3. In Vercel's project settings, add the same `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` values from `.env.local`.
4. Once deployed, update Supabase's **Site URL** and **Redirect URLs**
   (step 5 above) to your real Vercel address instead of `localhost:3000`.

This step isn't needed to try the portal today — just for when you're ready
to give staff real access.
