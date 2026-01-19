import React from 'react'

function Keywords() {
  const keywords = [
    {
      title: 'Refrigerator Repair Near Me',
      description: 'Looking for refrigerator repair near me? Top Speed Appliance provides fast, reliable refrigerator repair services for all brands. We handle cooling problems, compressor issues, leaks, and ice maker repairs.',
      services: ['Cooling issues', 'Compressor problems', 'Leak repairs', 'Ice maker repair', 'Temperature control issues'],
    },
    {
      title: 'Washer and Dryer Repair Near Me',
      description: 'Need washer and dryer repair near me? Our certified technicians offer same-day service for washing machine and dryer problems including drainage, spinning, heating, and electrical issues.',
      services: ['Drainage problems', 'Spinning issues', 'Heating element repair', 'Drum repairs', 'Electrical problems'],
    },
    {
      title: 'Oven and Stove Repair Near Me',
      description: 'Professional oven and stove repair near me with quick turnaround times. We repair gas and electric ovens, stovetops, burners, heating elements, and ignition systems for all major brands.',
      services: ['Heating element repair', 'Ignition system repair', 'Burner repair', 'Temperature control', 'Door lock repair'],
    },
    {
      title: 'Dishwasher Repair Near Me',
      description: 'Expert dishwasher repair near me from Top Speed Appliance. We fix cleaning issues, drainage problems, leaks, spray arm problems, and power issues on all dishwasher brands.',
      services: ['Cleaning issues', 'Drainage problems', 'Leak repair', 'Spray arm repair', 'Filter cleaning'],
    },
  ]

  const keywordCategories = [
    {
      title: 'General Appliance Repair',
      description: 'Broad, high-intent phrases people use before they name a specific appliance.',
      keywords: [
        'appliance repair',
        'appliance repair near me',
        'appliance repair service',
        'appliance repair companies near me',
        'home appliance repair',
        'local appliance repair',
        'certified appliance repair',
        'professional appliance repair',
        'appliance maintenance',
        'appliance repair cost',
        'appliance repair experts',
        'appliance repair shops near me',
      ],
    },
    {
      title: 'Emergency & Same-Day',
      description: 'Queries that signal urgent breakdowns and fast response expectations.',
      keywords: [
        '24 hour appliance repair',
        'emergency appliance repair',
        'emergency fridge repair',
        'emergency refrigerator repair',
        'same day appliance repair',
        'same day appliance repair near me',
        'repair fridge near me',
        'fix appliances near me',
        'washer and dryer maintenance',
        'washer dryer repair near me',
        'squeaky dryer fix',
        'broken dishwasher',
      ],
    },
    {
      title: 'Refrigerator & Freezer',
      description: 'Use these when promoting cooling repairs, seal work, or compressor replacements.',
      keywords: [
        'refrigerator repair',
        'refrigerator repair near me',
        'fridge repair near me',
        'emergency refrigerator repair',
        'fridge compressor replacement',
        'fridge freezer repairs',
        'refrigerator maintenance near me',
        'refrigerator seal repair',
        'wine cooler repair',
        'walk in freezer repair',
        'ice maker repair',
        'freezer repair near me',
      ],
    },
    {
      title: 'Washer & Dryer',
      description: 'Laundry-specific phrases that highlight bearings, belts, pumps, and service calls.',
      keywords: [
        'washer repair near me',
        'washing machine repair',
        'washing machine repair near me',
        'washer dryer repair',
        'washer dryer repair service near me',
        'washer repair service near me',
        'washing machine bearing replacement cost',
        'washing machine seal replacement',
        'dryer repair near me',
        'dryer belt replacement',
        'dryer repair service near me',
        'fix washing machine near me',
      ],
    },
    {
      title: 'Kitchen & Dishwasher',
      description: 'Target households focused on dishwashers, trash compactors, and kitchen suites.',
      keywords: [
        'dishwasher repair near me',
        'dishwasher repair service near me',
        'dishwasher appliance repair near me',
        'dishwasher pump replacement',
        'dishwasher rack repair',
        'kitchen appliance repair',
        'kitchen appliance repair near me',
        'fix dishwasher',
        'trash compactor repair',
        'stove repair near me',
        'range repair',
        'kitchen appliance repair service',
      ],
    },
    {
      title: 'Cooking, Oven & Range',
      description: 'Great for campaigns around ovens, cooktops, hoods, and microwave repairs.',
      keywords: [
        'oven repair near me',
        'oven repair service',
        'oven appliance repair',
        'oven control board replacement',
        'gas oven repair near me',
        'electric oven repair near me',
        'cooktop repair near me',
        'range hood repair service near me',
        'gas stove repair home service',
        'stove element replacement',
        'microwave oven repair near me',
        'microwave repair service near me',
      ],
    },
    {
      title: 'Commercial & Specialty',
      description: 'Focus on restaurants, property managers, and niche appliance service calls.',
      keywords: [
        'commercial appliance repair',
        'commercial appliance repair near me',
        'commercial refrigerator repair',
        'commercial dishwasher repair near me',
        'commercial oven repair',
        'commercial freezer repair near me',
        'commercial fryer repair',
        'ice machine repair near me',
        'dehumidifier repair near me',
        'water cooler repair',
        'water dispenser repair near me',
        'water dispenser tap replacement',
      ],
    },
    {
      title: 'Small Appliance & Tools',
      description: 'Capture searches for vacuums, coffee makers, and other countertop appliances.',
      keywords: [
        'coffee machine repair near me',
        'coffee machine repair service near me',
        'coffee maker repair near me',
        'blender repair near me',
        'dyson vacuum repair near me',
        'electrolux vacuum repair',
        'rainbow vacuum repair near me',
        'small appliance repair near me',
        'small kitchen appliance repair near me',
        'vacuum cleaner repair near me',
        'vacuum cleaner repair shops near me',
        'toaster repair near me',
      ],
    },
  ]

  const brandKeywordGroups = [
    {
      brand: 'Amana',
      keywords: ['amana appliance repair', 'amana refrigerator repair', 'amana washer repair', 'amana dryer belt replacement'],
    },
    {
      brand: 'Bosch',
      keywords: ['bosch appliance repair', 'bosch dishwasher repair near me', 'bosch oven repair', 'bosch washing machine repair', 'bosch repair service near me'],
    },
    {
      brand: 'Frigidaire',
      keywords: ['frigidaire appliance repair', 'frigidaire refrigerator repair', 'frigidaire dishwasher repair', 'frigidaire oven control board replacement', 'frigidaire repair service near me'],
    },
    {
      brand: 'GE',
      keywords: ['ge appliance repair near me', 'ge dishwasher repair', 'ge microwave repair near me', 'ge oven control board replacement', 'ge washer repair'],
    },
    {
      brand: 'KitchenAid',
      keywords: ['kitchenaid appliance repair', 'kitchenaid refrigerator repair', 'kitchenaid dishwasher repair near me', 'kitchenaid mixer repair', 'authorized kitchenaid mixer repair near me'],
    },
    {
      brand: 'LG',
      keywords: ['lg appliance repair', 'lg appliance repair near me', 'lg refrigerator repair', 'lg washer repair near me', 'lg dryer repair near me'],
    },
    {
      brand: 'Maytag',
      keywords: ['maytag appliance repair near me', 'maytag refrigerator repair near me', 'maytag washer repair service near me', 'maytag dryer repair near me', 'maytag repairman near me'],
    },
    {
      brand: 'Samsung',
      keywords: ['samsung appliance repair', 'samsung refrigerator repair near me', 'samsung washer repair near me', 'samsung dryer belt replacement', 'samsung dishwasher repair'],
    },
    {
      brand: 'Sub-Zero',
      keywords: ['sub zero appliance repair', 'sub zero refrigerator repair near me', 'sub zero repair near me', 'subzero repair'],
    },
    {
      brand: 'Viking',
      keywords: ['viking appliance repair', 'viking oven repair near me', 'viking refrigerator repair', 'viking stove repair near me'],
    },
    {
      brand: 'Whirlpool',
      keywords: ['whirlpool appliance repair', 'whirlpool refrigerator repair near me', 'whirlpool dryer repair near me', 'whirlpool washer repair near me', 'whirlpool authorized repair'],
    },
    {
      brand: 'Kenmore + Sears',
      keywords: ['kenmore appliance repair near me', 'kenmore refrigerator repair', 'kenmore washer repair service near me', 'sears appliance repair near me', 'sears repair appointment'],
    },
    {
      brand: 'Miele',
      keywords: ['miele appliance repair', 'miele dishwasher repair', 'miele washing machine repairs', 'miele vacuum repair near me'],
    },
    {
      brand: 'Fisher & Paykel',
      keywords: ['fisher and paykel repairs', 'fisher and paykel dishwasher repair', 'fisher and paykel washing machine repairs'],
    },
    {
      brand: 'Wolf',
      keywords: ['wolf appliance repair', 'wolf appliance repair near me', 'wolf oven repair'],
    },
    {
      brand: 'JennAir',
      keywords: ['jenn air appliance repair', 'jenn air repair near me'],
    },
    {
      brand: 'Hisense',
      keywords: ['hisense fridge repairs'],
    },
  ]

  return (
    <section id="keywords" className="keywords">
      <h2>Appliance Repair Services Near Me</h2>
      <p className="keywords-intro">
        Top Speed Appliance is your trusted local appliance repair company. We provide professional repair services for all major appliance brands in South Florida.
      </p>

      <div className="keywords-grid">
        {keywords.map((item, i) => (
          <div key={i} className="keyword-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="services-list">
              <h4>What We Fix:</h4>
              <ul>
                {item.services.map((service, j) => (
                  <li key={j}>{service}</li>
                ))}
              </ul>
            </div>
            <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="service-cta">Book Repair</a>
          </div>
        ))}
      </div>

      <div className="keyword-library">
        <div className="keyword-library-header">
          <h3>High-Intent Keyword Library</h3>
          <p>
            Organized search terms you can drop directly into SEO pages, service area landing pages, or paid search ad groups.
            Use the categories to match intent, then layer in the matching brand combinations below.
          </p>
        </div>

        <div className="keyword-category-grid">
          {keywordCategories.map((category) => (
            <div key={category.title} className="keyword-category-card">
              <div className="keyword-category-heading">
                <h4>{category.title}</h4>
                <p>{category.description}</p>
              </div>
              <ul className="keyword-chip-list">
                {category.keywords.map((keyword) => (
                  <li key={keyword}>
                    <span className="keyword-chip">{keyword}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="brand-keywords">
          <h4>Brand + Service Combos</h4>
          <p>
            Target homeowners searching for authorized or local help by pairing each manufacturer with the repairs they need most.
            These make excellent ad group themes, FAQ anchors, or structured list content.
          </p>
          <div className="brand-keywords-grid">
            {brandKeywordGroups.map((group) => (
              <div key={group.brand} className="brand-card">
                <div className="brand-card-header">
                  <span className="brand-pill">{group.brand}</span>
                </div>
                <ul>
                  {group.keywords.map((keyword) => (
                    <li key={keyword}>{keyword}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="keywords-faq">
        <h3>Why Choose Top Speed Appliance?</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>⚡ Fast Service</h4>
            <p>Same-day service available for most appliance repairs in South Florida</p>
          </div>
          <div className="faq-item">
            <h4>✓ Certified Technicians</h4>
            <p>All our technicians are certified and trained on all major appliance brands</p>
          </div>
          <div className="faq-item">
            <h4>💰 Affordable Pricing</h4>
            <p>Transparent pricing with no hidden fees or surprise charges</p>
          </div>
          <div className="faq-item">
            <h4>🔧 Quality Repairs</h4>
            <p>We use genuine parts and offer warranty on all our repairs</p>
          </div>
          <div className="faq-item">
            <h4>📞 Easy Booking</h4>
            <p>Book online or call us for fast scheduling and service confirmation</p>
          </div>
          <div className="faq-item">
            <h4>🌍 Local Service</h4>
            <p>We proudly serve South Florida with dependable, professional service</p>
          </div>
        </div>
      </div>

      <div className="keywords-cta">
        <h3>Need Appliance Repair Today?</h3>
        <p>Contact Top Speed Appliance for fast, reliable repair service in South Florida</p>
        <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="cta-button">Request Service Now</a>
        <a href="tel:9549317997" className="cta-button keywords-call-cta">
          Call (954) 931-7997
        </a>
      </div>
    </section>
  )
}

export default Keywords
