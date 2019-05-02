interface Response {
  method?: string;
  response: string | null;
}

export type Field = 'name';

type FieldMap = {
  [K in Field]: Response;
}

export const mapFieldToResponse = (field: Field, value: string): Response => {
  const map: FieldMap = {
    name: {
      method: 'setName',
      response: `Hello, ${value}! Nice to meet you.`,
    },
  };
  return map[field] || { response: null };
};
