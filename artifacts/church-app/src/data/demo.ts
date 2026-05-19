export const DEMO_DATA = {
  verses: [
    { ref: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." }, // Sun
    { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." }, // Mon
    { ref: "Phil 4:13", text: "I can do all this through him who gives me strength." }, // Tue
    { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." }, // Wed
    { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." }, // Thu
    { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." }, // Fri
    { ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." } // Sat
  ],
  announcements: [
    { id: 1, title: "Night of Wonders", date: "Coming Friday", desc: "Join us for an overnight service of signs and wonders.", pinned: true },
    { id: 2, title: "Building Fund Launch", date: "This Sunday", desc: "We are officially launching our new cathedral building project.", pinned: false }
  ],
  services: [
    {
      id: "morning",
      title: "Morning Service (Sunday)",
      schedule: [
        { time: "7:00 AM", event: "Service Begins" },
        { time: "7:30 AM", event: "Praise" },
        { time: "8:00 AM", event: "Worship" },
        { time: "8:30 AM", event: "Testimonies" },
        { time: "9:00 AM", event: "The Word" },
        { time: "9:45 AM", event: "Giving" },
        { time: "10:00 AM", event: "Service Ends" },
      ]
    },
    {
      id: "main",
      title: "Main Service (Sunday)",
      schedule: [
        { time: "10:00 AM", event: "Service Begins" },
        { time: "10:20 AM", event: "Praise" },
        { time: "11:00 AM", event: "Testimonies" },
        { time: "11:30 AM", event: "Worship" },
        { time: "11:45 AM", event: "The Word" },
        { time: "12:45 PM", event: "Giving" },
        { time: "1:00 PM", event: "Service Ends" },
      ]
    },
    {
      id: "midweek",
      title: "Midweek Service (Wednesday)",
      schedule: [
        { time: "4:00 PM", event: "Bible Study Begins" },
        { time: "8:00 PM", event: "Deliverance Service Ends" },
      ]
    },
    {
      id: "overnight",
      title: "Overnight Services (Fridays)",
      schedule: [
        { time: "First Friday", event: "All Faith Mission Churches International" },
        { time: "Last Friday", event: "Signs And Wonders Church" },
      ]
    }
  ],
  sermons: [
    { id: 1, title: "Walking in Faith", date: "Last Sunday", duration: "45 min" },
    { id: 2, title: "The Power of Prayer", date: "2 weeks ago", duration: "52 min" },
    { id: 3, title: "Undefeated in Christ", date: "3 weeks ago", duration: "60 min" },
    { id: 4, title: "Divine Provision", date: "1 month ago", duration: "48 min" },
  ],
  departments: [
    { id: "media", name: "Media", leader: "Negohe Ivan Khosler", number: "2567740512621", desc: "Capture and broadcast God's glory through film, photography, and digital media. Join our creative team serving the vision." },
    { id: "choir", name: "Choir", leader: "Naggawa Mariam", number: "256706427383", desc: "Lift up His name through harmonious voices and orchestrated praise. Join our choir family in musical worship." },
    { id: "praise", name: "Praise and Worship", leader: "Naggawa Mariam", number: "256706427383", desc: "Lead the congregation into the presence of God through anointed praise and worship. A calling for passionate worshippers." },
    { id: "men", name: "Men Ministry", leader: "Pastor Expedito", number: "256754720551", desc: "Equipping men to be spiritual leaders, fathers, and pillars of faith in their homes and community." },
    { id: "women", name: "Women Ministry", leader: "Nkote Mariam", number: "256771601120", desc: "Empowering women of faith to rise, serve, and lead with grace, dignity, and the love of Christ." },
    { id: "ushering", name: "Ushering", leader: "Mrs. Nakanwagi Jessica", number: "256758894324", desc: "Creating a welcoming atmosphere and maintaining order in God's house with excellence and joy." },
    { id: "youth", name: "Youth Ministry", leader: "Kaduma Dasan", number: "256772965310", desc: "Raising a generation on fire for God, equipped with the Word and empowered by the Holy Spirit." },
    { id: "outreach", name: "Outreaches and Evangelism", leader: "Mrs. Hamala Mbabazi", number: "256782147085", desc: "Taking the gospel beyond the four walls - reaching communities, cities, and nations with hope." },
  ]
};