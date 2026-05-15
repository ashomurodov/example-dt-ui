# Live Demo

The site includes a working CRM-style document list at `/demo`. Every element below is a dt-ui component.

## What's on the page

- **Stats row** (4 cards): total documents, active count with green dot, pending count with orange dot, total volume — built with `DtCard` + `DtCardHeader` + `DtBadge`.
- **Tab filter**: `DtTabSwitcher` filters by status (All / Active / Moderation / Rejected).
- **Search + create toolbar**: `DtSearchToolbar` for query input and a Create action that opens a `DtDialog` with `DtInput`.
- **Status filter dropdown**: `DtSelect` for finer status filtering.
- **Document table**: `DtDataTable` with custom slot rendering for amount (formatted UZS), status (`DtStatusBadge`), and edit action (`DtButton ghost xs`).
- **Pagination**: `DtPagination` driven by the filtered result count.

## Layout

The whole demo lives inside the same `DtLayout` shell as the docs — same sidebar, same header, same dark-mode toggle. The page itself is a `DtPageView` with `max-width="1280px"`.

Source: this site's `src/views/DemoView.vue` (in the example-dt-ui repo). It's ~200 lines and a reasonable starting point for any list-page screen in your own product.
