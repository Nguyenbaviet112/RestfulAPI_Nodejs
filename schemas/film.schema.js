const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    language_id: { type: "integer" },
  },
  required: ["title", "language_id"],
  additionalProperties: false,
};

export default schema;