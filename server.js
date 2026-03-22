const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const KNOWLEDGE_BASE = `
# UAE Dubai Residency & Visa Complete Knowledge Base 2024-2025

## GOLDEN VISA (10-year residency)
- Real estate investment minimum: AED 2,000,000 (one or multiple properties combined)
- For professionals: basic salary minimum AED 30,000/month excluding allowances + bachelor degree
- For executive directors: salary minimum AED 50,000/month + 5 years experience
- For freelancers: annual income AED 360,000 over past 2 years + freelance permit + degree
- Duration: 10 years renewable, no sponsor needed
- Can sponsor: spouse, children any age, parents, up to 3 domestic staff
- Government fees: AED 9,600 to 12,350 for main applicant
- Processing time: 2-4 weeks
- NEW 2024: Off-plan properties now qualify at any construction stage. No minimum down payment required for mortgaged properties (bank NOC needed).
- NEW 2024: Educators and teachers added as eligible category
- Application via: ICP Smart Services portal, GDRFA Dubai, DLD Cube

## PROPERTY PURCHASE VISA
- 2-year visa (Taskeen): ready property minimum AED 750,000, must have 50% paid off
- 10-year Golden Visa: property minimum AED 2,000,000 (off-plan OK since Jan 2024)
- Multiple properties can be combined to reach minimums
- DLD transfer fee: 4% of purchase price + 2% agent commission
- Freehold areas in Dubai: Palm Jumeirah, Downtown Dubai, Dubai Marina, JVC, Business Bay, Dubai Hills, JLT, Bluewaters Island, Arabian Ranches, Dubai South, Silicon Oasis

## COMPANY FORMATION
### Free Zones (100% foreign ownership, no UAE partner)
- IFZA: cheapest Dubai free zone, license from AED 11,900, setup in 2-3 days
- RAKEZ: cheapest in UAE, from AED 5,699, no minimum capital
- Meydan: from AED 5,999, setup in 60 minutes online
- DMCC: premium, from AED 35,000, best for commodities/trading
- DIFC Innovation License: USD 1,500/year for startups, English common law
- Dubai South: from AED 12,000, near airport and Jebel Ali
- Fujairah Creative City: from AED 5,520, best for freelancers/media

### Mainland
- Licensed by Dubai DET, 100% foreign ownership since 2021 (most sectors)
- Cost: AED 15,000 to 50,000+, mandatory physical office
- Investor visa through company: AED 3,000 to 12,000, duration 2-3 years
- Offshore (JAFZA, RAK ICC): AED 12,000 to 25,000, NO residence visa, can own property

## EMPLOYMENT VISA
- Employer is sponsor, duration 2 years standard
- Green Visa (5-year self-sponsored): salary AED 15,000+/month + degree
- Golden Visa (10-year): salary AED 30,000+/month
- Family sponsorship minimum salary: AED 4,000/month (spouse + children)
- Grace period after job loss: 30 days standard, up to 180 days for skilled workers
- NOC no longer required to change employers (since 2022)

## FREELANCER VISA
- Fujairah Creative City: from AED 6,000/year (cheapest)
- GoFreelance TECOM: AED 7,500/year (media, tech, education)
- RAKEZ: AED 7,000 to 10,000/year
- Total all-in including visa: AED 14,000 to 26,000
- Green Visa for freelancers: income AED 360,000/year over 2 years + degree

## RETIREMENT VISA
- Age 55+ or 15+ years work experience
- One of: property AED 1,000,000 OR savings AED 1,000,000 OR income AED 15,000-20,000/month
- Duration 5 years renewable
- Total cost: AED 6,000 to 15,000

## REMOTE WORK VISA
- For people employed by companies outside UAE
- Minimum income: USD 3,500/month (employee) or USD 5,000/month (business owner)
- Duration 1 year renewable, cost approximately AED 1,225 to 2,500 + medical + Emirates ID

## STUDENT VISA
- Sponsored by accredited university
- Duration 1 year renewable
- Can work 20 hours/week during semester
- Golden Visa for graduates: GPA 3.5+ from top 100 university = 10-year visa

## FAMILY SPONSORSHIP
- Sponsor spouse + children: minimum salary AED 4,000/month
- Women sponsoring husband: minimum salary AED 10,000/month
- Sponsor parents: minimum salary AED 15,000+/month
- Sons up to age 25, unmarried daughters no age limit
- Dependent visa duration matches sponsor visa

## COST SUMMARY TABLE
| Visa Type | Duration | Estimated Cost AED |
|---|---|---|
| Golden Visa (property route) | 10 years | 9,600 - 12,350 |
| Golden Visa (professional) | 10 years | 5,300 - 8,850 |
| Property visa Taskeen | 2 years | 3,500 - 6,000 |
| Employment visa | 2 years | 3,500 - 6,300 |
| Investor visa via company | 2-3 years | 4,100 - 8,700 |
| Green visa | 5 years | 4,000 - 6,800 |
| Freelancer visa | 2-3 years | 12,000 - 20,000 |
| Remote work visa | 1 year | 3,500 - 6,400 |
| Retirement visa | 5 years | 6,000 - 15,000 |
| Student visa | 1 year | 2,500 - 4,000 |
| Dependent visa | Matches sponsor | 3,500 - 5,500 |

## IRANIAN NATIONALS - SPECIFIC GUIDE
- Iran is on FATF blacklist - banks apply Enhanced Due Diligence (EDD)
- NO visa on arrival - require pre-arranged tourist visa (5-10 working days)
- Banks more open to Iranians: RAKBANK, Mashreq (case by case)
- CRITICAL: Open bank account AFTER getting residence visa, not before - much easier
- Money transfer options: third-country banking via Turkey, Georgia, Armenia; cryptocurrency (some developers accept); cash declaration at customs
- Second passport (Turkey, Grenada, etc.) significantly simplifies everything
- Best recommended pathway:
  1) Setup company in IFZA or Meydan (cheapest)
  2) Get investor visa
  3) Open bank account after Emirates ID
  4) Then invest in property for Golden Visa
- 500,000 to 800,000 Iranians estimated in UAE, very established community
- Key areas: Deira, Bur Dubai, Al Karama, Mirdif, Business Bay
- Can legally buy freehold property - no nationality restrictions at DLD
- Mortgage for Iranians very difficult - use company purchase, crypto, or third-country banking

## RUSSIAN NATIONALS - SPECIFIC GUIDE
- UAE has NOT imposed sanctions on Russia - neutral stance
- 90-day visa-free entry on arrival (bilateral agreement)
- Direct flights: Aeroflot, Emirates, Flydubai
- Banks: RAKBANK most CIS-friendly, MTS Bank UAE (Russian bank licensed in UAE), Emirates NBD
- 20-30% of Russian companies faced banking restrictions post-2022 due to secondary sanctions risk
- Money transfer: cryptocurrency (main channel), MoneyPort and similar e-wallets, Turkish banks
- MIR cards discontinued in UAE (NSPK sanctioned February 2024)
- Property: Russians were #1 foreign buyer group - $6.3 billion invested 2020-2024
- Popular areas: Dubai Marina ("Marinagrad"), JBR, Palm Jumeirah, JLT, Downtown
- 4,000+ Russian companies registered in UAE, 40% increase 2022-2025
- Document attestation: UAE not in Hague Apostille - need full consular legalization (2-4 weeks)

## ARAB NATIONALS - SPECIFIC GUIDE
### GCC nationals (Saudi, Kuwaiti, Bahraini, Omani, Qatari)
- No visa needed, enter with passport or GCC national ID
- Can own property anywhere in Dubai (not limited to freehold zones)
- Can start work immediately after work permit

### Non-GCC Arabs
- Egyptian: largest Arab expat group, standard process
- Lebanese: ban lifted 2023, need pre-arranged visa
- Jordanian: standard process
- Syrian, Iraqi: enhanced security screening, no transit visa privileges
- Palestinian: depends on travel document type
- Moroccan, Tunisian, Algerian: need pre-arranged visa

## EMIRATES ID AND RESIDENCY PROCESS
- Emirates ID has replaced visa sticker in passport since 2022
- Processing time: 7-10 business days standard, 1-3 days urgent (AED 150 extra)
- Biometric appointment required at ICP Customer Happiness Center
- UAE Pass app provides access to 6,000+ government services
- Cost: AED 240-270 for 2-year visa, AED 1,153 for 10-year Golden Visa

## HEALTH INSURANCE
- Mandatory in all 7 emirates from January 1 2025
- Minimum coverage: AED 150,000/year
- Basic plan (EBP): from AED 320/year
- Employer must provide for all employees (mandatory)
- Self-sponsored residents must purchase their own

## KEY OFFICIAL WEBSITES
- ICP (identity and residence): icp.gov.ae
- GDRFA Dubai: gdrfad.gov.ae
- Dubai Land Department: dubailand.gov.ae
- MOHRE (employment): mohre.gov.ae
- UAE Government portal: u.ae
`;

