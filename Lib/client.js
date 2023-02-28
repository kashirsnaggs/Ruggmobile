import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '26uxqjd7',
  dataset: 'production',
  apiVersion: '2022-07-20',
  useCdn: false,
  token:
    'sk3aHJfemNxZBNvze1fEEnKfVdVrOxtlgOUYwnfKfN2eO6YqM8Yl7T8EZU4LqMJ2qL4xJdKo8GdF4yjKqm4trH4RfyPYBWvkh4FopBG05GjXcj3DtLA12Si5Romk2WwV5yi3TF8WRsOJc4b6Qw8CNwaNztIo50EF6XSj20nBaQGF4GW7x4kO'
});

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
