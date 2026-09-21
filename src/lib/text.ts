/**
 * Render a plain string as HTML with the registered mark raised, the way the
 * markup writes it by hand ("Collaborative Search<sup>®</sup>"). The string
 * is escaped first, so data files can hold plain text safely.
 */
export function sup(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return escaped.replace(/®/g, "<sup>®</sup>");
}
