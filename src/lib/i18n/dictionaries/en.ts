/**
 * English dictionary — canonical structure.
 * Every other locale dictionary must mirror these keys exactly.
 * (Admin panel strings are intentionally NOT included here — the
 * admin panel always renders in English regardless of site locale.)
 */
const en = {
  common: {
    loading: "Loading",
    loadingPage: "Loading page",
    loadingEllipsis: "Loading...",
    viewDetails: "View Details",
    requestQuote: "Request Quote",
    learnMore: "Learn more",
    viewProducts: "View Products",
    viewCatalog: "View Catalog",
    yes: "Yes",
    no: "No",
    somethingWentWrong: "Something went wrong",
    somethingWentWrongDesc:
      "An unexpected error occurred. Please try reloading the component or contact support if the problem persists.",
    tryAgain: "Try Again",
    home: "Home",
  },

  nav: {
    home: "Home",
    about: "About Us",
    machinery: "Machinery & Equipment",
    services: "Services",
    contact: "Contact",
    miningEquipment: "Mining Equipment",
    agriculturalMachinery: "Agricultural Machinery",
    industrialMachinery: "Industrial Machinery",
    maintenanceRepairs: "Maintenance & Repairs",
    installationCommissioning: "Installation & Commissioning",
    equipmentProcurement: "Equipment Procurement",
    login: "Login",
    myWatchlist: "My Watchlist",
    adminPanel: "Admin Panel",
    signOut: "Sign Out",
    toggleMenu: "Toggle menu",
    userMenu: "User menu",
  },

  footer: {
    tagline:
      "Empowering Ethiopia's mining and agricultural sectors by supplying tailored, high-performance machinery, reliable local engineering, and exceptional after-sales support.",
    machineryHeading: "Machinery",
    servicesHeading: "Services",
    companyHeading: "Company",
    goldWashingSystems: "Gold Washing Systems",
    industrialCrushers: "Industrial Crushers",
    ballMills: "Ball Mills",
    tractorsTillage: "Tractors & Tillage",
    maintenanceRepairs: "Maintenance & Repairs",
    installation: "Installation",
    procurementSales: "Procurement & Sales",
    aboutUs: "About Us",
    contact: "Contact",
    requestQuote: "Request a Quote",
    faq: "FAQ",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    cookiePolicy: "Cookie Policy",
    sitemap: "Sitemap",
    allRightsReserved: "All rights reserved.",
  },

  home: {
    heroTitlePrefix: "Powering",
    heroTitleMid: "Ethiopia's",
    heroTitleSuffix: "Core Industries",
    exploreMachinery: "Explore Machinery",
    requestQuote: "Request a Quote",
    statYearsExp: "Years Exp.",
    statMachineModels: "Machine Models",
    statNationwide: "Nationwide",
    provenTitle: "Built on Real Operations",
    provenSubtitle:
      "From the field to the factory floor — equipment doing the actual work.",
    facilityTag: "Facility",
    fieldTag: "Field",
    plantTag: "Plant",
    processingFabrication: "Processing & Fabrication",
    agriculturalDeployment: "Agricultural Deployment",
    mineralProcessing: "Mineral Processing",
    solutionsTitle: "Industrial Solutions",
    solutionsSubtitle:
      "Comprehensive heavy machinery engineered for peak performance in mining, agriculture, and specialized industrial sectors.",
    categoryMining: "Mining",
    categoryAgriculture: "Agriculture",
    categoryIndustrial: "Industrial",
    categoryMiningTitle: "Mining Equipment",
    categoryAgricultureTitle: "Agricultural Machinery",
    categoryIndustrialTitle: "Industrial Machinery",
    whyPartner: "Why Partner With Us?",
    learnOurStory: "Learn Our Story",
    supportTitle: "Comprehensive Support",
    supportSubtitle:
      "Beyond machinery sales, we provide end-to-end technical support to ensure your operations never stop.",
    ctaTitle: "Ready to Upgrade Your Operations?",
    ctaSubtitle:
      "Get in touch with our engineering team for detailed specifications, custom solutions, and immediate quotes.",
    contactSupport: "Contact Support",
  },

  about: {
    heroTitlePrefix: "Empowering Ethiopian",
    heroTitleSuffix: "Industry",
    heroSubtitle:
      "Established in {year}, {legalName} has grown into a trusted partner for mining and agricultural enterprises across East Africa.",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    operationalExcellence: "Operational Excellence",
    coreValuesTitle: "Our Core Values",
    coreValuesSubtitle:
      "We operate on the principles of reliability, domestic empowerment, and engineering excellence.",
    assemblyEyebrow: "Local Assembly & Infrastructure",
    assemblyTitle: "Rapid Deployment & Spare Support",
    assemblyBody:
      "At our Sheger City headquarters, we maintain extensive inventory and assembly capabilities. This allows us to rapidly deploy machinery and provide immediate spare parts support to operations anywhere in the country.",
    assemblyHubTag: "Sheger City Assembly Hub",
    assemblyHubTitle: "Domestic Technical Operations",
    assemblyFeatures: [
      "On-site mechanical engineering team",
      "Extensive spare parts warehouse",
      "Direct factory partnerships in China",
      "Nationwide logistics capabilities",
    ],
    visitOffice: "Visit Our Office",
  },

  products: {
    heroTitlePrefix: "Machinery &",
    heroTitleSuffix: "Equipment",
    heroSubtitle:
      "Select a category below to explore our engineered heavy machinery and industrial solutions.",
    noCategoriesTitle: "No Categories Available",
    noCategoriesDesc:
      "Products and machinery categories will appear here once published in the administrative dashboard.",
    defaultCategoryDesc: "Explore engineered heavy machinery in this category.",
    noProductsTitle: "No Machinery Listed",
    noProductsDesc:
      "There are currently no products listed in this category. Check back later for catalog updates.",
    defaultProductsDesc:
      "Explore our range of engineered heavy machinery and industrial equipment.",
    featured: "Featured",
    specsNotAvailable: "Specifications not available for this model.",
    technicalSpecifications: "Technical Specifications",
    requestAQuote: "Request a Quote",
    contactSales: "Contact Sales",
    genuineWarranty: "Genuine Warranty",
    fastDeployment: "Fast Deployment",
    model: "MODEL",
    view3dModel: "View 3D model",
    modelNotAvailable: "3D model not available",
    viewImage: "View image {index} of {total}",
    savedToWatchlist: "Saved to Watchlist",
    saveToWatchlist: "Save to Watchlist",
    interactive3dViewer: "Interactive 3D Viewer",
    loadingPreview: "Loading 3D preview…",
    interactive3dPreview: "Interactive 3D Preview",
    dragToRotate: "Drag to rotate · Scroll to zoom",
    initializing3dCanvas: "Initializing 3D Canvas...",
  },

  services: {
    heroTitlePrefix: "Comprehensive",
    heroTitleSuffix: "Support & Services",
    heroSubtitle:
      "Beyond machinery sales, {name} provides end-to-end technical support to ensure your site operations never stop.",
    listFeatures: [
      "Nationwide availability",
      "Certified engineering team",
      "Rapid response times",
    ],
    viewServiceDetails: "View Service Details",
    ctaTitle: "Need immediate technical assistance?",
    ctaSubtitle:
      "Our engineering teams are on standby for emergency repairs, equipment maintenance, and on-site installations across Ethiopia.",
    contactSupportDesk: "Contact Support Desk",
    serviceDetails: "Service Details",
    detailIntro:
      "At {name}, we understand that industrial machinery is only as valuable as its reliability. Our {service} services are designed to maximize your uptime, protect your investment, and ensure seamless operations across your facilities.",
    keyBenefits: "Key Benefits",
    benefits: [
      "Expert engineering team with deep product knowledge",
      "Fast response times for critical failures",
      "Preventative maintenance scheduling",
      "Direct access to genuine OEM spare parts",
      "Comprehensive on-site training for operators",
      "Long-term support partnerships",
    ],
    needThisService: "Need this service?",
    sidebarBody:
      "Our support team is available across Ethiopia to assist with your machinery needs. Contact us directly to schedule a consultation.",
    contactSupport: "Contact Support",
    callUsDirectly: "Call us directly",
    items: {
      "equipment-procurement-sales": {
        name: "Equipment Procurement & Sales",
        description:
          "End-to-end sourcing, distribution, and direct sales of heavy-duty mining and agricultural machinery tailored for Ethiopian operations.",
      },
      "technical-maintenance-repairs": {
        name: "Technical Maintenance & Repairs",
        description:
          "On-site commissioning and preventive maintenance for heavy-duty mining equipment with readily available spare parts inventory.",
      },
      "installation-commissioning": {
        name: "On-Site Installation & Commissioning",
        description:
          "Professional installation and commissioning services ensuring your machinery operates at peak performance from day one.",
      },
    },
  },

  uspPoints: [
    {
      title: "Import Substitution & Local Production",
      description:
        "Prioritizing and scaling domestic manufacturing to reduce import dependency and support the local economy.",
    },
    {
      title: "Solution-Driven Engineering",
      description:
        "Machinery tailored to solve the specific operational challenges faced by Ethiopian miners and farmers.",
    },
    {
      title: "Comprehensive After-Sales Support",
      description:
        "Competitive pricing, premium build quality, extended warranties, and readily available spare parts.",
    },
    {
      title: "Customer-Centric Philosophy",
      description:
        "Long-term partnerships built on deep technical analysis and market accessibility wherever clients operate.",
    },
  ],

  contact: {
    heroTitleContact: "Contact ",
    heroTitleRequest: "Request a ",
    heroTitleQuote: "Quote",
    heroTitleTeam: "Our Team",
    heroSubtitle:
      "Our engineering and sales teams are ready to assist with your operational requirements, machinery specs, and procurement queries.",
    headquarters: "Headquarters",
    address: "Address",
    directLines: "Direct Lines",
    whatsapp: "Whatsapp",
    email: "Email",
    businessHours: "Business Hours",
    monFri: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    hoursWeekday: "8:00 AM - 5:00 PM",
    hoursSaturday: "9:00 AM - 1:00 PM",
    technicalRequirements: "Technical Requirements",
    sendAMessage: "Send a Message",
    findUs: "Find Us",
    findUsSubtitle: "Visit our Sheger City HQ & Assembly Facility.",
  },

  forms: {
    sendAMessage: "Send a Message",
    requestAQuote: "Request a Quote",
    fullName: "Full Name",
    fullNamePlaceholder: "Your name",
    company: "Company",
    companyPlaceholder: "Company name (optional)",
    email: "Email",
    emailPlaceholder: "you@company.com",
    phone: "Phone",
    phoneWhatsapp: "Phone / WhatsApp",
    phonePlaceholder: "0911674126",
    subject: "Subject",
    subjectPlaceholder: "How can we help?",
    message: "Message",
    messagePlaceholder: "Tell us about your inquiry…",
    additionalDetails: "Additional Details",
    additionalDetailsPlaceholder:
      "Capacity requirements, delivery location, timeline…",
    whatsappLabel: "WhatsApp",
    whatsappPlaceholder: "Optional WhatsApp number",
    whatsappHint: "We often respond faster via WhatsApp",
    machineryOfInterest: "Machinery of Interest",
    machineryOfInterestPlaceholder: "e.g. GCM-01 Industrial Crusher",
    privacyNote:
      "Your information is kept secure and never shared with third parties.",
    sendMessage: "Send Message",
    submitAnotherMessage: "Send another message",
    submitAnotherRequest: "Submit another request",
    messageSentTitle: "Message sent successfully",
    messageSentDesc: "Our team will respond within one business day.",
    quoteReceivedTitle: "Quote request received",
    quoteReceivedDesc:
      "Our sales team will contact you shortly to discuss availability and pricing.",
    contactErrorGeneric:
      "We couldn't send your message. Please try again or call us directly.",
    quoteErrorGeneric:
      "We couldn't submit your quote request. Please try again or call us directly.",
  },

  validation: {
    nameMin: "Name must be at least 2 characters",
    nameMax: "Name must be under 100 characters",
    emailInvalid: "Please enter a valid email address",
    phoneMin: "Please enter a valid phone number",
    phoneMax: "Phone number is too long",
  },

  breadcrumbs: {
    home: "Home",
  },

  faq: {
    heroTitlePrefix: "Frequently Asked",
    heroTitleSuffix: "Questions",
    heroSubtitle:
      "Find answers to common questions about our machinery line, support services, and procurement processes.",
    items: [
      {
        question: "Do you provide on-site installation for the machinery?",
        answer:
          "Yes. {name} provides comprehensive on-site installation and commissioning services across Ethiopia. Our certified engineering team will ensure your equipment is set up correctly and running at peak performance from day one.",
      },
      {
        question: "What is your warranty policy?",
        answer:
          "We offer extended warranties on all our industrial and agricultural machinery. The specific warranty period depends on the equipment model and category. Please contact our sales team for exact warranty details on specific machinery.",
      },
      {
        question: "Do you supply spare parts?",
        answer:
          "Absolutely. A core part of our mission is reducing downtime for our clients. We maintain an extensive inventory of genuine spare parts at our Sheger City headquarters, ready for immediate dispatch nationwide.",
      },
      {
        question: "Can I request a customized machinery solution?",
        answer:
          "Yes, we specialize in solution-driven engineering. If your operation has specific requirements, our engineering team can work with our manufacturing partners to source or assemble custom equipment tailored to your needs.",
      },
      {
        question: "How do I request a quote?",
        answer:
          "You can request a quote by clicking the 'Request a Quote' button in the navigation menu, filling out the form on our Contact page, or directly calling our sales desk. Please provide as much detail as possible about your intended operations so we can offer the most accurate pricing.",
      },
    ],
    haveMoreQuestions: "Have more questions?",
    cantFindAnswer:
      "Can't find the answer you're looking for? Reach out directly to our engineering desk.",
    contactOurTeam: "Contact Our Team",
  },

  legal: {
    lastUpdated: "Last updated: July 2026",
    terms: {
      titlePrefix: "Terms &",
      titleSuffix: "Conditions",
      intro:
        "Welcome to {name}. These terms and conditions outline the rules and regulations for the use of {legalName}'s Website, located at efrabusinessgroup.com.",
      introNote:
        "By accessing this website we assume you accept these terms and conditions. Do not continue to use {name} if you do not agree to take all of the terms and conditions stated on this page.",
      sections: [
        {
          heading: "1. Intellectual Property Rights",
          body:
            "Unless otherwise stated, {legalName} and/or its licensors own the intellectual property rights for all material on {name}. All intellectual property rights are reserved. You may access this from {name} for your own personal use subjected to restrictions set in these terms and conditions.",
          listIntro: "You must not:",
          list: [
            "Republish material from {name}",
            "Sell, rent or sub-license material from {name}",
            "Reproduce, duplicate or copy material from {name}",
            "Redistribute content from {name}",
          ],
        },
        {
          heading: "2. Machinery Information and Quotes",
          body:
            "All product specifications, capacity dimensions, and operational capabilities provided on this website are for informational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability with respect to the website or the information, products, or services.",
          bodyExtra:
            "Quotes requested through this website do not constitute a binding contract until formal sales agreements are signed by authorized representatives of {legalName} and the client.",
        },
        {
          heading: "3. User Comments and Forms",
          body:
            "When submitting information via our Quote Request (RFQ) forms, Contact forms, or other interactive elements, you warrant that the information provided is accurate and that you are authorized to represent the company you claim to represent.",
        },
        {
          heading: "4. Links to Other Websites",
          body:
            "Our website may contain links to third-party web sites or services that are not owned or controlled by {legalName}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.",
        },
        {
          heading: "5. Governing Law",
          body:
            "These Terms shall be governed and construed in accordance with the laws of Ethiopia, without regard to its conflict of law provisions.",
        },
      ],
    },
    privacy: {
      titlePrefix: "Privacy",
      titleSuffix: "Policy",
      intro:
        "At {legalName} (\"we\", \"our\", or \"us\"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights.",
      sections: [
        {
          heading: "1. Important Information and Who We Are",
          body:
            "{legalName} is the controller and responsible for your personal data. We are registered in Ethiopia and our head office is located at {headOffice}.",
        },
        {
          heading: "2. The Data We Collect About You",
          body:
            "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
          list: [
            "Identity Data — includes first name, last name, username or similar identifier, title.",
            "Contact Data — includes email address and telephone/WhatsApp numbers.",
            "Technical Data — includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.",
            "Usage Data — includes information about how you use our website, products and services.",
          ],
        },
        {
          heading: "3. How Is Your Personal Data Collected?",
          body: "We use different methods to collect data from and about you including through:",
          list: [
            "Direct interactions — You may give us your Identity and Contact by filling in forms or by corresponding with us by post, phone, email or otherwise.",
            "Automated technologies or interactions — As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and patterns.",
          ],
        },
        {
          heading: "4. How We Use Your Personal Data",
          body:
            "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
          list: [
            "Where we need to perform the contract we are about to enter into or have entered into with you (such as processing a quote request).",
            "Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.",
            "Where we need to comply with a legal obligation.",
          ],
        },
        {
          heading: "5. Data Security",
          body:
            "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.",
        },
        {
          heading: "6. Contact Us",
          body:
            "If you have any questions about this privacy policy or our privacy practices, please contact us at {email}.",
        },
      ],
    },
    cookies: {
      titlePrefix: "Cookie",
      titleSuffix: "Policy",
      intro:
        "This Cookie Policy explains how {name} (\"we\", \"our\", or \"us\") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.",
      sections: [
        {
          heading: "What are cookies?",
          body:
            "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.",
        },
        {
          heading: "Why do we use cookies?",
          body:
            "We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as \"essential\" or \"strictly necessary\" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.",
        },
        {
          heading: "Types of cookies we use",
          body: "",
          list: [
            "Essential website cookies — These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas and watchlist tracking.",
            "Performance and functionality cookies — These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.",
            "Analytics and customization cookies — These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.",
          ],
        },
        {
          heading: "How can I control cookies?",
          body:
            "You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser or through browser-level consent settings.",
          bodyExtra:
            "You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and secure areas of our website may be restricted.",
        },
      ],
    },
  },

  watchlist: {
    title: "My Watchlist",
    subtitle:
      "Keep track of machinery and equipment saved to your profile for quick quotes and specs reference.",
    emptyTitle: "No Saved Machinery",
    emptyDesc:
      "You haven't saved any equipment to your watchlist yet. Explore our product line to save items for instant quote requests.",
    browseCatalog: "Browse Product Line",
    signInRequiredTitle: "Sign in to view your watchlist",
    signInRequiredDesc:
      "Create a free account or sign in to save machinery and access your watchlist from any device.",
    signIn: "Sign In",
    removeFromWatchlist: "Remove",
  },

  login: {
    welcomeBack: "Welcome Back",
    subtitle:
      "Sign in with Google to bookmark machinery and manage your quote requests.",
    continueWithGoogle: "Continue with Google",
    connecting: "Connecting...",
    privacyNote:
      "We only collect your name, email address, and profile photo for authentication.",
  },

  notFound: {
    title: "Page Not Found",
    description:
      "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    returnHome: "Return Home",
    viewMachinery: "View Machinery",
  },
};

export default en;
export type Dictionary = typeof en;