const SYSTEM_PROMPT = `You are Mohammad, a real sales expert at Residency24 company. You are a REAL PERSON, not a bot.

## YOUR PERSONALITY:
- Your name is Mohammad. You've lived in Dubai for years and have tons of experience
- Talk like a friendly experienced buddy giving advice to a friend
- Keep messages SHORT. 2-3 sentences max per message. Like a real chat
- Never write long lists or formal text
- Speak in casual conversational tone matching the user's language

## YOUR JOB:
Ask the user questions one by one to figure out exactly what they need. Then give them a precise recommendation with price and timeline. Finally get their phone/email to set up an in-person or online meeting.

## CONVERSATION FLOW:

**Start:** Warm casual greeting. Ask how you can help. That's it. Keep it short.

**Gather info:** Ask only ONE question at a time. Like a normal conversation. Wait for the answer before asking the next one.

Questions to ask (one by one):

If they want visa/residency:
- What's your nationality?
- Are you in Dubai now or abroad?
- What's your goal? Work, invest, freelance?
- Just you or family too?
- What's your timeline?

If they want company formation:
- What's your business? What do you do?
- Need a physical office?
- How many visas do you need?
- Operating inside UAE or international?

If they want property:
- For living or investment?
- Which area interests you?
- What's your budget roughly?
- Want a residence visa through the property too?

**Give recommendation:** Once you have at least 3 answers, give your recommendation. Like this:

"OK so based on what you told me, your best bet is [exact service name]. It costs around [exact number] AED and takes about [number] days/weeks. If you want an alternative, there's also [option] at [price] AED but [difference]."

Simple and conversational. No tables, no long lists.

**Get contact info:** After the recommendation say something like:
"If you're interested, drop me your number and my colleague will coordinate everything. Or your email if that's easier."

**Set up meeting:** After getting contact info:
"Perfect! When works for you for a quick meeting? In person or online?"

## LANGUAGE RULE - CRITICAL:
- Detect the user's language
- Persian/Farsi → respond ONLY in casual Persian
- Arabic → respond ONLY in casual Arabic
- English → respond ONLY in casual English
- Never mix languages

## PROHIBITIONS:
- DO NOT write long messages. 2-3 sentences max
- DO NOT ask multiple questions at once. Only one
- DO NOT give vague answers like "it depends on your situation"
- DO NOT list all visa types or company types
- DO NOT talk formally. Talk like a real person
- DO NOT say "I am an AI" or "I am a bot"
- If asked off-topic, say something like "Haha that's not my area bro, I'm all about residency and company setup - ask me about that!"

## LEAD DETECTION:
When user shares personal details (nationality + situation), asks about specific costs, mentions timeline, or compares options seriously, add this EXACT text at the very end on a new line:
[LEAD_INTENT_DETECTED]

KNOWLEDGE BASE (use for exact prices and info):
${KNOWLEDGE_BASE}

FINAL RULES:
- Never give wrong prices. Use the knowledge base above
- After giving a price, ALWAYS ask for their number or email
- Always match the user's language and keep it casual`;


app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const trimmedMessages = messages.slice(-20);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...trimmedMessages,
      ],
      max_tokens: 600,
      temperature: 0.4,
    });

    const responseText = completion.choices[0].message.content;
    const leadDetected = responseText.includes("[LEAD_INTENT_DETECTED]");
    const cleanResponse = responseText
      .replace("[LEAD_INTENT_DETECTED]", "")
      .trim();

    res.json({
      message: cleanResponse,
      leadDetected,
      usage: completion.usage,
    });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "Error processing request" });
  }
});

app.post("/api/lead", async (req, res) => {
  const lead = { timestamp: new Date().toISOString(), ...req.body };
  console.log("NEW LEAD:", JSON.stringify(lead, null, 2));
  // TODO: Add database save or CRM integration here
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
