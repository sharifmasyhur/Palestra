// ---------------------------------------------------------------------------
// Movement Vault — data model and mock dataset.
//
// Every exercise sits somewhere on a progression chain (easier/harder point
// to a neighboring slug). Chains are intentionally short and real —
// e.g. Incline Push-Up -> Push-Up -> Diamond -> Archer -> One-Arm — so the
// progression tree on the detail page has something genuine to render.
// ---------------------------------------------------------------------------

export type ExerciseCategory = "Push" | "Pull" | "Legs" | "Core" | "Skills";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Elite";

export type Equipment =
  | "None"
  | "Pull-up Bar"
  | "Rings"
  | "Parallettes"
  | "Dip Bars"
  | "Bench"
  | "Wall";

export type Muscle =
  | "Chest"
  | "Shoulders"
  | "Triceps"
  | "Back"
  | "Lats"
  | "Biceps"
  | "Core"
  | "Obliques"
  | "Quads"
  | "Glutes"
  | "Hamstrings"
  | "Calves"
  | "Forearms"
  | "Full Body";

// "reps" exercises are prescribed as sets x reps; "hold" exercises are
// prescribed as sets x seconds. Read by the workout generator to decide
// how to phrase and total up a prescription.
export type RepType = "reps" | "hold";

export type ProgressionRef = {
  slug: string;
  name: string;
};

export type Exercise = {
  slug: string;
  name: string;
  category: ExerciseCategory;
  difficulty: Difficulty;
  equipment: Equipment[];
  primaryMuscles: Muscle[];
  secondaryMuscles: Muscle[];
  repType: RepType;
  shortDescription: string;
  instructions: string[];
  commonMistakes: string[];
  trainingRecommendation: string;
  progression: {
    easier?: ProgressionRef;
    harder?: ProgressionRef;
  };
};

export const categories: ExerciseCategory[] = ["Push", "Pull", "Legs", "Core", "Skills"];
export const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced", "Elite"];
export const equipmentOptions: Equipment[] = [
  "None",
  "Pull-up Bar",
  "Rings",
  "Parallettes",
  "Dip Bars",
  "Bench",
  "Wall",
];
export const muscleOptions: Muscle[] = [
  "Chest",
  "Shoulders",
  "Triceps",
  "Back",
  "Lats",
  "Biceps",
  "Core",
  "Obliques",
  "Quads",
  "Glutes",
  "Hamstrings",
  "Calves",
  "Forearms",
  "Full Body",
];

