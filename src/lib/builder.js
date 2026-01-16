import { builder } from '@builder.io/react';

// Initialize Builder.io with your API key
const apiKey = import.meta.env.VITE_BUILDER_API_KEY;

if (apiKey) {
  builder.init(apiKey);
}

// Register custom components if needed
// builder.registerComponent(YourComponent, {
//   name: 'Custom Component Name',
//   inputs: [
//     { name: 'title', type: 'string' },
//   ]
// });
