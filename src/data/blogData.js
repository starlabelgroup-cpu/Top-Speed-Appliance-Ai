export const blogPosts = [
  {
    id: 1,
    slug: 'refrigerator-maintenance-tips',
    title: 'Essential Refrigerator Maintenance Tips for Longevity',
    excerpt: 'Learn how to keep your refrigerator running efficiently with these simple maintenance tips that can save you money on repairs.',
    content: `Your refrigerator is one of the most important appliances in your home. To ensure it continues to operate efficiently and has a long lifespan, regular maintenance is essential.

## Keep the Condenser Coils Clean
One of the most common reasons refrigerators fail is dirty condenser coils. These coils are responsible for removing heat from the refrigerant. Over time, dust and debris accumulate on these coils, forcing your refrigerator to work harder and use more energy.

Clean the condenser coils at least twice a year by unplugging the refrigerator and vacuuming the coils located on the back or bottom of the unit.

## Check and Replace Door Seals
Worn door seals allow cold air to escape, making your refrigerator work overtime. If you notice your seal is cracked or isn't sealing properly, it's time to replace it.

Test your seal by closing the door on a dollar bill. If you can pull it out easily, the seal needs replacement.

## Keep the Interior Organized
Proper organization improves airflow inside your refrigerator. Avoid blocking vents and allow air to circulate freely around items.

## Don't Overstock
While it might be tempting to fill your refrigerator completely, overstocking can reduce cooling efficiency. Leave some space between items for proper air circulation.

## Professional Servicing
For complex issues or annual maintenance, consider professional servicing. Our team at Top Speed Appliance can help keep your refrigerator in peak condition.`,
    category: 'Refrigerator',
    date: '2024-01-15',
    author: 'Top Speed Appliance Team',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F5b2cddc584514ebd90bab47dfa9fab6c?format=webp&width=800',
  },
  {
    id: 2,
    slug: 'washing-machine-common-problems',
    title: 'Common Washing Machine Problems and Solutions',
    excerpt: 'Discover the most common washing machine issues and when to call a professional for repairs.',
    content: `Washing machines are essential appliances in every household, but they can develop problems over time. Here are some of the most common issues and how to address them.

## Water Not Draining
If your washing machine isn't draining properly, the issue could be a clogged drain hose, filter, or pump.

First, check the drain hose for kinks or blockages. If it's blocked, straighten it or remove the debris. If that doesn't solve the problem, you may need professional help to clean or replace the pump.

## Clothes Not Getting Clean
If your clothes aren't coming out clean, check the following:
- Is the washer overloaded? Reduce the load size for better cleaning.
- Are you using the right amount of detergent? Too much or too little can affect cleaning performance.
- Check if the inlet valves are clogged. These valves control water flow into the machine.

## Unusual Noises
Strange noises during the wash cycle can indicate various problems. Squeaking might mean the drum bearing is worn, while grinding could indicate a foreign object is stuck between the drum and tub.

## Leaking Water
Water leaks can come from several sources: faulty door seals, damaged hoses, or worn pump seals. Identifying the source is the first step in fixing the problem.

## When to Call a Professional
If DIY solutions don't work, it's time to call Top Speed Appliance. Our experienced technicians can diagnose and fix any washing machine problem quickly and efficiently.`,
    category: 'Washing Machine',
    date: '2024-01-10',
    author: 'Top Speed Appliance Team',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44?format=webp&width=800',
  },
  {
    id: 3,
    slug: 'dishwasher-efficiency-guide',
    title: 'How to Maximize Your Dishwasher Efficiency',
    excerpt: 'Get the best performance from your dishwasher with these efficiency tips and maintenance advice.',
    content: `Modern dishwashers are designed to be efficient and convenient, but there are ways to get even better performance. Here's our guide to maximizing your dishwasher's efficiency.

## Load Your Dishwasher Properly
The way you load your dishwasher can significantly affect cleaning performance. Place larger items on the bottom rack and smaller items on the top. Make sure water can reach all dishes and that nothing blocks the spray arms.

## Use the Right Detergent
Different water hardness levels require different detergent amounts. Too much detergent can leave residue, while too little won't clean effectively. Consider using dishwasher detergent specifically designed for your water hardness.

## Run Full Loads
A full load uses less water and energy per dish than several smaller loads. Try to wait until you have a full load before running your dishwasher.

## Clean the Filter
Your dishwasher has a filter that catches food particles. Clean it regularly to ensure proper drainage and prevent odors.

## Check Spray Arms
If dishes aren't clean, the spray arms might be clogged. Check the holes in the spray arms and clean them if necessary.

## Descale Regularly
Mineral buildup from hard water can reduce efficiency. Run a descaling cycle monthly or use a commercial dishwasher cleaner.

## Regular Maintenance
Professional maintenance can keep your dishwasher running smoothly. Contact Top Speed Appliance if you need help with maintenance or repairs.`,
    category: 'Dishwasher',
    date: '2024-01-05',
    author: 'Top Speed Appliance Team',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc072dd8c0d7c4399a48c16f755323d21?format=webp&width=800',
  },
];

export const getCategoryOptions = () => {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories).sort();
};

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPostId, limit = 3) => {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit);
};