export const exercises: Exercise[] = [
  // ---------------------------------------------------------------- Push
  {
    slug: "incline-push-up",
    name: "Incline Push-Up",
    category: "Push",
    difficulty: "Beginner",
    equipment: ["Bench"],
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Shoulders", "Core"],
    repType: "reps",
    shortDescription:
      "A push-up with the hands elevated on a bench, reducing the load on the chest and shoulders.",
    instructions: [
      "Place both hands on a bench or sturdy elevated surface, slightly wider than shoulder-width.",
      "Walk your feet back until your body forms a straight line from head to heels.",
      "Lower your chest toward the bench with elbows at roughly 45 degrees.",
      "Press back up to full arm extension without letting your hips sag.",
    ],
    commonMistakes: [
      "Letting the hips drop, turning it into a bad-form plank.",
      "Flaring the elbows straight out to the sides instead of ~45 degrees.",
      "Using a surface so high the exercise no longer challenges the chest.",
    ],
    trainingRecommendation:
      "3-4 sets of 10-15 reps, 2-3x per week, as an entry point before flat push-ups.",
    progression: { harder: { slug: "push-up", name: "Push-Up" } },
  },
  {
    slug: "push-up",
    name: "Push-Up",
    category: "Push",
    difficulty: "Beginner",
    equipment: ["None"],
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Shoulders", "Core"],
    repType: "reps",
    shortDescription:
      "The foundational horizontal press — full-body tension from a plank position.",
    instructions: [
      "Set hands slightly wider than shoulder-width, body in a straight plank.",
      "Brace your core and squeeze your glutes to keep hips level.",
      "Lower until your chest is an inch or two off the floor, elbows at ~45 degrees.",
      "Drive through the palms back to full lockout.",
    ],
    commonMistakes: [
      "Sagging or piking the hips instead of holding a rigid plank.",
      "Only lowering halfway — partial range of motion limits the stimulus.",
      "Flaring elbows to 90 degrees, which stresses the shoulder joint.",
    ],
    trainingRecommendation:
      "3-4 sets of 10-20 reps, 3x per week. Move to Diamond Push-Ups once 20 clean reps is easy.",
    progression: {
      easier: { slug: "incline-push-up", name: "Incline Push-Up" },
      harder: { slug: "diamond-push-up", name: "Diamond Push-Up" },
    },
  },
  {
    slug: "diamond-push-up",
    name: "Diamond Push-Up",
    category: "Push",
    difficulty: "Intermediate",
    equipment: ["None"],
    primaryMuscles: ["Triceps", "Chest"],
    secondaryMuscles: ["Shoulders", "Core"],
    repType: "reps",
    shortDescription:
      "A close-grip push-up with the hands forming a diamond shape, shifting emphasis to the triceps.",
    instructions: [
      "Form a diamond with your thumbs and index fingers directly under your sternum.",
      "Keep elbows tracking close to your ribs as you lower.",
      "Lower your chest to your hands while maintaining a rigid plank.",
      "Press back up, focusing on triceps lockout at the top.",
    ],
    commonMistakes: [
      "Letting the elbows flare out, which removes the triceps emphasis.",
      "Rounding the upper back to compensate for reduced leverage.",
      "Rushing reps instead of controlling the descent.",
    ],
    trainingRecommendation:
      "3-4 sets of 8-15 reps, 2-3x per week, paired with regular push-ups in the same session.",
    progression: {
      easier: { slug: "push-up", name: "Push-Up" },
      harder: { slug: "archer-push-up", name: "Archer Push-Up" },
    },
  },
  {
    slug: "archer-push-up",
    name: "Archer Push-Up",
    category: "Push",
    difficulty: "Advanced",
    equipment: ["None"],
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Shoulders", "Core"],
    repType: "reps",
    shortDescription:
      "A wide-stance push-up that shifts nearly all the load to one arm at a time — the last step before one-arm work.",
    instructions: [
      "Set hands much wider than shoulder-width, fingers pointing slightly outward.",
      "Lower toward one hand while the other arm straightens out to the side.",
      "Keep the straight arm's palm on the floor for balance, not for pushing.",
      "Push back to center and repeat toward the opposite side.",
    ],
    commonMistakes: [
      "Letting the 'straight' arm do meaningful work instead of just balancing.",
      "Losing hip alignment as you shift weight side to side.",
      "Not descending far enough on the working side.",
    ],
    trainingRecommendation:
      "3-5 sets of 4-8 reps per side, 2x per week, once Diamond Push-Ups exceed 15 clean reps.",
    progression: {
      easier: { slug: "diamond-push-up", name: "Diamond Push-Up" },
      harder: { slug: "one-arm-push-up", name: "One-Arm Push-Up" },
    },
  },
  {
    slug: "one-arm-push-up",
    name: "One-Arm Push-Up",
    category: "Push",
    difficulty: "Elite",
    equipment: ["None"],
    primaryMuscles: ["Chest", "Triceps", "Core"],
    secondaryMuscles: ["Shoulders", "Obliques"],
    repType: "reps",
    shortDescription:
      "The full expression of horizontal pressing strength — one arm, full body tension, zero assistance.",
    instructions: [
      "Set feet wide for a stable base, non-working arm behind your back.",
      "Brace hard through the obliques to resist rotating toward the floor.",
      "Lower under control until your chest nears the floor.",
      "Press up explosively while keeping the hips square.",
    ],
    commonMistakes: [
      "Letting the torso rotate open instead of staying square to the floor.",
      "Attempting this before archer push-ups are strong and controlled.",
      "Sacrificing depth for rep count.",
    ],
    trainingRecommendation:
      "3-5 sets of 1-5 reps per side, 2x per week, as a low-rep strength skill, not a volume exercise.",
    progression: { easier: { slug: "archer-push-up", name: "Archer Push-Up" } },
  },

  // ---------------------------------------------------------------- Pull
  {
    slug: "ring-row",
    name: "Ring Row",
    category: "Pull",
    difficulty: "Beginner",
    equipment: ["Rings"],
    primaryMuscles: ["Back", "Lats"],
    secondaryMuscles: ["Biceps", "Core"],
    repType: "reps",
    shortDescription:
      "A horizontal pulling movement with the body at an angle — the entry point to vertical pulling.",
    instructions: [
      "Set rings at roughly hip height and lean back, arms extended, body straight.",
      "The steeper your body angle, the harder the row — start closer to vertical.",
      "Pull your chest to the rings, driving elbows back and down.",
      "Lower under control back to a full stretch.",
    ],
    commonMistakes: [
      "Letting the hips sag instead of keeping a straight body line.",
      "Pulling with the arms alone instead of driving the elbows back.",
      "Setting an angle so easy it stops being a challenge.",
    ],
    trainingRecommendation:
      "3-4 sets of 10-15 reps, 2-3x per week, increasing body angle as it gets easier.",
    progression: { harder: { slug: "pull-up", name: "Pull-Up" } },
  },
  {
    slug: "pull-up",
    name: "Pull-Up",
    category: "Pull",
    difficulty: "Intermediate",
    equipment: ["Pull-up Bar"],
    primaryMuscles: ["Lats", "Back"],
    secondaryMuscles: ["Biceps", "Forearms"],
    repType: "reps",
    shortDescription:
      "The benchmark vertical pull — overhand grip, full hang to chin over the bar.",
    instructions: [
      "Hang from the bar with an overhand grip, slightly wider than shoulders.",
      "Start from a full dead hang to use the complete range of motion.",
      "Pull your chin over the bar by driving the elbows down and back.",
      "Lower with control back to a full hang — don't drop.",
    ],
    commonMistakes: [
      "Kipping or swinging to generate momentum instead of pulling strictly.",
      "Only doing the top half of the movement from a bent-arm start.",
      "Shrugging the shoulders up toward the ears under load.",
    ],
    trainingRecommendation:
      "3-5 sets of 5-10 reps, 2-3x per week. Build toward this with Ring Rows if a strict rep isn't yet possible.",
    progression: {
      easier: { slug: "ring-row", name: "Ring Row" },
      harder: { slug: "archer-pull-up", name: "Archer Pull-Up" },
    },
  },
  {
    slug: "chin-up",
    name: "Chin-Up",
    category: "Pull",
    difficulty: "Intermediate",
    equipment: ["Pull-up Bar"],
    primaryMuscles: ["Lats", "Biceps"],
    secondaryMuscles: ["Back", "Forearms"],
    repType: "reps",
    shortDescription:
      "An underhand-grip pull-up variation that recruits more biceps for a similar overall stimulus.",
    instructions: [
      "Hang from the bar with an underhand (supinated) grip, hands shoulder-width.",
      "Start from a full dead hang.",
      "Pull your chin over the bar, keeping elbows close to your torso.",
      "Lower under control to a full hang.",
    ],
    commonMistakes: [
      "Using a grip so narrow it becomes wrist-dominant rather than back-dominant.",
      "Cutting the range of motion short at the bottom.",
      "Relying on momentum instead of a controlled pull.",
    ],
    trainingRecommendation:
      "3-5 sets of 5-10 reps, 2-3x per week. Alternate with Pull-Ups across the week for balanced grip work.",
    progression: {
      easier: { slug: "ring-row", name: "Ring Row" },
      harder: { slug: "pull-up", name: "Pull-Up" },
    },
  },
  {
    slug: "archer-pull-up",
    name: "Archer Pull-Up",
    category: "Pull",
    difficulty: "Advanced",
    equipment: ["Pull-up Bar"],
    primaryMuscles: ["Lats", "Back"],
    secondaryMuscles: ["Biceps", "Core"],
    repType: "reps",
    shortDescription:
      "A wide-grip pull-up that pulls the body toward one hand at a time, loading that side heavily.",
    instructions: [
      "Use a grip noticeably wider than shoulder-width.",
      "Pull up and across, driving your chin toward one hand.",
      "Let the opposite arm stay mostly extended, acting as a guide.",
      "Lower fully and alternate sides.",
    ],
    commonMistakes: [
      "Doing most of the work with the 'guide' arm instead of the working side.",
      "Not reaching full extension on the working arm between reps.",
      "Attempting this before strict pull-ups are strong and controlled.",
    ],
    trainingRecommendation:
      "3-5 sets of 3-6 reps per side, 2x per week, once strict pull-ups exceed 8-10 clean reps.",
    progression: {
      easier: { slug: "pull-up", name: "Pull-Up" },
      harder: { slug: "one-arm-pull-up", name: "One-Arm Pull-Up" },
    },
  },
  {
    slug: "one-arm-pull-up",
    name: "One-Arm Pull-Up",
    category: "Pull",
    difficulty: "Elite",
    equipment: ["Pull-up Bar"],
    primaryMuscles: ["Lats", "Back", "Forearms"],
    secondaryMuscles: ["Biceps", "Core", "Obliques"],
    repType: "reps",
    shortDescription:
      "The rarest calisthenics pulling feat — a single arm lifting the entire bodyweight to the bar.",
    instructions: [
      "Hang from the bar on one arm, the other hand may lightly assist at the wrist early on.",
      "Brace the core hard to resist body rotation.",
      "Pull with a slight lean, driving the elbow down and back.",
      "Lower under control — the eccentric is where most people build this skill.",
    ],
    commonMistakes: [
      "Skipping years of archer pull-up and eccentric work to rush this.",
      "Letting the body spin instead of staying braced and controlled.",
      "Training it fatigued, when form breaks down fastest.",
    ],
    trainingRecommendation:
      "Low-rep, high-focus work: 3-5 sets of 1-3 reps (or slow negatives) per side, 1-2x per week.",
    progression: { easier: { slug: "archer-pull-up", name: "Archer Pull-Up" } },
  },

  // ---------------------------------------------------------------- Legs
  {
    slug: "bodyweight-squat",
    name: "Bodyweight Squat",
    category: "Legs",
    difficulty: "Beginner",
    equipment: ["None"],
    primaryMuscles: ["Quads", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Core"],
    repType: "reps",
    shortDescription:
      "The foundational lower-body movement pattern — hips and knees bending together under control.",
    instructions: [
      "Stand with feet shoulder-width, toes turned slightly out.",
      "Push your hips back and bend your knees to descend, keeping your chest up.",
      "Go as low as mobility allows while keeping your heels on the floor.",
      "Drive through the whole foot to stand back up.",
    ],
    commonMistakes: [
      "Letting the knees cave inward on the way up.",
      "Rounding the lower back at the bottom of the squat.",
      "Rising onto the toes instead of keeping heels grounded.",
    ],
    trainingRecommendation:
      "3-4 sets of 15-25 reps, 2-3x per week, as a warm-up movement or standalone volume work.",
    progression: { harder: { slug: "bulgarian-split-squat", name: "Bulgarian Split Squat" } },
  },
  {
    slug: "lunge",
    name: "Lunge",
    category: "Legs",
    difficulty: "Beginner",
    equipment: ["None"],
    primaryMuscles: ["Quads", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Calves"],
    repType: "reps",
    shortDescription:
      "A single-leg-dominant step pattern that builds balance alongside strength.",
    instructions: [
      "Step forward into a long stride, lowering the back knee toward the floor.",
      "Keep your front shin close to vertical, weight through the front heel.",
      "Push back to standing through the front leg.",
      "Alternate legs each rep, or complete all reps on one side before switching.",
    ],
    commonMistakes: [
      "Letting the front knee travel far past the toes on every rep.",
      "Taking a stride so short balance becomes the limiting factor, not strength.",
      "Leaning the torso far forward instead of staying upright.",
    ],
    trainingRecommendation:
      "3 sets of 10-14 reps per leg, 2-3x per week, useful alongside squats for unilateral balance.",
    progression: { harder: { slug: "bulgarian-split-squat", name: "Bulgarian Split Squat" } },
  },
  {
    slug: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    category: "Legs",
    difficulty: "Intermediate",
    equipment: ["Bench"],
    primaryMuscles: ["Quads", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Core"],
    repType: "reps",
    shortDescription:
      "A rear-foot-elevated split squat that meaningfully increases single-leg demand over a standard lunge.",
    instructions: [
      "Rest the top of one foot on a bench behind you, most of your weight on the front leg.",
      "Lower straight down until the back knee nearly touches the floor.",
      "Keep the front shin close to vertical throughout.",
      "Drive up through the front heel to standing.",
    ],
    commonMistakes: [
      "Placing the front foot too close to the bench, overloading the knee.",
      "Letting the back leg do meaningful work instead of just balancing.",
      "Losing control on the descent instead of lowering smoothly.",
    ],
    trainingRecommendation:
      "3-4 sets of 8-12 reps per leg, 2x per week, once bodyweight squats and lunges feel easy.",
    progression: {
      easier: { slug: "bodyweight-squat", name: "Bodyweight Squat" },
      harder: { slug: "pistol-squat", name: "Pistol Squat" },
    },
  },
  {
    slug: "pistol-squat",
    name: "Pistol Squat",
    category: "Legs",
    difficulty: "Advanced",
    equipment: ["None"],
    primaryMuscles: ["Quads", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Core", "Calves"],
    repType: "reps",
    shortDescription:
      "A full single-leg squat to depth, with the non-working leg held extended in front of you.",
    instructions: [
      "Stand on one leg, extending the other leg forward off the floor.",
      "Push your hips back and lower under control, arms out front for balance.",
      "Descend as far as mobility allows, ideally to full depth.",
      "Drive through the standing heel back up to full extension.",
    ],
    commonMistakes: [
      "Letting the standing heel lift off the floor near the bottom.",
      "Rushing the descent instead of controlling it the whole way down.",
      "Attempting this before ankle and hip mobility can support full depth.",
    ],
    trainingRecommendation:
      "3-4 sets of 4-8 reps per leg, 2x per week, supplemented with mobility work for the standing ankle.",
    progression: { easier: { slug: "bulgarian-split-squat", name: "Bulgarian Split Squat" } },
  },

  // ---------------------------------------------------------------- Core
  {
    slug: "plank",
    name: "Plank",
    category: "Core",
    difficulty: "Beginner",
    equipment: ["None"],
    primaryMuscles: ["Core"],
    secondaryMuscles: ["Shoulders", "Glutes"],
    repType: "hold",
    shortDescription:
      "A static hold that builds the baseline core bracing used in almost every other movement.",
    instructions: [
      "Set forearms on the floor, elbows under shoulders.",
      "Extend your legs back, body in a straight line from head to heels.",
      "Squeeze your glutes and brace your abs as if expecting a light punch.",
      "Hold the position without letting the hips rise or sag.",
    ],
    commonMistakes: [
      "Letting the hips sag toward the floor as fatigue sets in.",
      "Piking the hips up to relieve tension instead of holding the line.",
      "Holding the breath instead of breathing steadily through the hold.",
    ],
    trainingRecommendation:
      "3-4 sets of 30-60 second holds, 3x per week, as a warm-up or finisher.",
    progression: { harder: { slug: "hollow-hold", name: "Hollow Hold" } },
  },
  {
    slug: "hollow-hold",
    name: "Hollow Hold",
    category: "Core",
    difficulty: "Intermediate",
    equipment: ["None"],
    primaryMuscles: ["Core"],
    secondaryMuscles: ["Hamstrings", "Shoulders"],
    repType: "hold",
    shortDescription:
      "A gymnastics staple that trains the whole-body tension underlying handstands, levers, and L-sits.",
    instructions: [
      "Lie on your back, arms extended overhead, legs straight.",
      "Press your lower back into the floor and lift shoulders and legs a few inches up.",
      "Keep the body in a gentle 'banana' curve — no bend at the hips.",
      "Hold, keeping the lower back pinned down the entire time.",
    ],
    commonMistakes: [
      "Letting the lower back arch off the floor.",
      "Lifting the legs so high the hip angle closes and it stops being a hollow.",
      "Choosing a lever length (arms/legs position) that's too hard to hold with good form.",
    ],
    trainingRecommendation:
      "3-4 sets of 20-40 second holds, 2-3x per week, regressing arm/leg position as needed to protect form.",
    progression: {
      easier: { slug: "plank", name: "Plank" },
      harder: { slug: "l-sit", name: "L-Sit" },
    },
  },
  {
    slug: "l-sit",
    name: "L-Sit",
    category: "Skills",
    difficulty: "Advanced",
    equipment: ["Parallettes"],
    primaryMuscles: ["Core", "Hamstrings"],
    secondaryMuscles: ["Triceps", "Shoulders"],
    repType: "hold",
    shortDescription:
      "A compression hold with the legs extended in front at hip height — as much a strength skill as a flexibility one.",
    instructions: [
      "Support your body on parallettes or the floor, arms straight, shoulders down.",
      "Lift both legs straight out in front of you to hip height.",
      "Keep the lower back flat, not arched, and point the toes.",
      "Hold, breathing steadily rather than bracing against your breath.",
    ],
    commonMistakes: [
      "Shrugging the shoulders up toward the ears under load.",
      "Bending the knees to make the hold easier, which trains a different pattern.",
      "Rounding the upper back to compensate for tight hamstrings.",
    ],
    trainingRecommendation:
      "3-5 sets of 10-20 second holds, 2-3x per week. Tuck the knees as a regression if a full L-sit isn't there yet.",
    progression: {
      easier: { slug: "hollow-hold", name: "Hollow Hold" },
      harder: { slug: "v-sit", name: "V-Sit" },
    },
  },
  {
    slug: "v-sit",
    name: "V-Sit",
    category: "Skills",
    difficulty: "Elite",
    equipment: ["Parallettes"],
    primaryMuscles: ["Core", "Hamstrings"],
    secondaryMuscles: ["Triceps", "Shoulders"],
    repType: "hold",
    shortDescription:
      "The L-sit taken further — legs raised well above horizontal, demanding serious hip flexor and hamstring strength.",
    instructions: [
      "Start from a supported L-sit position on parallettes or the floor.",
      "Raise your legs above the horizontal line toward a 'V' shape with your torso.",
      "Keep the lower back flat and the chest lifted, not collapsing forward.",
      "Hold, then lower with control back to an L-sit.",
    ],
    commonMistakes: [
      "Collapsing the chest forward to compensate for tight hamstrings.",
      "Bending the knees under fatigue instead of ending the set.",
      "Skipping straight here without a solid L-sit foundation first.",
    ],
    trainingRecommendation:
      "3-5 sets of 5-15 second holds, 2x per week, treated as a low-frequency strength skill.",
    progression: { easier: { slug: "l-sit", name: "L-Sit" } },
  },

  // -------------------------------------------------------------- Skills
  {
    slug: "bench-dip",
    name: "Bench Dip",
    category: "Skills",
    difficulty: "Beginner",
    equipment: ["Bench"],
    primaryMuscles: ["Triceps"],
    secondaryMuscles: ["Chest", "Shoulders"],
    repType: "reps",
    shortDescription:
      "A feet-forward dip variation using a bench for support — the gentlest entry point to dipping.",
    instructions: [
      "Sit on the edge of a bench, hands next to your hips, fingers forward.",
      "Walk your feet out and lift your hips off the bench.",
      "Lower by bending the elbows straight back, not out to the sides.",
      "Press back up to full elbow lockout.",
    ],
    commonMistakes: [
      "Letting the elbows flare out, stressing the shoulder joint.",
      "Shrugging the shoulders up toward the ears.",
      "Only doing partial-depth reps.",
    ],
    trainingRecommendation:
      "3 sets of 10-15 reps, 2-3x per week, as prep for parallel bar dips.",
    progression: { harder: { slug: "parallel-bar-dip", name: "Parallel Bar Dip" } },
  },
  {
    slug: "parallel-bar-dip",
    name: "Parallel Bar Dip",
    category: "Push",
    difficulty: "Intermediate",
    equipment: ["Dip Bars"],
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Shoulders", "Core"],
    repType: "reps",
    shortDescription:
      "A full-bodyweight vertical press between parallel bars, hitting the chest and triceps hard.",
    instructions: [
      "Support yourself on the bars, arms straight, shoulders down and back.",
      "Lean slightly forward and lower until your shoulders dip just below your elbows.",
      "Keep the elbows tracking back, not flared wide.",
      "Press back up to full lockout.",
    ],
    commonMistakes: [
      "Only lowering a few inches instead of reaching proper depth.",
      "Letting the shoulders roll forward and up under fatigue.",
      "Kipping with the legs to assist the press.",
    ],
    trainingRecommendation:
      "3-4 sets of 8-15 reps, 2-3x per week, once bench dips are comfortable for 15+ reps.",
    progression: {
      easier: { slug: "bench-dip", name: "Bench Dip" },
      harder: { slug: "ring-dip", name: "Ring Dip" },
    },
  },
  {
    slug: "ring-dip",
    name: "Ring Dip",
    category: "Skills",
    difficulty: "Advanced",
    equipment: ["Rings"],
    primaryMuscles: ["Chest", "Triceps"],
    secondaryMuscles: ["Shoulders", "Core"],
    repType: "reps",
    shortDescription:
      "A parallel bar dip performed on unstable rings — the stabilizer demand alone is most people's limiting factor.",
    instructions: [
      "Support yourself on the rings, turning them out slightly for shoulder comfort.",
      "Keep the rings close to your body throughout the movement.",
      "Lower under full control until shoulders dip below elbow height.",
      "Press back up while actively resisting the rings swinging or turning.",
    ],
    commonMistakes: [
      "Letting the rings drift out to the sides, which the shoulders pay for.",
      "Rushing the descent instead of controlling the unstable path down.",
      "Attempting this before parallel bar dips are strong and stable.",
    ],
    trainingRecommendation:
      "3-4 sets of 5-10 reps, 2x per week, once parallel bar dips exceed 12-15 clean reps.",
    progression: { easier: { slug: "parallel-bar-dip", name: "Parallel Bar Dip" } },
  },
];

export function getExerciseBySlug(slug: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.slug === slug);
}

export function getExercisesByCategory(category: ExerciseCategory): Exercise[] {
  return exercises.filter((exercise) => exercise.category === category);
}
