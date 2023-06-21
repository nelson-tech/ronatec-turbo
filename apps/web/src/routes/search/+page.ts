import { error } from '@sveltejs/kit';
import { z } from 'zod';
import data from './data.json';

// TODO:
// https://www.reddit.com/r/sveltejs/comments/116k1fw/filter_supabasesveltekit_page/
// Better to do with a GET form, the load data does it for both cases

const validationSchema = z.object({
  s: z.string().trim().min(3).optional(),
  x: z.string().trim().min(3),
});

export const load = async ({ url }) => {
  const s = url.searchParams.get('s');
  const x = url.searchParams.get('s');
  const formData = { s, x };
  // console.log(`url: [${JSON.stringify(url.searchParams.get('s'), undefined, 2)}]`);
  // console.log(`url.searchParams: [${JSON.stringify(url.search, undefined, 2)}]`);

  if (data) {
    let filtered = data.products;
    if (s) {
      // validation
      const validationData = validationSchema.safeParse(formData);
      if (!validationData.success) {
        // Loop through the errors array and create a custom errors array
        const errors = validationData.error.errors.map((error) => {
          return {
            field: error.path[0],
            message: error.message
          };
        });
        // console.log(`errors: [${JSON.stringify(errors, undefined, 2)}]`);
        const convertErrorsArrayToObject = (errors: { field: string, message: string }[]) => {
          // https://stackoverflow.com/a/49247635
          var mapped = errors.map(item => ({ [item.field]: item.message }));
          return Object.assign({}, ...mapped);
        }
        return { products: [], errors };
      }
      // override filter data
      filtered = data.products.filter((e) => e.title.toLowerCase().includes(s.toLowerCase()));
    }
    return { products: filtered };
  }
  throw error(404, 'Not found');
};
