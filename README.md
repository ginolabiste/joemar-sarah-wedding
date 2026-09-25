# Joemar & Sarah Wedding Website

Static wedding website prepared for GitHub Pages.

## Publish with GitHub Pages

1. Create a new GitHub repository (for example `joemar-sarah-wedding`).
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then click **Save**.
6. GitHub will provide the live Pages URL after deployment finishes.

The site uses root-level relative files (`style.css` and `script.js`), so it works both on a project Pages URL and a custom domain.

## RSVP

The premium RSVP button links to the existing Joy invitation:
`https://withjoy.com/Joemar-and-Sarah`

## Local preview

Open `index.html` directly in a browser, or run any simple static HTTP server from this directory.

## Wedding program

The Program section in `index.html` lists the wedding party, parents, principal
sponsors, emcee, and officiating minister from `LIST (1).docx`. The document does
not contain an order of activities. The confirmed website schedule remains
2 PM for the ceremony and 5 PM for the reception, superseding the document's
4 PM time.

## Table arrangements

The Find Your Table section contains 20 tables and 198 guest entries from the
`GUEST LIST` sheet in `WEDDING CHECKLIST (1).xlsx` (rows 2–27). Names, repeated
entries, and plus ones are preserved as supplied. Only that sheet is included.

Edit the `.table-card` guest lists in `index.html` to update seating. Keep each
card's `data-table` number and heading consistent, and update its guest count.
Search supports partial names, multiple name words, and exact table numbers
(for example `3` or `Table 3`). All seating remains readable without JavaScript.
The list is a static snapshot; changing the workbook does not update the site.
