# Structured workspace views

Structured views show the same Markdown-backed items in a layout suited to the
current decision. They do not copy notes into a separate database.

## Choose a view

- **List** for scanning and grouping.
- **Table** for comparing selected fields in compact rows.
- **Cards** for summaries that adapt to desktop, tablet, and narrow Android
  freeform windows.
- **Board**, **Calendar**, **Timeline**, and **Outline** for status, dates, and
  hierarchy.
- **Map** for items with valid latitude and longitude.
- **Relationships** for a graph or accessible relationship list.

## Configure a Table or Cards view

1. Open the workspace and select **Views**.
2. Choose **Table** or **Cards**.
3. Open the view menu to set filters, sorting, grouping, and visible columns.
4. Save the view locally, or enable **Share with this workspace** to write the
   safe definition to `devdesk-views.json`.

Supported columns include title, type, status, tags, due date, updated date,
path, and word count. Word count is a built-in read-only calculation; a view
cannot execute a custom formula or project code.

Personal views remain device-local. A shared definition contains presentation
settings, not note bodies, credentials, execution trust, or Android permission
grants.

## Map safety

If an item has incomplete or invalid coordinates, DevDesk leaves it out of Map
and explains why. The offline coordinate view does not send locations to an
online map provider. Keep sensitive locations out of shared Markdown.

## Use with an AI agent

Saved views help a person inspect work; they are not proof that a task is
complete. An assigned MCP agent receives bounded project and Markdown context
only through the permissions you enable, and any proposed file change still
requires review.
