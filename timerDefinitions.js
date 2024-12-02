const TIMER_DEFINITIONS={
    "Countdown":{ 
        name:"Countdown",
        description:'',
        timer:{ name: 'Countdown', duration: '5:00'}
    },
    "Wicket Questions":{ 
        name:"Wicked Questions",
        description:'"Wicked Questions" is a Liberating Structure designed to surface and explore paradoxes that groups face when navigating complex challenges. This structure helps reveal the “both/and” thinking necessary for innovation and avoids simplistic “either/or” responses. By articulating paradoxical forces influencing behavior, teams can engage in strategic thinking that confronts messy realities, sparks creativity, and balances competing needs.',
        timer:{name:"Wicked Questions",
            timers: [
                { name: 'Introduce the concept', duration: '5:00'},
                { name: 'Each participant generates pairs of paradoxes', duration: '5:00'},
                { name: 'Each group selects its most impactful', duration: '1:00'},
                { name: 'Selected Wicked Questions are shared with the whole group', duration: '5:00'},
                { name: 'Whole group picks out the most powerful ones and further refines the Wicked Questions.', duration: '10:00'},
        ]}
    },
    "1-2-4-All":{
        name:"1-2-4-All",
        description: '"1-2-4-All" engages everyone in generating ideas by first reflecting individually, then discussing in pairs, then groups of four, and finally as a whole group. It encourages widespread contribution and converges on key ideas quickly.',
        timer:{
            name: "1-2-4-All",
            timers: [
                { name: 'Individual reflection', duration: '1:00' },
                { name: 'Pair discussion', duration: '2:00' },
                { name: 'Share with foursome', duration: '4:00' },
                { name: 'Group discussion', duration: '5:00' }
            ]
        }
    },
    "TRIZ": {
        name: "TRIZ",
        description: '"TRIZ" is a problem-solving Liberating Structure that uses reverse brainstorming. Participants imagine ways to achieve the worst possible outcome and then identify how these pitfalls might be avoided or reversed.',
        timer: {
            name: "TRIZ",
            timers: [
                { name: 'Identify the worst outcome imaginable', duration: '5:00' },
                { name: 'Brainstorm ways to achieve that outcome', duration: '5:00' },
                { name: 'Reflect on how current practices might be contributing', duration: '3:00' },
                { name: 'Plan actions to avoid those pitfalls', duration: '5:00' }
            ]
        }
    },
    "Impromptu Networking": {
        name: "Impromptu Networking",
        description: '"Impromptu Networking" encourages participants to meet new people and share ideas rapidly. It’s designed to quickly get everyone’s ideas into the room and energize participants at the start of a session.',
        timer: {
            name: "Impromptu Networking",
            timers: [
                { name: 'Introduce concept and instructions', duration: '2:00' },
                { name: 'Round 1: Pair up and discuss', duration: '3:00' },
                { name: 'Round 2: Switch partners and discuss', duration: '3:00' },
                { name: 'Round 3: Switch partners again and discuss', duration: '3:00' }
            ]
        }
    },
    "Nine Whys": {
        name: "Nine Whys",
        description: '"Nine Whys" helps participants explore the deeper purpose behind their work. By asking "why" repeatedly, they uncover fundamental motivations and underlying assumptions, fostering a stronger sense of purpose.',
        timer: {
            name: "Nine Whys",
            timers: [
                { name: 'Introduce the concept', duration: '2:00' },
                { name: 'Participants pair up and ask each other "why"', duration: '4:00' },
                { name: 'Switch roles and repeat', duration: '4:00' },
                { name: 'Whole group sharing of insights', duration: '5:00' }
            ]
        }
    },
    "25/10 Crowdsourcing": {
        name: "25/10 Crowdsourcing",
        description: '"25/10 Crowdsourcing" helps identify the most popular ideas among a group quickly. Ideas are generated individually and then scored by others through multiple rounds of scoring, which reveals top ideas.',
        timer: {
            name: "25/10 Crowdsourcing",
            timers: [
                { name: 'Generate ideas individually', duration: '5:00' },
                { name: 'Scoring round 1', duration: '2:00' },
                { name: 'Scoring round 2', duration: '2:00' },
                { name: 'Scoring round 3', duration: '2:00' },
                { name: 'Announce top ideas', duration: '2:00' }
            ]
        }
    },
    "What, So What, Now What?": {
        name: "What, So What, Now What?",
        description: '"What, So What, Now What?" guides groups through reflective questions to process experiences, identify insights, and plan actionable steps forward. This structure is helpful for debriefing activities and projects.',
        timer: {
            name: "What, So What, Now What?",
            timers: [
                { name: 'Reflection on "What?" (What happened?)', duration: '3:00' },
                { name: 'Discussion on "So What?" (What does it mean?)', duration: '4:00' },
                { name: 'Planning on "Now What?" (What next?)', duration: '5:00' }
            ]
        }
    },
    "Appreciative Interviews": {
        name: "Appreciative Interviews",
        description: '"Appreciative Interviews" invites participants to share their personal successes and strengths, creating a positive foundation for group discussions and future actions. It strengthens relationships by exploring meaningful personal stories.',
        timer: {
            name: "Appreciative Interviews",
            timers: [
                { name: 'Introduce the activity and goals', duration: '3:00' },
                { name: 'Participants pair up and interview each other', duration: '7:00' },
                { name: 'Switch roles and repeat', duration: '7:00' },
                { name: 'Whole group shares highlights', duration: '5:00' }
            ]
        }
    },
    "Celebrity Interview": {
        name: "Celebrity Interview",
        description: '"Celebrity Interview" uses a panel format to spotlight an expert or “celebrity” who is interviewed by the group. This structure allows for in-depth exploration of specific knowledge or experiences in a lively and engaging way.',
        timer: {
            name: "Celebrity Interview",
            timers: [
                { name: 'Setup and explain process', duration: '3:00' },
                { name: 'Celebrity shares their insights', duration: '5:00' },
                { name: 'Open for audience questions', duration: '10:00' },
                { name: 'Reflections and takeaways', duration: '5:00' }
            ]
        }
    },
    "Shift and Share": {
        name: "Shift and Share",
        description: '"Shift and Share" enables group members to present their ideas, projects, or skills in small rotating groups, giving everyone a chance to showcase their work and gain diverse feedback efficiently.',
        timer: {
            name: "Shift and Share",
            timers: [
                { name: 'Setup and instructions', duration: '3:00' },
                { name: 'Presenter 1 shares and receives feedback', duration: '5:00' },
                { name: 'Presenter 2 shares and receives feedback', duration: '5:00' },
                { name: 'Presenter 3 shares and receives feedback', duration: '5:00' },
                { name: 'Whole group reflections', duration: '5:00' }
            ]
        }
    },
    "Min Specs": {
        name: "Min Specs",
        description: '"Min Specs" helps teams identify the minimum requirements for a successful outcome, enabling them to eliminate unnecessary work and focus on essential elements.',
        timer: {
            name: "Min Specs",
            timers: [
                { name: 'Introduce the concept', duration: '3:00' },
                { name: 'Identify essential success criteria', duration: '5:00' },
                { name: 'Discuss and refine criteria in small groups', duration: '5:00' },
                { name: 'Share refined criteria with the whole group', duration: '5:00' }
            ]
        }
    },
    "Drawing Together": {
        name: "Drawing Together",
        description: '"Drawing Together" encourages groups to collaboratively create a visual representation of their ideas or plans, making abstract ideas concrete and fostering collective ownership of the outcome.',
        timer: {
            name: "Drawing Together",
            timers: [
                { name: 'Explain concept and objectives', duration: '3:00' },
                { name: 'Individuals start sketches', duration: '5:00' },
                { name: 'Small groups combine and refine sketches', duration: '7:00' },
                { name: 'Whole group shares final drawings', duration: '5:00' }
            ]
        }
    },
    "Purpose to Practice": {
        name: "Purpose to Practice",
        description: '"Purpose to Practice" helps groups design and plan initiatives by aligning on purpose, principles, participants, structure, and practices. It provides a comprehensive roadmap for collaborative action.',
        timer: {
            name: "Purpose to Practice",
            timers: [
                { name: 'Define purpose', duration: '5:00' },
                { name: 'Identify guiding principles', duration: '5:00' },
                { name: 'List key participants and their roles', duration: '5:00' },
                { name: 'Outline structure and key actions', duration: '5:00' },
                { name: 'Develop initial practices', duration: '5:00' }
            ]
        }
    },
    "User Experience Fishbowl": {
        name: "User Experience Fishbowl",
        description: '"User Experience Fishbowl" allows participants to observe real users as they interact with a product or process, gaining valuable insights into usability and user needs through direct observation and guided reflection.',
        timer: {
            name: "User Experience Fishbowl",
            timers: [
                { name: 'Set up fishbowl seating', duration: '3:00' },
                { name: 'User demonstration of product/process', duration: '10:00' },
                { name: 'Observers take notes and reflect', duration: '5:00' },
                { name: 'Group shares observations and insights', duration: '7:00' }
            ]
        }
    },
    "Mad Tea": {
        name: "Mad Tea",
        description: '"Mad Tea" is a high-energy structured conversation that enables participants to quickly exchange ideas and viewpoints by responding to prompts in rotating pairs. It encourages fast-paced engagement and fresh perspectives.',
        timer: {
            name: "Mad Tea",
            timers: [
                { name: 'Introduce the activity and form pairs', duration: '3:00' },
                { name: 'Round 1: Respond to prompt', duration: '1:00' },
                { name: 'Round 2: Switch partners and respond to prompt', duration: '1:00' },
                { name: 'Round 3: Switch partners and respond to prompt', duration: '1:00' },
                { name: 'Group debrief and highlight key insights', duration: '5:00' }
            ]
        }
    },
    "Conversation Café": {
        name: "Conversation Café",
        description: '"Conversation Café" provides a space for open, meaningful discussions on complex topics. Using structured rounds, it encourages deep listening, shared understanding, and collective insight.',
        timer: {
            name: "Conversation Café",
            timers: [
                { name: 'Round 1: Introduce topic and set ground rules', duration: '3:00' },
                { name: 'Round 2: Open sharing in rounds', duration: '10:00' },
                { name: 'Round 3: Group discusses emerging themes', duration: '7:00' },
                { name: 'Reflection and takeaway round', duration: '5:00' }
            ]
        }
    },
    "Treuka Consulting": {
        name: "Treuka Consulting",
        description: 'The Treuka Consulting method is a structured, collaborative approach designed to help clients clarify key objectives, identify core challenges, co-create solutions, and define actionable steps. This process aims to ensure a deep understanding of the client’s needs, deliver tailored advice, and support effective implementation strategies.',
        timer: {
            name: "Treuka Consulting",
            timers: [
                { name: 'Invite participants to think of a question they would like to ask as a client.', duration: '1:00' },
                {
                    name: "Client Triads",
                    repetitions: 3,
                    timers: [
                        { name: 'Client poses their question to the group.', duration: '3:00' },
                        { name: 'Consultants ask clarifying questions to the client.', duration: '3:00' },
                        { name: 'Client turns around, facing away from the consultants.', duration: '1:00' },
                        { name: 'Consultants discuss and develop ideas, suggestions, and advice.', duration: '5:00' },
                        { name: 'Client turns back to the group and shares what they found most valuable from the experience.', duration: '2:00' },
                        { name: 'Group moves to the next client and repeats the steps.', duration: '10:00' },
                    ]
                }
            ]
        }
    },
    "Pomodoro Technique": {
        name: "Pomodoro Technique",
        description: 'The Pomodoro Technique is a time management method that encourages focused work sessions followed by short breaks. Each session is called a "Pomodoro," lasting typically 25 minutes, with a 5-minute break afterward. After completing four Pomodoros, a longer break is taken. This method enhances productivity and helps maintain concentration.',
        timer: {
            name: "Pomodoro Technique",
            timers: [
                { name: 'Work Session 1', duration: '25:00' },
                { name: 'Short Break 1', duration: '5:00' },
                { name: 'Work Session 2', duration: '25:00' },
                { name: 'Short Break 2', duration: '5:00' },
                { name: 'Work Session 3', duration: '25:00' },
                { name: 'Short Break 3', duration: '5:00' },
                { name: 'Work Session 4', duration: '25:00' },
                { name: 'Long Break', duration: '15:00' }
            ]
        }
    }
}