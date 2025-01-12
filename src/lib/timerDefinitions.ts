export function getTimerDefinitions() {
	return {
		Countdown: {
			name: 'Countdown',
			timer: { name: 'Countdown', duration: 300 }
		},
		'Wicked Questions': {
			name: 'Wicked Questions',
			description:
				'"Wicked Questions" is a Liberating Structure designed to surface and explore paradoxes that groups face when navigating complex challenges. This structure helps reveal the “both/and” thinking necessary for innovation and avoids simplistic “either/or” responses. By articulating paradoxical forces influencing behavior, teams can engage in strategic thinking that confronts messy realities, sparks creativity, and balances competing needs.',
			timer: {
				name: 'Wicked Questions',
				timers: [
					{
						name: 'Introduce the concept',
						duration: 300,
						description: 'Introduction to the concept of Wicked Questions.'
					},
					{
						name: 'Each participant generates pairs of paradoxes',
						duration: 300,
						description: 'Participants generate pairs of paradoxes.'
					},
					{
						name: 'Each group selects its most impactful',
						duration: 60,
						description: 'Groups select the most impactful paradoxes.'
					},
					{
						name: 'Selected Wicked Questions are shared with the whole group',
						duration: 300,
						description: 'Sharing selected Wicked Questions with the whole group.'
					},
					{
						name: 'Whole group picks out the most powerful ones and further refines the Wicked Questions.',
						duration: 600,
						description: 'Refining the most powerful Wicked Questions.'
					}
				]
			}
		},
		'1-2-4-All': {
			name: '1-2-4-All',
			timer: {
				name: '1-2-4-All',
				description:
					'"1-2-4-All" engages everyone in generating ideas by first reflecting individually, then discussing in pairs, then groups of four, and finally as a whole group. It encourages widespread contribution and quickly converges on key ideas through a structured process.',
				timers: [
					{
						name: 'Silent self-reflection',
						duration: 60,
						description:
							"Individuals reflect silently on a shared challenge framed as a question (e.g., 'What opportunities do you see for making progress on this challenge?')."
					},
					{
						name: 'Pair discussion',
						duration: 120,
						description: 'Participants discuss and build on ideas from self-reflection in pairs.'
					},
					{
						name: 'Share in foursomes',
						duration: 240,
						description:
							'Participants share and develop ideas from their pairs in groups of four, identifying similarities and differences.'
					},
					{
						name: 'Whole group discussion',
						duration: 300,
						description:
							'Each group shares one standout idea with the whole group. Repeat as needed.'
					}
				]
			}
		},
		'15% Solution': {
			name: '15% Solution',
			timer: {
				name: '15% Solution',
				description:
					'"15% Solution" helps participants identify actions within their control that they can take immediately to create progress. It shifts focus away from barriers and toward actionable steps, empowering individuals and teams to discover their potential.',
				timers: [
					{
						name: 'Generate individual 15% Solutions',
						duration: 300,
						description: 'Each person works alone to create a list of their own 15% Solutions.'
					},
					{
						name: 'Share in small groups',
						duration: 180,
						repetitions: 3,
						description:
							'Participants take turns sharing their ideas with a group of 2 to 4 members, one person at a time.'
					},
					{
						name: 'Group consultation',
						duration: 300,
						repetitions: 3,
						description:
							"Group members provide feedback, ask clarifying questions, and offer advice for each person's 15% Solutions."
					}
				]
			}
		},
		TRIZ: {
			name: 'TRIZ',
			timer: {
				name: 'TRIZ',
				description:
					'"TRIZ" is a problem-solving Liberating Structure that uses reverse brainstorming. Participants imagine ways to achieve the worst possible outcome and then identify how these pitfalls might be avoided or reversed. It creates space for innovation by identifying and stopping counterproductive behaviors.',
				timers: [
					{
						name: 'Introduction and identify unwanted result',
						duration: 300,
						description:
							"Introduce TRIZ, identify an unwanted result, and confirm the group's agreement."
					},
					{
						name: 'Brainstorm ways to achieve the unwanted result',
						duration: 600,
						description: 'Use 1-2-4-All to list all actions that could lead to the unwanted result.'
					},
					{
						name: 'Identify current practices contributing to the result',
						duration: 600,
						description:
							'Use 1-2-4-All to identify current actions or behaviors similar to those on the first list.'
					},
					{
						name: 'Plan actions to stop harmful practices',
						duration: 600,
						description:
							'Use 1-2-4-All to create first steps to eliminate identified counterproductive actions or behaviors.'
					}
				]
			}
		},
		'Impromptu Networking': {
			name: 'Impromptu Networking',
			timer: {
				name: 'Impromptu Networking',
				description:
					'"Impromptu Networking" encourages participants to meet new people and share ideas rapidly. It helps surface diverse perspectives, build connections, and energize participants at the start of a session.',
				timers: [
					{
						name: 'Round 1',
						duration: 300,
						description:
							'Two participants take turns answering the challenge question (2 minutes per person).'
					},
					{
						name: 'Round 2',
						duration: 300,
						description:
							'Participants switch partners and repeat the process with a new connection.'
					},
					{
						name: 'Round 3',
						duration: 300,
						description: 'Participants meet a third partner to continue sharing and building ideas.'
					}
				]
			}
		},
		'Nine Whys': {
			name: 'Nine Whys',
			timer: {
				name: 'Nine Whys',
				description:
					'"Nine Whys" helps participants explore the deeper purpose behind their work. By asking "why" repeatedly, they uncover fundamental motivations and underlying assumptions, fostering a stronger sense of purpose.',
				timers: [
					{ name: 'Introduce the concept', duration: 120 },
					{ name: 'Participants pair up and ask each other "why"', duration: 240 },
					{ name: 'Switch roles and repeat', duration: 240 },
					{ name: 'Whole group sharing of insights', duration: 300 }
				]
			}
		},
		'25/10 Crowdsourcing': {
			name: '25/10 Crowdsourcing',
			timer: {
				name: '25/10 Crowdsourcing',
				description:
					'"25/10 Crowdsourcing" helps identify the most popular ideas among a group quickly. Ideas are generated individually and then scored by others through multiple rounds of scoring, which reveals top ideas.',
				timers: [
					{ name: 'Generate ideas individually', duration: 300 },
					{ name: 'Scoring round 1', duration: 120 },
					{ name: 'Scoring round 2', duration: 120 },
					{ name: 'Scoring round 3', duration: 120 },
					{ name: 'Announce top ideas', duration: 120 }
				]
			}
		},
		'What, So What, Now What?': {
			name: 'What, So What, Now What?',
			timer: {
				name: 'What, So What, Now What?',
				description:
					'"What, So What, Now What?" guides groups through reflective questions to process experiences, identify insights, and plan actionable steps forward. This structure is helpful for debriefing activities and projects.',
				timers: [
					{ name: 'Reflection on "What?" (What happened?)', duration: 180 },
					{ name: 'Discussion on "So What?" (What does it mean?)', duration: 240 },
					{ name: 'Planning on "Now What?" (What next?)', duration: 300 }
				]
			}
		},
		'Appreciative Interviews': {
			name: 'Appreciative Interviews',
			timer: {
				name: 'Appreciative Interviews',
				description:
					'"Appreciative Interviews" invites participants to share their personal successes and strengths, creating a positive foundation for group discussions and future actions. It strengthens relationships by exploring meaningful personal stories.',
				timers: [
					{ name: 'Introduce the activity and goals', duration: 180 },
					{ name: 'Participants pair up and interview each other', duration: 420 },
					{ name: 'Switch roles and repeat', duration: 420 },
					{ name: 'Whole group shares highlights', duration: 300 }
				]
			}
		},
		'Celebrity Interview': {
			name: 'Celebrity Interview',
			timer: {
				name: 'Celebrity Interview',
				description:
					'"Celebrity Interview" uses a panel format to spotlight an expert or “celebrity” who is interviewed by the group. This structure allows for in-depth exploration of specific knowledge or experiences in a lively and engaging way.',
				timers: [
					{ name: 'Setup and explain process', duration: 180 },
					{ name: 'Celebrity shares their insights', duration: 300 },
					{ name: 'Open for audience questions', duration: 600 },
					{ name: 'Reflections and takeaways', duration: 300 }
				]
			}
		},
		'Shift and Share': {
			name: 'Shift and Share',
			timer: {
				name: 'Shift and Share',
				description:
					'"Shift and Share" enables group members to present their ideas, projects, or skills in small rotating groups, giving everyone a chance to showcase their work and gain diverse feedback efficiently.',
				timers: [
					{ name: 'Setup and instructions', duration: 180 },
					{ name: 'Presenter 1 shares and receives feedback', duration: 300 },
					{ name: 'Presenter 2 shares and receives feedback', duration: 300 },
					{ name: 'Presenter 3 shares and receives feedback', duration: 300 },
					{ name: 'Whole group reflections', duration: 300 }
				]
			}
		},
		'Min Specs': {
			name: 'Min Specs',
			timer: {
				name: 'Min Specs',
				description:
					'"Min Specs" helps teams identify the minimum requirements for a successful outcome, enabling them to eliminate unnecessary work and focus on essential elements.',
				timers: [
					{ name: 'Introduce the concept', duration: 180 },
					{ name: 'Identify essential success criteria', duration: 300 },
					{ name: 'Discuss and refine criteria in small groups', duration: 300 },
					{ name: 'Share refined criteria with the whole group', duration: 300 }
				]
			}
		},
		'Drawing Together': {
			name: 'Drawing Together',
			timer: {
				name: 'Drawing Together',
				description:
					'"Drawing Together" encourages groups to collaboratively create a visual representation of their ideas or plans, making abstract ideas concrete and fostering collective ownership of the outcome.',
				timers: [
					{ name: 'Explain concept and objectives', duration: 180 },
					{ name: 'Individuals start sketches', duration: 300 },
					{ name: 'Small groups combine and refine sketches', duration: 420 },
					{ name: 'Whole group shares final drawings', duration: 300 }
				]
			}
		},
		'Purpose to Practice': {
			name: 'Purpose to Practice',
			timer: {
				name: 'Purpose to Practice',
				description:
					'"Purpose to Practice" helps groups design and plan initiatives by aligning on purpose, principles, participants, structure, and practices. It provides a comprehensive roadmap for collaborative action.',
				timers: [
					{ name: 'Define purpose', duration: 300 },
					{ name: 'Identify guiding principles', duration: 300 },
					{ name: 'List key participants and their roles', duration: 300 },
					{ name: 'Outline structure and key actions', duration: 300 },
					{ name: 'Develop initial practices', duration: 300 }
				]
			}
		},
		'User Experience Fishbowl': {
			name: 'User Experience Fishbowl',
			timer: {
				name: 'User Experience Fishbowl',
				description:
					'"User Experience Fishbowl" allows participants to observe real users as they interact with a product or process, gaining valuable insights into usability and user needs through direct observation and guided reflection.',
				timers: [
					{ name: 'Set up fishbowl seating', duration: 180 },
					{ name: 'User demonstration of product/process', duration: 600 },
					{ name: 'Observers take notes and reflect', duration: 300 },
					{ name: 'Group shares observations and insights', duration: 420 }
				]
			}
		},
		'Mad Tea': {
			name: 'Mad Tea',
			timer: {
				name: 'Mad Tea',
				description:
					'"Mad Tea" is a high-energy structured conversation that enables participants to quickly exchange ideas and viewpoints by responding to prompts in rotating pairs. It encourages fast-paced engagement and fresh perspectives.',
				timers: [
					{ name: 'Introduce the activity and form pairs', duration: 180 },
					{ name: 'Round 1: Respond to prompt', duration: 60 },
					{ name: 'Round 2: Switch partners and respond to prompt', duration: 60 },
					{ name: 'Round 3: Switch partners and respond to prompt', duration: 60 },
					{ name: 'Group debrief and highlight key insights', duration: 300 }
				]
			}
		},
		'Conversation Café': {
			name: 'Conversation Café',
			timer: {
				name: 'Conversation Café',
				description:
					'"Conversation Café" provides a space for open, meaningful discussions on complex topics. Using structured rounds, it encourages deep listening, shared understanding, and collective insight.',
				timers: [
					{ name: 'Round 1: Introduce topic and set ground rules', duration: 180 },
					{ name: 'Round 2: Open sharing in rounds', duration: 600 },
					{ name: 'Round 3: Group discusses emerging themes', duration: 420 },
					{ name: 'Reflection and takeaway round', duration: 300 }
				]
			}
		},
		'Treuka Consulting': {
			name: 'Treuka Consulting',
			timer: {
				name: 'Treuka Consulting',
				description:
					'The Treuka Consulting method is a structured, collaborative approach designed to help clients clarify key objectives, identify core challenges, co-create solutions, and define actionable steps. This process aims to ensure a deep understanding of the client’s needs, deliver tailored advice, and support effective implementation strategies.',
				timers: [
					{
						name: 'Invite participants to think of a question they would like to ask as a client.',
						duration: 60
					},
					{
						name: 'Client Triads',
						repetitions: 3,
						timers: [
							{ name: 'Client poses their question to the group.', duration: 180 },
							{ name: 'Consultants ask clarifying questions to the client.', duration: 180 },
							{ name: 'Client turns around, facing away from the consultants.', duration: 60 },
							{
								name: 'Consultants discuss and develop ideas, suggestions, and advice.',
								duration: 300
							},
							{
								name: 'Client turns back to the group and shares what they found most valuable from the experience.',
								duration: 120
							},
							{ name: 'Group moves to the next client and repeats the steps.', duration: 600 }
						]
					}
				]
			}
		},
		'Pomodoro Technique': {
			name: 'Pomodoro Technique',
			timer: {
				name: 'Pomodoro Technique',
				description:
					'The Pomodoro Technique is a time management method that encourages focused work sessions followed by short breaks. Each session is called a "Pomodoro," lasting typically 25 minutes, with a 5-minute break afterward. After completing four Pomodoros, a longer break is taken. This method enhances productivity and helps maintain concentration.',
				timers: [
					{ name: 'Work Session 1', duration: 1500 },
					{ name: 'Short Break 1', duration: 300 },
					{ name: 'Work Session 2', duration: 1500 },
					{ name: 'Short Break 2', duration: 300 },
					{ name: 'Work Session 3', duration: 1500 },
					{ name: 'Short Break 3', duration: 300 },
					{ name: 'Work Session 4', duration: 1500 },
					{ name: 'Long Break', duration: 900 }
				]
			}
		},
		Tabata: {
			name: 'Tabata',
			timer: {
				name: 'Tabata',
				description:
					'Tabata is a high-intensity interval training (HIIT) workout. This method is designed to improve cardiovascular fitness and burn calories in a short amount of time.',
				repetitions: 8,
				timers: [
					{ name: 'Rest/Preparation', duration: 10 },
					{ name: 'Exercise', duration: 20 }
				]
			}
		}
	};
}
