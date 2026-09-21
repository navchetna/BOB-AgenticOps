// Distinct colors for the document field-extraction demo — one per field,
// cycling if a document has more fields than colors. Chosen to stay
// legible as a ~15%-opacity fill with a solid border on white paper.
export const FIELD_COLORS = [
  '#2563eb', // blue
  '#dc2626', // red
  '#0d9488', // teal
  '#d97706', // amber
  '#7c3aed', // violet
  '#059669', // green
  '#db2777', // pink
  '#0284c7', // sky
  '#c2410c', // burnt orange
  '#4f46e5', // indigo
  '#65a30d', // lime
  '#be123c', // rose
  '#0891b2', // cyan
  '#9333ea', // purple
  '#a16207', // gold
  '#16a34a', // emerald
]

export function fieldColor(index) {
  return FIELD_COLORS[index % FIELD_COLORS.length]
}

// Given a document (with a `fieldMap` of docRowId -> [outputFieldName]) and
// the output fields of the step currently being viewed, work out which
// document rows are actually relevant right now and assign each one a
// color — shared across every output field it feeds, so two output rows
// pulled from the same sentence get the same box.
export function buildExtractionColors(doc, outputFields) {
  const byRowId = {}
  const byFieldName = {}
  if (!doc?.fieldMap) return { byRowId, byFieldName }

  let next = 0
  for (const field of outputFields) {
    const rowId = Object.keys(doc.fieldMap).find((id) => doc.fieldMap[id].includes(field.name))
    if (!rowId) continue
    if (!byRowId[rowId]) {
      byRowId[rowId] = fieldColor(next++)
    }
    byFieldName[field.name] = byRowId[rowId]
  }
  return { byRowId, byFieldName }
}
