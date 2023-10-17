import os
import sys

# Add the project directory to the sys.path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.append(project_root)

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Bobo.settings')

# Configure Django settings
import django
django.setup()

from milestones.models import Activity

data = [
  {
    "month": 0,
    "activities": [
      {
        "id": 1,
        "title": "Gentle Touch",
        "description": "Place your baby on a soft surface and gently stroke their arms, legs, and back using slow and soothing motions. This activity helps to enhance your baby's sense of touch and promotes relaxation.",
        "imageUrls": []
      },
      {
        "id": 2,
        "title": "Tummy Time",
        "description": "Place your baby on their tummy for short periods of time (about 2-5 minutes) while they are awake and alert. This helps to strengthen their neck, back, and shoulder muscles, and prepares them for rolling and crawling in the future.",
        "imageUrls": []
      },
      {
        "id": 3,
        "title": "Eye Contact and Smiling",
        "description": "Sit or lie face-to-face with your baby and make eye contact. Smile and talk to them using a soothing and melodic tone. This helps to develop their social and emotional connection with you and encourages them to respond to your facial expressions.",
        "imageUrls": []
      },
      {
        "id": 4,
        "title": "Singing and Gentle Music",
        "description": "Sing lullabies or soft songs to your baby, or play gentle music in the background. Music can have a calming effect on babies and promote their auditory development.",
        "imageUrls": []
      },
      {
        "id": 5,
        "title": "Baby Massage",
        "description": "Gently massage your baby's arms, legs, and back using baby-safe oil. This activity promotes relaxation, enhances circulation, and provides a soothing sensory experience.",
        "imageUrls": []
      },
      {
        "id": 6,
        "title": "Baby Gym",
        "description": "Place your baby on a soft mat or blanket and surround them with colorful toys and objects. This encourages them to look around, reach out, and eventually grasp objects, promoting their visual and motor skills.",
        "imageUrls": []
      },
      {
        "id": 7,
        "title": "Story Time",
        "description": "Read simple board books or picture books to your baby. Choose books with high contrast images or simple patterns to capture their attention. Although they may not understand the words, they will benefit from hearing your voice and seeing the pictures.",
        "imageUrls": []
      },
      {
        "id": 8,
        "title": "Face-to-Face Interaction",
        "description": "Sit or lie down with your baby and engage in face-to-face interactions. Stick out your tongue, make funny faces, or gently blow on their belly. This helps to develop their visual tracking skills and promotes bonding.",
        "imageUrls": []
      },
      {
        "id": 9,
        "title": "Sensory Play",
        "description": "Provide your baby with a variety of safe and age-appropriate sensory toys such as soft textured toys, rattles, or crinkly toys. Let them explore the different textures, sounds, and colors, which stimulates their senses and encourages grasping and reaching.",
        "imageUrls": []
      },
      {
        "id": 10,
        "title": "Baby Wearing",
        "description": "Use a baby carrier or sling to keep your baby close to you while you go about your daily activities. The gentle movements and closeness to your body provide comfort and security while promoting bonding.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 1,
    "activities": [
      {
        "id": 11,
        "title": "Tummy Time",
        "description": "Place your baby on their tummy for short periods (a few minutes at a time) to strengthen their neck and shoulder muscles. Always supervise them during tummy time.",
        "imageUrls": []
      },
      {
        "id": 12,
        "title": "Gentle Massage",
        "description": "Use gentle strokes and light pressure to massage your baby's arms, legs, and back. This can help with relaxation and improve circulation.",
        "imageUrls": []
      },
      {
        "id": 13,
        "title": "Singing and Talking",
        "description": "Sing lullabies, nursery rhymes, or talk to your baby in soothing tones. This aids in language development and creates a bonding experience.",
        "imageUrls": []
      },
      {
        "id": 14,
        "title": "High-Contrast Visuals",
        "description": "Show your baby black and white patterns or high-contrast images. Their visual system is still developing, and these visuals can help stimulate their visual perception.",
        "imageUrls": []
      },
      {
        "id": 15,
        "title": "Sensory Play",
        "description": "Introduce different textures by gently rubbing a soft cloth, feather, or sponge on your baby's skin. This helps them explore their sense of touch.",
        "imageUrls": []
      },
      {
        "id": 16,
        "title": "Gentle Swinging",
        "description": "Cradle your baby in your arms and gently sway them back and forth. This motion can be calming and comforting for them.",
        "imageUrls": []
      },
      {
        "id": 17,
        "title": "Baby Gym",
        "description": "Use a baby gym or create one with toys and objects suspended above your baby. This encourages them to reach and bat at the toys, promoting motor skills and hand-eye coordination.",
        "imageUrls": []
      },
      {
        "id": 18,
        "title": "Face-to-Face Interaction",
        "description": "Make eye contact with your baby, smile, and talk to them. Babies are naturally drawn to human faces, and this interaction helps in their social and emotional development.",
        "imageUrls": []
      },
      {
        "id": 19,
        "title": "Baby Bouncer",
        "description": "Place your baby in a safe baby bouncer or a swing with appropriate support. The gentle bouncing motion can be entertaining and provide a change of scenery.",
        "imageUrls": []
      },
      {
        "id": 20,
        "title": "Cuddle and Coo",
        "description": "Spend quality time cuddling, holding, and talking softly to your baby. This helps them feel secure and loved.",
        "imageUrls": []
      }
    ]
  },
{
  "month": 2,
  "activities": [
    {
      "id": 279,
      "title": "New Activity 1",
      "description": "This is a new activity for month 2.",
      "imageUrls": []
    },
    {
      "id": 280,
      "title": "New Activity 2",
      "description": "This is another new activity for month 2.",
      "imageUrls": []
    },
    {
      "id": 281,
      "title": "New Activity 3",
      "description": "Engage your baby with interactive toys and games.",
      "imageUrls": []
    },
    {
      "id": 282,
      "title": "New Activity 4",
      "description": "Introduce your baby to different sounds and musical toys.",
      "imageUrls": []
    },
    {
      "id": 283,
      "title": "New Activity 5",
      "description": "Encourage your baby to explore different textures with sensory toys.",
      "imageUrls": []
    },
    {
      "id": 284,
      "title": "New Activity 6",
      "description": "Create a safe play area for your baby with soft mats and cushions.",
      "imageUrls": []
    },
    {
      "id": 285,
      "title": "New Activity 7",
      "description": "Play peek-a-boo with your baby using a soft cloth or blanket.",
      "imageUrls": []
    },
    {
      "id": 286,
      "title": "New Activity 8",
      "description": "Introduce your baby to simple puzzles and shape sorters.",
      "imageUrls": []
    },
    {
      "id": 287,
      "title": "New Activity 9",
      "description": "Engage your baby in water play with a shallow tub or basin.",
      "imageUrls": []
    },
    {
      "id": 288,
      "title": "New Activity 10",
      "description": "Encourage your baby to explore their surroundings with supervised crawling or scooting.",
      "imageUrls": []
    }
  ]
}
,
  {
    "month": 3,
    "activities": [
      {
        "id": 31,
        "title": "Tummy Time",
        "description": "Place your baby on their tummy for short periods several times a day. This helps strengthen their neck, back, and shoulder muscles and promotes motor development.",
        "imageUrls": []
      },
      {
        "id": 32,
        "title": "High-Contrast Cards",
        "description": "Use black and white cards or toys with high-contrast patterns to stimulate your baby's vision. Hold them up close and slowly move them side to side.",
        "imageUrls": []
      },
      {
        "id": 33,
        "title": "Sensory Play",
        "description": "Provide your baby with textured toys, such as rattles or soft fabrics with different textures. Let them explore the different sensations through touch.",
        "imageUrls": []
      },
      {
        "id": 34,
        "title": "Baby Gym",
        "description": "Set up a baby gym with hanging toys and mirrors. This encourages reaching, batting, and grasping movements, enhancing hand-eye coordination.",
        "imageUrls": []
      },
      {
        "id": 35,
        "title": "Singing and Nursery Rhymes",
        "description": "Sing lullabies, nursery rhymes, and simple songs to your baby. This aids language development, rhythm perception, and bonding.",
        "imageUrls": []
      },
      {
        "id": 36,
        "title": "Mirror Play",
        "description": "Hold your baby in front of a mirror and make funny faces or imitate their facial expressions. This helps develop self-awareness and social skills.",
        "imageUrls": []
      },
      {
        "id": 37,
        "title": "Baby Massage",
        "description": "Gently massage your baby's limbs using baby-safe oil. This promotes relaxation, stimulates circulation, and strengthens the caregiver-baby bond.",
        "imageUrls": []
      },
      {
        "id": 38,
        "title": "Listening to Music",
        "description": "Play soft, calming music or instrumental melodies to soothe and entertain your baby. This can help with auditory stimulation and emotional development.",
        "imageUrls": []
      },
      {
        "id": 39,
        "title": "Puppet Shows",
        "description": "Use soft puppets or stuffed animals to create simple puppet shows. Move them slowly and make gentle sounds to captivate your baby's attention and encourage visual tracking.",
        "imageUrls": []
      },
      {
        "id": 40,
        "title": "Baby Books",
        "description": "Introduce board books with large, colorful pictures and textures. Read to your baby, pointing out objects and using different voices to engage their senses and language skills.",
        "imageUrls": []
      },
      {
        "id": 41,
        "title": "Baby Yoga",
        "description": "Explore gentle stretches and movements with your baby, such as leg cycling or gentle twists. This can enhance flexibility, body awareness, and bonding.",
        "imageUrls": []
      },
      {
        "id": 42,
        "title": "Water Play",
        "description": "Fill a small baby tub with warm water (a few inches deep) and let your baby splash and kick their legs. Always supervise closely and ensure water temperature is safe.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 4,
    "activities": [
      {
        "id": 43,
        "title": "Tummy Time",
        "description": "Place your baby on their tummy on a soft mat or blanket for short periods, gradually increasing the duration. This helps strengthen their neck, shoulder, and arm muscles, promoting head control and preparing them for rolling and crawling.",
        "imageUrls": []
      },
      {
        "id": 44,
        "title": "Sensory Play",
        "description": "Fill a shallow container with various textures, such as fabric swatches, soft toys, and textured balls. Encourage your baby to explore the objects with their hands and mouth, stimulating their senses and developing their fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 45,
        "title": "Mirror Play",
        "description": "Sit in front of a baby-safe mirror with your little one. Make funny faces, smile, and talk to them while pointing at their reflection. This activity promotes self-awareness and encourages social interaction.",
        "imageUrls": []
      },
      {
        "id": 46,
        "title": "Rattle Time",
        "description": "Offer your baby a colorful rattle or a toy that makes noise. Shake it gently and let them grasp it. This helps improve hand-eye coordination and introduces cause-and-effect relationships.",
        "imageUrls": []
      },
      {
        "id": 47,
        "title": "Baby Massage",
        "description": "Use baby-safe oil or lotion to gently massage your baby's arms, legs, and back. This promotes bonding, relaxation, and body awareness.",
        "imageUrls": []
      },
      {
        "id": 48,
        "title": "Singing and Rhymes",
        "description": "Sing lullabies or nursery rhymes to your baby. Use gestures and facial expressions to engage them in the songs. This activity enhances language development, rhythm perception, and emotional bonding.",
        "imageUrls": []
      },
      {
        "id": 49,
        "title": "Texture Exploration",
        "description": "Provide your baby with a variety of safe objects with different textures, such as a soft cloth, a smooth plastic toy, or a rubber ball. Allow them to touch and explore the objects, aiding their sensory development.",
        "imageUrls": []
      },
      {
        "id": 50,
        "title": "Story Time",
        "description": "Choose colorful and interactive board books for babies. Read aloud to your little one, pointing at the pictures and using different voices for different characters. This helps develop language skills and fosters a love for books.",
        "imageUrls": []
      },
      {
        "id": 51,
        "title": "Dancing Together",
        "description": "Hold your baby securely and sway gently to music. Dance around the room, singing along or humming tunes. This activity promotes body awareness, rhythm perception, and emotional bonding.",
        "imageUrls": []
      },
      {
        "id": 52,
        "title": "Baby Gym",
        "description": "Set up a baby gym with hanging toys and a soft mat. Encourage your baby to reach, grasp, and bat at the toys, enhancing their gross and fine motor skills.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 5,
    "activities": [
      {
        "id": 53,
        "title": "Tummy Time",
        "description": "Place your baby on their tummy for short periods while they are awake and supervised. This activity helps strengthen their neck and shoulder muscles, promotes motor skills development, and prepares them for crawling.",
        "imageUrls": []
      },
      {
        "id": 54,
        "title": "Sensory Play",
        "description": "Provide your baby with sensory experiences such as soft toys, textured objects, or different fabrics to explore. Let them touch, feel, and experience different sensations, which helps develop their sensory perception and fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 55,
        "title": "Mirror Play",
        "description": "Hold a mirror in front of your baby and let them observe themselves. They will enjoy looking at their reflection, which helps develop their self-awareness and visual tracking skills.",
        "imageUrls": []
      },
      {
        "id": 56,
        "title": "Singing and Nursery Rhymes",
        "description": "Sing songs and recite nursery rhymes to your baby. The rhythm, melody, and repetition help stimulate their language development, cognitive skills, and emotional bonding.",
        "imageUrls": []
      },
      {
        "id": 57,
        "title": "Reading",
        "description": "Read age-appropriate books with simple pictures and large, colorful illustrations to your baby. Point out objects and make sounds to engage their attention and develop their cognitive and language skills.",
        "imageUrls": []
      },
      {
        "id": 58,
        "title": "Baby Gym",
        "description": "Set up a baby gym or playmat with hanging toys and objects that your baby can reach out to and interact with. This helps improve their hand-eye coordination, grasping skills, and overall physical development.",
        "imageUrls": []
      },
      {
        "id": 59,
        "title": "Peekaboo",
        "description": "Play peekaboo with your baby by hiding your face behind your hands or a blanket and then revealing it with a big smile. This game promotes social interaction, object permanence, and emotional bonding.",
        "imageUrls": []
      },
      {
        "id": 60,
        "title": "Baby Massage",
        "description": "Gently massage your baby's arms, legs, back, and tummy using baby-safe oil. This soothing activity helps relax your baby, enhances their sensory awareness, and improves their circulation.",
        "imageUrls": []
      },
      {
        "id": 61,
        "title": "Musical Toys",
        "description": "Provide your baby with toys that produce sounds, such as rattles, musical instruments, or toys with buttons to press. This encourages their sensory exploration, hand-eye coordination, and auditory development.",
        "imageUrls": []
      },
      {
        "id": 62,
        "title": "Baby Sign Language",
        "description": "Introduce simple gestures or signs for common words like \"milk,\" \"eat,\" or \"more.\" This helps your baby communicate before they can speak and enhances their language development and comprehension.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 6,
    "activities": [
      {
        "id": 63,
        "title": "Tummy Time",
        "description": "Place your baby on their tummy for short periods while they are awake and supervised. This helps strengthen their neck and upper body muscles, promoting head control and preparing them for crawling.",
        "imageUrls": []
      },
      {
        "id": 64,
        "title": "Sensory Play",
        "description": "Create a sensory bin by filling a shallow container with a variety of safe objects with different textures, such as soft fabric, plastic balls, or textured toys. Allow your baby to explore and touch the items, stimulating their senses and enhancing their cognitive development.",
        "imageUrls": []
      },
      {
        "id": 65,
        "title": "Mirror Play",
        "description": "Position a baby-safe mirror at your baby's eye level and encourage them to look at themselves. This activity promotes self-recognition, social interaction, and visual tracking skills.",
        "imageUrls": []
      },
      {
        "id": 66,
        "title": "Baby Gym",
        "description": "Set up a baby gym with hanging toys and objects that your baby can reach for and bat at. This helps improve their hand-eye coordination, motor skills, and grasping abilities.",
        "imageUrls": []
      },
      {
        "id": 67,
        "title": "Peek-a-Boo",
        "description": "Play the classic game of peek-a-boo with your baby, using a blanket or your hands to cover and uncover your face. This activity enhances their understanding of object permanence and builds anticipation.",
        "imageUrls": []
      },
      {
        "id": 68,
        "title": "Reading Books",
        "description": "Choose age-appropriate board books with colorful pictures and simple text. Read aloud to your baby, pointing at the pictures and engaging them in the story. This promotes language development and introduces them to the joy of reading.",
        "imageUrls": []
      },
      {
        "id": 69,
        "title": "Music and Movement",
        "description": "Play soft music and gently dance or sway with your baby in your arms. You can also provide age-appropriate musical toys for your baby to explore, promoting their auditory senses and coordination.",
        "imageUrls": []
      },
      {
        "id": 70,
        "title": "Baby Sign Language",
        "description": "Introduce simple sign language gestures like 'more,' 'milk,' or 'eat' during daily routines. This can help facilitate early communication and reduce frustration when they are unable to verbalize their needs.",
        "imageUrls": []
      },
      {
        "id": 71,
        "title": "Texture Exploration",
        "description": "Offer various safe and soft objects with different textures for your baby to explore through touch, such as fabrics, textured toys, or household items like a soft brush or sponge. This helps stimulate their tactile senses and encourages sensory development.",
        "imageUrls": []
      },
      {
        "id": 72,
        "title": "Water Play",
        "description": "Fill a shallow basin or bathtub with a few inches of water and allow your baby to splash and play with safe water toys. Supervise them closely and ensure the water is at a suitable temperature. Water play promotes sensory exploration, hand-eye coordination, and provides a soothing experience.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 7,
    "activities": [
      {
        "id": 73,
        "title": "Crawling Obstacle Course",
        "description": "Create a safe crawling area by arranging soft pillows, cushions, and tunnels. Encourage your baby to navigate through the course, which helps develop their gross motor skills, coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 74,
        "title": "Sensory Bags",
        "description": "Fill sealable plastic bags with various sensory materials such as colored gel, water beads, or cooked pasta. Seal the bags tightly and let your baby squish and explore the different textures. This activity stimulates their tactile senses and promotes sensory integration.",
        "imageUrls": []
      },
      {
        "id": 75,
        "title": "Ball Rolling",
        "description": "Sit facing your baby and gently roll a soft ball back and forth between the two of you. This activity enhances their hand-eye coordination, tracking skills, and promotes social interaction.",
        "imageUrls": []
      },
      {
        "id": 76,
        "title": "Banging and Stacking",
        "description": "Offer safe toys that can be banged together or stacked. Encourage your baby to explore different ways of playing with them, such as hitting them, stacking them, or knocking them down. This promotes fine motor skills, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 77,
        "title": "Nursery Rhymes and Fingerplays",
        "description": "Sing nursery rhymes or perform fingerplays like 'This Little Piggy' or 'Itsy Bitsy Spider' with accompanying hand movements. This activity supports language development, rhythm awareness, and fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 78,
        "title": "Introduction to Solid Foods",
        "description": "Consult with your pediatrician and introduce appropriate solid foods to your baby's diet, such as mashed fruits and vegetables. Encourage self-feeding with safe utensils or baby-friendly finger foods. This promotes sensory exploration, hand-eye coordination, and fosters independence.",
        "imageUrls": []
      },
      {
        "id": 79,
        "title": "Mirror Play with Props",
        "description": "Sit in front of a mirror with your baby and provide safe props such as hats, scarves, or soft toys. Encourage your baby to interact with their reflection and play with the props. This activity enhances self-recognition, social engagement, and fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 80,
        "title": "Rolling and Catching",
        "description": "Show your baby how to roll or toss a soft ball toward them. Encourage them to reach out and try to catch it. This activity promotes hand-eye coordination, visual tracking, and gross motor skills.",
        "imageUrls": []
      },
      {
        "id": 81,
        "title": "Baby Massage",
        "description": "Gently massage your baby's arms, legs, back, and tummy using baby-safe oil or lotion. This promotes bonding, relaxation, and sensory stimulation.",
        "imageUrls": []
      },
      {
        "id": 82,
        "title": "Water Play with Cups",
        "description": "Fill a basin or bathtub with a few inches of water and provide your baby with different-sized cups or containers to play with. Let them pour water from one container to another, encouraging hand-eye coordination, sensory exploration, and cause-and-effect understanding.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 8,
    "activities": [
      {
        "id": 83,
        "title": "Crawling Obstacle Course",
        "description": "Create a safe crawling course using pillows, soft play mats, and tunnels. Encourage your baby to crawl through and explore the course, which helps develop their motor skills, coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 84,
        "title": "Ball Roll",
        "description": "Sit facing your baby and roll a soft ball back and forth between you. This activity improves their hand-eye coordination, tracking skills, and encourages reaching and grasping.",
        "imageUrls": []
      },
      {
        "id": 85,
        "title": "Stack and Knock Down",
        "description": "Provide soft blocks or cups and show your baby how to stack them. Encourage them to knock down the towers, promoting fine motor skills, hand-eye coordination, and cause-and-effect understanding.",
        "imageUrls": []
      },
      {
        "id": 86,
        "title": "Baby Dance Party",
        "description": "Play lively music and dance with your baby, holding them in your arms or letting them stand with support. This activity enhances their gross motor skills, rhythm perception, and creates a joyful bonding experience.",
        "imageUrls": []
      },
      {
        "id": 87,
        "title": "Pat-a-Cake",
        "description": "Sing the \"Pat-a-Cake\" nursery rhyme while clapping your baby's hands together. This supports their fine motor skills, coordination, and introduces them to simple gestures and rhymes.",
        "imageUrls": []
      },
      {
        "id": 88,
        "title": "Object Hide and Seek",
        "description": "Hide a toy under a blanket or behind your back, then reveal it and encourage your baby to find it. This game promotes object permanence, problem-solving skills, and strengthens their cognitive development.",
        "imageUrls": []
      },
      {
        "id": 89,
        "title": "Exploration Basket",
        "description": "Fill a basket with safe objects of different textures, shapes, and sizes. Allow your baby to explore the items, encouraging sensory development, hand-eye coordination, and fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 90,
        "title": "Water Play with Cups",
        "description": "Provide a basin or bathtub filled with a few inches of water and offer your baby child-safe cups and containers to fill, pour, and stack. This activity promotes sensory exploration, hand-eye coordination, and understanding of volume concepts.",
        "imageUrls": []
      },
      {
        "id": 91,
        "title": "Baby Sign Language",
        "description": "Continue introducing new signs for common words such as \"drink,\" \"food,\" or \"play.\" Encourage your baby to imitate the signs and reinforce their early communication skills.",
        "imageUrls": []
      },
      {
        "id": 92,
        "title": "Shape Sorter",
        "description": "Introduce a shape sorter toy with simple shapes. Guide your baby in placing the shapes into the corresponding holes, enhancing their problem-solving skills, fine motor skills, and shape recognition.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 9,
    "activities": [
      {
        "id": 93,
        "title": "Crawling Obstacle Course",
        "description": "Create a safe crawling course using cushions, pillows, and soft tunnels. Encourage your baby to crawl through the course, promoting their motor skills, coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 94,
        "title": "Pincer Grasp Practice",
        "description": "Offer small, baby-safe objects like cereal pieces or soft blocks and encourage your baby to pick them up using their thumb and index finger. This activity helps develop their fine motor skills and pincer grasp.",
        "imageUrls": []
      },
      {
        "id": 95,
        "title": "Stacking and Nesting",
        "description": "Provide stacking cups or blocks that your baby can stack or nest inside one another. This enhances their hand-eye coordination, spatial awareness, and problem-solving abilities.",
        "imageUrls": []
      },
      {
        "id": 96,
        "title": "Ball Rolling",
        "description": "Place a soft ball in front of your baby and encourage them to roll it back and forth between the two of you. This activity promotes their hand-eye coordination, motor skills, and social interaction.",
        "imageUrls": []
      },
      {
        "id": 97,
        "title": "Mirror Play and Pointing",
        "description": "Sit in front of a mirror with your baby and point to various body parts while naming them. Encourage your baby to imitate you and point to their own body parts. This supports their self-awareness, language development, and fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 98,
        "title": "Sensory Bags",
        "description": "Fill a ziplock bag with colorful, textured materials like rice, gel, or soft fabric. Seal the bag tightly and let your baby explore the contents by squeezing, pressing, and feeling the textures. This stimulates their senses and encourages tactile exploration.",
        "imageUrls": []
      },
      {
        "id": 99,
        "title": "Shape Sorting",
        "description": "Provide a shape sorter toy with different shapes that fit into corresponding holes. Help your baby identify the shapes and guide them in placing them correctly. This activity enhances their cognitive skills, hand-eye coordination, and problem-solving abilities.",
        "imageUrls": []
      },
      {
        "id": 100,
        "title": "Water Play with Cups",
        "description": "Fill a basin with a small amount of water and offer your baby different-sized cups or containers to pour and fill. Supervise them closely and ensure a safe water temperature. This activity promotes hand-eye coordination, sensory exploration, and understanding of volume concepts.",
        "imageUrls": []
      },
      {
        "id": 101,
        "title": "Action Songs and Dancing",
        "description": "Play upbeat songs and engage in simple dance moves with your baby. Clap their hands, encourage them to stomp their feet, or wave their arms. This activity promotes gross motor skills, coordination, and rhythm.",
        "imageUrls": []
      },
      {
        "id": 102,
        "title": "Pat-a-Cake and Fingerplays",
        "description": "Sing nursery rhymes like \"Pat-a-Cake\" and engage your baby in fingerplays like \"This Little Piggy.\" This activity helps develop their finger dexterity, language skills, and introduces them to rhymes and rhythms.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 10,
    "activities": [
      {
        "id": 103,
        "title": "Crawling Obstacle Course",
        "description": "Create a safe and soft obstacle course using cushions, pillows, and tunnels. Encourage your baby to crawl through the course, promoting their motor skills, spatial awareness, and problem-solving abilities.",
        "imageUrls": []
      },
      {
        "id": 104,
        "title": "Stacking Blocks",
        "description": "Provide soft, lightweight blocks for your baby to stack and knock down. This activity improves hand-eye coordination, fine motor skills, and introduces basic concepts like cause and effect.",
        "imageUrls": []
      },
      {
        "id": 105,
        "title": "Shape Sorter",
        "description": "Offer a shape sorter toy with large, easy-to-grasp shapes. Encourage your baby to place the shapes through the corresponding holes, enhancing their hand-eye coordination, cognitive skills, and understanding of shapes.",
        "imageUrls": []
      },
      {
        "id": 106,
        "title": "Musical Instruments",
        "description": "Introduce your baby to age-appropriate musical instruments like maracas, drums, or a xylophone. Let them explore the sounds and encourage them to create their own music, stimulating their auditory senses and fostering creativity.",
        "imageUrls": []
      },
      {
        "id": 107,
        "title": "Ball Play",
        "description": "Provide soft and lightweight balls for your baby to roll, throw, and catch. This activity improves gross motor skills, hand-eye coordination, and introduces basic concepts like object manipulation and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 108,
        "title": "Water Play with Cups",
        "description": "Fill a basin or bathtub with a small amount of water and offer different-sized cups or containers. Show your baby how to pour and transfer water, promoting fine motor skills, sensory exploration, and understanding of volume concepts.",
        "imageUrls": []
      },
      {
        "id": 109,
        "title": "Puzzles",
        "description": "Offer simple puzzles with large knobs or pegs that your baby can manipulate and place in the correct slots. This activity enhances problem-solving skills, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 110,
        "title": "Pretend Play",
        "description": "Encourage imaginative play by providing your baby with safe props like toy phones, dolls, or kitchen utensils. Engage in pretend conversations or play-act daily routines, fostering language development, social skills, and creativity.",
        "imageUrls": []
      },
      {
        "id": 111,
        "title": "Dancing",
        "description": "Play lively music and dance together with your baby. Encourage them to move their body, clap their hands, or stomp their feet. This activity promotes gross motor skills, coordination, and rhythmic awareness.",
        "imageUrls": []
      },
      {
        "id": 112,
        "title": "Outdoor Exploration",
        "description": "Take your baby for walks in a stroller or let them explore a safe outdoor environment. Point out nature's sights and sounds, such as birds, flowers, or leaves, stimulating their senses, curiosity, and fostering a connection with the natural world.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 11,
    "activities": [
      {
        "id": 113,
        "title": "Crawling Obstacle Course",
        "description": "Create a safe crawling course using pillows, cushions, and tunnels. Encourage your baby to crawl through and explore the obstacles, which promotes gross motor skills, spatial awareness, and problem-solving.",
        "imageUrls": []
      },
      {
        "id": 114,
        "title": "Stacking Blocks",
        "description": "Provide soft, colorful blocks that your baby can stack and knock down. This activity helps improve hand-eye coordination, fine motor skills, and introduces the concept of cause and effect.",
        "imageUrls": []
      },
      {
        "id": 115,
        "title": "Ball Rolling",
        "description": "Sit on the floor facing your baby and roll a soft ball back and forth. This encourages their hand-eye coordination, tracking skills, and strengthens their arm muscles.",
        "imageUrls": []
      },
      {
        "id": 116,
        "title": "Shape Sorter",
        "description": "Offer a shape sorting toy with various shapes and corresponding holes. Help your baby place the shapes into the correct holes, fostering problem-solving skills, hand dexterity, and shape recognition.",
        "imageUrls": []
      },
      {
        "id": 117,
        "title": "Walking with Support",
        "description": "If your baby is starting to pull up and stand with support, encourage them to take steps while holding onto furniture or your hands. This promotes balance, leg strength, and prepares them for independent walking.",
        "imageUrls": []
      },
      {
        "id": 118,
        "title": "Outdoor Exploration",
        "description": "Take your baby outside for a nature walk or a trip to the park. Let them touch leaves, feel different textures, and observe their surroundings. This helps stimulate their senses, promotes curiosity, and encourages language development through describing what they see.",
        "imageUrls": []
      },
      {
        "id": 119,
        "title": "Finger Foods",
        "description": "Introduce finger foods appropriate for their age, such as small pieces of soft fruits, cooked vegetables, or small crackers. This activity supports their self-feeding skills, fine motor development, and encourages independence.",
        "imageUrls": []
      },
      {
        "id": 120,
        "title": "Nursery Rhymes and Songs",
        "description": "Sing and recite nursery rhymes or action songs with your baby. Use gestures and movements to engage them and encourage imitation. This supports language development, memory skills, and promotes social interaction.",
        "imageUrls": []
      },
      {
        "id": 121,
        "title": "Puzzles",
        "description": "Provide simple puzzles with large, chunky pieces that your baby can manipulate and fit into corresponding spaces. This activity enhances problem-solving skills, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 122,
        "title": "Water Play with Containers",
        "description": "Fill a basin or bathtub with water and offer various sized containers for your baby to pour and transfer water. Supervise closely to ensure water safety. Water play promotes fine motor skills, hand-eye coordination, and sensory exploration.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 12,
    "activities": [
      {
        "id": 123,
        "title": "Block Stacking",
        "description": "Provide large, soft building blocks and encourage your baby to stack them. This activity promotes fine motor skills, hand-eye coordination, and problem-solving abilities as they learn to balance and stack the blocks.",
        "imageUrls": []
      },
      {
        "id": 124,
        "title": "Shape Sorting",
        "description": "Introduce a shape sorter toy with different shapes that fit through corresponding holes. Encourage your baby to match the shapes to the correct holes, enhancing their cognitive skills, hand-eye coordination, and understanding of spatial relationships.",
        "imageUrls": []
      },
      {
        "id": 125,
        "title": "Crawling Obstacle Course",
        "description": "Set up a safe crawling course using pillows, cushions, and tunnels. This activity promotes gross motor skills, balance, coordination, and spatial awareness as your baby navigates through the obstacles.",
        "imageUrls": []
      },
      {
        "id": 126,
        "title": "Ball Rolling",
        "description": "Provide soft, lightweight balls and show your baby how to roll them back and forth. This helps improve their hand-eye coordination, gross motor skills, and social interaction as they engage in play with you.",
        "imageUrls": []
      },
      {
        "id": 127,
        "title": "Pretend Play",
        "description": "Offer age-appropriate pretend play toys like dolls, toy kitchen sets, or toy phones. Encourage your baby to engage in imaginative play, imitating everyday activities and developing their creativity and language skills.",
        "imageUrls": []
      },
      {
        "id": 128,
        "title": "Puzzles",
        "description": "Introduce simple puzzles with large, chunky pieces that your baby can manipulate and fit together. This activity supports fine motor skills, problem-solving abilities, and cognitive development as they learn to match shapes and complete the puzzles.",
        "imageUrls": []
      },
      {
        "id": 129,
        "title": "Water Play",
        "description": "Fill a basin or bathtub with water and provide cups, spoons, and containers for pouring and scooping. This sensory activity promotes fine motor skills, hand-eye coordination, and understanding of cause and effect.",
        "imageUrls": []
      },
      {
        "id": 130,
        "title": "Dancing and Singing",
        "description": "Play lively music and dance together with your baby. Sing songs, incorporate hand movements, and encourage your baby to imitate your actions. This activity enhances gross motor skills, rhythm, and language development.",
        "imageUrls": []
      },
      {
        "id": 131,
        "title": "Outdoor Exploration",
        "description": "Take your baby for supervised outdoor adventures to explore nature. Let them touch leaves, feel grass, and observe the environment. Outdoor exploration stimulates their senses, encourages physical activity, and introduces them to the natural world.",
        "imageUrls": []
      },
      {
        "id": 132,
        "title": "Building Forts",
        "description": "Create a fort or tent using blankets, pillows, and chairs. Encourage your baby to crawl inside and explore the space. This activity fosters imagination, spatial awareness, and sensory exploration.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 13,
    "activities": [
      {
        "id": 133,
        "title": "Walking Practice",
        "description": "Encourage your baby to walk independently by holding their hands or offering a push toy. Gradually reduce support as they gain confidence and balance, helping them strengthen their leg muscles and develop gross motor skills.",
        "imageUrls": []
      },
      {
        "id": 134,
        "title": "Stacking Blocks",
        "description": "Provide soft or lightweight blocks that your baby can stack and knock down. This activity promotes fine motor skills, hand-eye coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 135,
        "title": "Shape Sorters",
        "description": "Offer a shape sorter toy with various shapes and corresponding holes. Encourage your baby to place the shapes into the correct holes, promoting problem-solving skills, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 136,
        "title": "Finger Painting",
        "description": "Set up a safe space for finger painting using non-toxic, washable paint or edible alternatives like mashed fruits or yogurts. Let your baby explore the textures and colors, supporting their sensory development, creativity, and fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 137,
        "title": "Pretend Play",
        "description": "Provide your baby with child-safe dolls, stuffed animals, or play kitchen utensils. Encourage imaginative play by demonstrating actions and making sounds, allowing your baby to imitate and engage in pretend scenarios.",
        "imageUrls": []
      },
      {
        "id": 138,
        "title": "Dancing and Singing",
        "description": "Play lively music and dance together with your baby. Sing songs with simple actions and encourage them to copy the movements, promoting coordination, rhythm, and language development.",
        "imageUrls": []
      },
      {
        "id": 139,
        "title": "Puzzles",
        "description": "Introduce simple puzzles with large, chunky pieces. Encourage your baby to manipulate and fit the pieces into their respective places, fostering problem-solving skills, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 140,
        "title": "Water Sensory Play",
        "description": "Fill a basin or container with water and provide cups, spoons, and bath toys for your baby to explore and play. Engaging in water play enhances their sensory experience, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 141,
        "title": "Outdoor Exploration",
        "description": "Take your baby outdoors to explore nature. Allow them to touch leaves, grass, and other safe natural objects, stimulating their senses and fostering a connection with the environment.",
        "imageUrls": []
      },
      {
        "id": 142,
        "title": "Building Towers",
        "description": "Offer large, soft building blocks that your baby can stack to create towers. Encourage them to knock them down and rebuild, promoting fine motor skills, hand-eye coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 143,
        "title": "Language Development",
        "description": "Engage in frequent conversations with your baby, describing objects, actions, and emotions. Introduce new words, read books together, and respond to their attempts at communication, supporting their language development and understanding.",
        "imageUrls": []
      },
      {
        "id": 144,
        "title": "Simple Obstacle Course",
        "description": "Set up a safe and age-appropriate obstacle course using cushions, tunnels, or low play equipment. Encourage your baby to crawl, climb, and explore the course, promoting physical development, coordination, and spatial awareness.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 14,
    "activities": [
      {
        "id": 145,
        "title": "Stack and Sort",
        "description": "Provide your baby with blocks or cups that they can stack and sort. Encourage them to build towers or nest the cups inside one another, promoting their fine motor skills, hand-eye coordination, and problem-solving abilities.",
        "imageUrls": []
      },
      {
        "id": 146,
        "title": "Shape Sorters",
        "description": "Introduce shape sorters that have different openings for various shapes. Encourage your baby to match the shapes with the corresponding holes, helping them refine their hand-eye coordination, problem-solving skills, and shape recognition.",
        "imageUrls": []
      },
      {
        "id": 147,
        "title": "Pretend Play",
        "description": "Set up a pretend play area with toy kitchen items, dolls, or stuffed animals. Encourage your baby to engage in imaginative play by pretending to cook, feed the dolls, or have tea parties. This activity enhances their creativity, language development, and social skills.",
        "imageUrls": []
      },
      {
        "id": 148,
        "title": "Scribbling and Drawing",
        "description": "Offer large crayons or washable markers and a large sheet of paper or a coloring book. Let your baby experiment with making marks and scribbles, promoting their fine motor skills and creativity. Ensure the art supplies are safe and non-toxic.",
        "imageUrls": []
      },
      {
        "id": 149,
        "title": "Puzzles",
        "description": "Introduce simple puzzles with large pieces and vibrant pictures. Help your baby complete the puzzles and gradually encourage them to do it independently. This activity enhances their problem-solving abilities, hand-eye coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 150,
        "title": "Outdoor Exploration",
        "description": "Take your baby outdoors to explore nature. Allow them to touch leaves, feel grass, and observe insects or animals (from a safe distance). Outdoor play promotes sensory development, curiosity, and physical activity.",
        "imageUrls": []
      },
      {
        "id": 151,
        "title": "Ball Play",
        "description": "Provide soft, lightweight balls for your baby to roll, toss, or kick. Engage in a gentle back-and-forth ball play, promoting their gross motor skills, hand-eye coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 152,
        "title": "Dancing and Movement",
        "description": "Play music and encourage your baby to dance and move to the rhythm. Show them simple dance moves or copy their movements, promoting their physical coordination, self-expression, and sense of rhythm.",
        "imageUrls": []
      },
      {
        "id": 153,
        "title": "Water and Sand Play",
        "description": "Set up a water table or a shallow container with sand. Offer cups, spoons, and toys for your baby to pour, scoop, and explore. Water and sand play enhance sensory development, fine motor skills, and creativity.",
        "imageUrls": []
      },
      {
        "id": 154,
        "title": "Simple Obstacle Course",
        "description": "Create a simple obstacle course using pillows, cushions, and other safe objects. Encourage your baby to crawl under, climb over, and maneuver through the obstacles, promoting their gross motor skills, balance, and coordination.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 15,
    "activities": [
      {
        "id": 155,
        "title": "Building Blocks",
        "description": "Provide large, soft building blocks or stacking toys. Encourage your baby to explore and experiment with stacking and knocking them down. This activity enhances their fine motor skills, hand-eye coordination, and problem-solving abilities.",
        "imageUrls": []
      },
      {
        "id": 156,
        "title": "Pretend Play",
        "description": "Offer simple props such as toy phones, kitchen sets, or stuffed animals to encourage pretend play. Join in the play by imitating actions and sounds, fostering creativity, social skills, and imagination.",
        "imageUrls": []
      },
      {
        "id": 157,
        "title": "Shape Sorters",
        "description": "Introduce shape sorter toys with various shapes and corresponding holes. Help your baby identify and fit the shapes into the right slots, promoting hand-eye coordination, problem-solving, and shape recognition.",
        "imageUrls": []
      },
      {
        "id": 158,
        "title": "Gross Motor Play",
        "description": "Set up an obstacle course using cushions, tunnels, or soft play equipment. Encourage your baby to crawl, climb, and explore their physical abilities. This activity develops their gross motor skills, balance, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 159,
        "title": "Sensory Bins",
        "description": "Create a sensory bin filled with materials like rice, pasta, or sand. Add safe objects, scoops, and containers for your baby to explore and manipulate. This activity stimulates their tactile senses, fine motor skills, and creativity.",
        "imageUrls": []
      },
      {
        "id": 160,
        "title": "Simple Puzzles",
        "description": "Introduce puzzles with large, chunky pieces and simple pictures. Start with puzzles with fewer pieces and gradually increase the complexity as your baby progresses. Solving puzzles promotes hand-eye coordination, cognitive skills, and problem-solving abilities.",
        "imageUrls": []
      },
      {
        "id": 161,
        "title": "Water Play",
        "description": "Set up a water table or basin with shallow water and provide cups, funnels, and toys for scooping and pouring. This activity enhances fine motor skills, hand-eye coordination, and sensory exploration.",
        "imageUrls": []
      },
      {
        "id": 162,
        "title": "Nursery Rhymes and Songs",
        "description": "Sing nursery rhymes, action songs, and fingerplays with your baby. Use hand gestures and encourage your baby to participate. This activity promotes language development, rhythm, and coordination.",
        "imageUrls": []
      },
      {
        "id": 163,
        "title": "Outdoor Exploration",
        "description": "Take your baby for walks in a stroller or allow them to explore safe outdoor spaces. Encourage them to touch leaves, flowers, or other natural elements, fostering sensory development and a connection with the environment.",
        "imageUrls": []
      },
      {
        "id": 164,
        "title": "Scribbling and Coloring",
        "description": "Provide large, washable crayons or markers and let your baby scribble on paper or a coloring book. This activity promotes fine motor skills, hand-eye coordination, and creativity.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 16,
    "activities": [
      {
        "id": 165,
        "title": "Building Blocks",
        "description": "Provide your baby with large, soft building blocks and encourage them to stack and knock them down. This activity enhances their fine motor skills, hand-eye coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 166,
        "title": "Pretend Play",
        "description": "Offer your baby props such as toy kitchen items, dolls, or stuffed animals. Encourage imaginative play by pretending to cook, feed the dolls, or engage in other role-playing scenarios. This fosters creativity, social skills, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 167,
        "title": "Shape Sorting",
        "description": "Introduce a shape sorter toy that has various shapes and corresponding holes. Encourage your baby to match the shapes and place them in the correct holes, promoting problem-solving skills, hand-eye coordination, and shape recognition.",
        "imageUrls": []
      },
      {
        "id": 168,
        "title": "Simple Puzzles",
        "description": "Provide age-appropriate puzzles with large, chunky pieces. Start with puzzles that have only a few pieces and gradually progress to more complex ones. Puzzles improve cognitive skills, hand dexterity, and logical thinking.",
        "imageUrls": []
      },
      {
        "id": 169,
        "title": "Outdoor Exploration",
        "description": "Take your baby outside for nature walks, where they can explore different textures, sights, and sounds. Let them touch leaves, watch birds, feel grass, and listen to the sounds of nature. This encourages sensory development and appreciation for the environment.",
        "imageUrls": []
      },
      {
        "id": 170,
        "title": "Scribbling with Crayons",
        "description": "Offer large, washable crayons and paper for your baby to scribble and make marks. This activity supports their fine motor skills, hand strength, and creativity. Ensure supervision to prevent them from putting crayons in their mouths.",
        "imageUrls": []
      },
      {
        "id": 171,
        "title": "Action Songs and Dancing",
        "description": "Engage your baby in action songs with movements like 'Head, Shoulders, Knees, and Toes' or 'The Hokey Pokey.' Dance and move together, encouraging coordination, rhythm, and physical activity.",
        "imageUrls": []
      },
      {
        "id": 172,
        "title": "Indoor Obstacle Course",
        "description": "Create a safe and age-appropriate obstacle course using pillows, cushions, tunnels, and soft play equipment. Encourage your baby to crawl, climb, and explore the course, promoting gross motor skills, balance, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 173,
        "title": "Water Play",
        "description": "Set up a shallow basin or bathtub with water and offer safe water toys, cups, and containers for pouring and splashing. Supervise your baby closely and ensure a suitable water temperature. Water play enhances sensory exploration, fine motor skills, and provides a fun sensory experience.",
        "imageUrls": []
      },
      {
        "id": 174,
        "title": "Storytelling and Picture Books",
        "description": "Read age-appropriate picture books to your baby, pointing out and discussing the pictures. Encourage their participation by asking questions or having them complete simple tasks related to the story. This supports language development, comprehension, and imagination.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 17,
    "activities": [
      {
        "id": 175,
        "title": "Building Blocks",
        "description": "Provide large, soft building blocks and encourage your baby to stack them, knock them down, and explore different shapes and sizes. This activity promotes fine motor skills, hand-eye coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 176,
        "title": "Shape Sorter",
        "description": "Introduce a shape sorter toy with various shapes that fit through corresponding holes. Encourage your baby to manipulate the shapes and place them in the correct slots, enhancing their problem-solving abilities and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 177,
        "title": "Pretend Play",
        "description": "Encourage imaginative play by providing props like toy phones, kitchen sets, or dolls. Engage in pretend conversations or imitate real-life situations. Pretend play nurtures language skills, social development, and creativity.",
        "imageUrls": []
      },
      {
        "id": 178,
        "title": "Puzzles",
        "description": "Offer age-appropriate puzzles with larger pieces and simple designs. Guide your baby to complete the puzzles, promoting problem-solving, fine motor skills, and hand-eye coordination.",
        "imageUrls": []
      },
      {
        "id": 179,
        "title": "Scribbling and Drawing",
        "description": "Provide large sheets of paper and crayons or washable markers. Let your baby explore scribbling and drawing. This activity supports fine motor skills, hand-eye coordination, and encourages creativity.",
        "imageUrls": []
      },
      {
        "id": 180,
        "title": "Sensory Bins",
        "description": "Create sensory bins filled with different materials such as colored rice, cooked pasta, or sand. Include safe objects like scoops, cups, and small toys. Allow your baby to explore the textures, pour and scoop, enhancing sensory development and fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 181,
        "title": "Outdoor Exploration",
        "description": "Take your baby outdoors to explore nature, such as a local park or garden. Let them touch leaves, feel grass, and observe insects or birds. Outdoor exploration stimulates their senses, encourages physical activity, and fosters a connection with the natural world.",
        "imageUrls": []
      },
      {
        "id": 182,
        "title": "Dancing and Music",
        "description": "Play lively music and encourage your baby to dance, jump, and move to the rhythm. This activity promotes gross motor skills, coordination, and enhances their appreciation for music.",
        "imageUrls": []
      },
      {
        "id": 183,
        "title": "Reading and Storytelling",
        "description": "Continue reading age-appropriate picture books and engage your baby in interactive storytelling. Encourage them to point at objects, imitate sounds, or repeat simple words. This activity supports language development, imagination, and listening skills.",
        "imageUrls": []
      },
      {
        "id": 184,
        "title": "Pretend Dress-Up",
        "description": "Provide a box of dress-up clothes, such as hats, scarves, or oversized shirts. Let your baby explore wearing different items and encourage imaginative play, role-playing, and self-expression.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 18,
    "activities": [
      {
        "id": 185,
        "title": "Sensory Bins",
        "description": "Create sensory bins filled with materials like rice, pasta, or sand. Add scoops, cups, and small toys for your child to explore through touch, scoop, and pour. This activity enhances their sensory exploration, fine motor skills, and imagination.",
        "imageUrls": []
      },
      {
        "id": 186,
        "title": "Building Blocks",
        "description": "Provide large building blocks that your child can stack, knock down, and explore. This helps develop their hand-eye coordination, problem-solving skills, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 187,
        "title": "Shape Sorters",
        "description": "Introduce shape sorters with different cut-out shapes and corresponding holes. Encourage your child to match the shapes and insert them into the correct holes, promoting fine motor skills, cognitive development, and shape recognition.",
        "imageUrls": []
      },
      {
        "id": 188,
        "title": "Puzzles",
        "description": "Offer age-appropriate puzzles with chunky pieces and simple designs. Help your child assemble the puzzle pieces and gradually encourage them to do it independently. Puzzles improve hand-eye coordination, problem-solving abilities, and cognitive skills.",
        "imageUrls": []
      },
      {
        "id": 189,
        "title": "Pretend Play",
        "description": "Encourage imaginative play by providing your child with props such as play food, dolls, or stuffed animals. Engage in role-playing activities like having a tea party or playing house. Pretend play nurtures their creativity, language skills, social interaction, and emotional development.",
        "imageUrls": []
      },
      {
        "id": 190,
        "title": "Outdoor Exploration",
        "description": "Take your child for walks in nature or visits to the park. Let them explore different textures, collect leaves or rocks, and observe nature. Outdoor activities promote gross motor skills, sensory development, and an understanding of the world around them.",
        "imageUrls": []
      },
      {
        "id": 191,
        "title": "Art and Craft",
        "description": "Offer child-safe art supplies like large crayons, washable markers, and finger paints. Allow your child to freely explore and create their own artwork. This enhances their fine motor skills, creativity, self-expression, and hand-eye coordination.",
        "imageUrls": []
      },
      {
        "id": 192,
        "title": "Dancing and Movement",
        "description": "Play energetic music and encourage your child to dance and move along with the rhythm. You can teach them simple dance moves or create a dance routine together. This activity promotes physical coordination, rhythm, and self-expression.",
        "imageUrls": []
      },
      {
        "id": 193,
        "title": "Language Enrichment",
        "description": "Engage in conversations, read books with more complex stories, and introduce new vocabulary. Encourage your child to repeat words and simple phrases, expanding their language skills and comprehension.",
        "imageUrls": []
      },
      {
        "id": 194,
        "title": "Water Play",
        "description": "Set up a water table or provide containers of water for your child to splash and play with. Add floating toys, cups, and sponges for exploration and fun. Water play improves hand-eye coordination, sensory development, and provides a calming and enjoyable experience.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 19,
    "activities": [
      {
        "id": 195,
        "title": "Block Stacking",
        "description": "Provide soft building blocks or large Lego-style blocks for your toddler to stack and knock down. This activity promotes hand-eye coordination, spatial awareness, and problem-solving skills.",
        "imageUrls": []
      },
      {
        "id": 196,
        "title": "Shape Sorting",
        "description": "Introduce shape sorting toys or puzzles where your child can match shapes to corresponding holes. This activity enhances fine motor skills, cognitive development, and shape recognition.",
        "imageUrls": []
      },
      {
        "id": 197,
        "title": "Pretend Play",
        "description": "Encourage your toddler to engage in pretend play by providing them with toys like dolls, kitchen sets, or stuffed animals. This type of play enhances imagination, social skills, and language development.",
        "imageUrls": []
      },
      {
        "id": 198,
        "title": "Gross Motor Play",
        "description": "Set up an obstacle course using cushions, tunnels, or low stools for your toddler to crawl over, under, and through. This helps develop their gross motor skills, balance, and coordination.",
        "imageUrls": []
      },
      {
        "id": 199,
        "title": "Sensory Bins",
        "description": "Create a sensory bin filled with materials like rice, pasta, or dried beans. Add spoons, cups, or small toys for your toddler to explore and manipulate. This activity stimulates sensory exploration, fine motor skills, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 200,
        "title": "Color Sorting",
        "description": "Provide a variety of objects or toys in different colors and ask your toddler to sort them into corresponding baskets or containers. This activity enhances color recognition, hand-eye coordination, and categorization skills.",
        "imageUrls": []
      },
      {
        "id": 201,
        "title": "Outdoor Play",
        "description": "Take your toddler to the park or backyard to engage in activities like swinging, sliding, or playing in a sandbox. Outdoor play promotes gross motor skills, social interaction, and an appreciation for nature.",
        "imageUrls": []
      },
      {
        "id": 202,
        "title": "Puzzles",
        "description": "Offer age-appropriate puzzles with large pieces for your toddler to assemble. Start with simple puzzles featuring familiar objects or animals. Puzzles encourage problem-solving, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 203,
        "title": "Dancing and Singing",
        "description": "Play lively music and encourage your toddler to dance and sing along. This activity promotes physical coordination, rhythm, and language skills.",
        "imageUrls": []
      },
      {
        "id": 204,
        "title": "Water Play",
        "description": "Fill a basin with water and provide your toddler with cups, funnels, and bath toys for pouring and splashing. Water play improves fine motor skills, hand-eye coordination, and sensory exploration.",
        "imageUrls": []
      },
      {
        "id": 205,
        "title": "Reading Time",
        "description": "Read books with engaging stories and colorful illustrations to your toddler. Encourage them to point at objects and repeat simple words. Reading promotes language development, vocabulary expansion, and a love for books.",
        "imageUrls": []
      },
      {
        "id": 206,
        "title": "Shape Tracing",
        "description": "Draw basic shapes on a large piece of paper and have your toddler trace them using crayons or markers. This activity enhances hand-eye coordination, fine motor skills, and shape recognition.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 20,
    "activities": [
      {
        "id": 207,
        "title": "Sensory Bin Exploration",
        "description": "Create sensory bins filled with materials like rice, sand, or kinetic sand. Add small toys, spoons, and cups for your toddler to manipulate and explore. This activity encourages sensory exploration, fine motor skills, and imaginative play.",
        "imageUrls": []
      },
      {
        "id": 208,
        "title": "Sticker Play",
        "description": "Provide your toddler with stickers and a large sheet of paper. Encourage them to peel off the stickers and place them on the paper or create simple sticker scenes. This activity enhances fine motor skills, hand-eye coordination, and creativity.",
        "imageUrls": []
      },
      {
        "id": 209,
        "title": "Shape Puzzles",
        "description": "Introduce shape puzzles with multiple pieces that your toddler can fit together. Start with simpler puzzles and gradually increase the complexity. This activity promotes problem-solving skills, shape recognition, and hand-eye coordination.",
        "imageUrls": []
      },
      {
        "id": 210,
        "title": "Pretend Play with Props",
        "description": "Set up a pretend play area with props like a kitchen set, doctor's kit, or toolset. Encourage your toddler to engage in imaginative play, imitating real-life activities. Pretend play enhances creativity, language development, and social skills.",
        "imageUrls": []
      },
      {
        "id": 211,
        "title": "Ball Play",
        "description": "Engage in rolling, throwing, and kicking soft balls with your toddler. This activity improves gross motor skills, hand-eye coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 212,
        "title": "Art Exploration",
        "description": "Provide your toddler with crayons, markers, or washable paints along with large sheets of paper. Encourage them to create their own artwork through scribbling, coloring, or finger painting. This activity promotes creativity, fine motor skills, and self-expression.",
        "imageUrls": []
      },
      {
        "id": 213,
        "title": "Shape and Color Sorting Games",
        "description": "Use colored blocks or objects in different shapes and ask your toddler to sort them into corresponding containers. This activity enhances shape and color recognition, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 214,
        "title": "Playdough Fun",
        "description": "Offer playdough to your toddler and let them explore and manipulate it with their hands. Provide cookie cutters, rolling pins, and other playdough tools for added engagement. Playdough play enhances fine motor skills, sensory exploration, and creativity.",
        "imageUrls": []
      },
      {
        "id": 215,
        "title": "Music and Movement",
        "description": "Play music and encourage your toddler to dance, jump, or march to the rhythm. Sing songs and engage them in simple actions like clapping or stomping. This activity promotes coordination, rhythm, and language skills.",
        "imageUrls": []
      },
      {
        "id": 216,
        "title": "Nature Walks",
        "description": "Take your toddler for short walks in a park or garden, allowing them to explore and observe nature. Point out different trees, flowers, or animals you encounter, stimulating their curiosity and language development.",
        "imageUrls": []
      },
      {
        "id": 217,
        "title": "Building with Blocks",
        "description": "Provide your toddler with a variety of building blocks or interlocking blocks to create towers, bridges, or structures. This activity promotes spatial awareness, problem-solving skills, and fine motor development.",
        "imageUrls": []
      },
      {
        "id": 218,
        "title": "Matching Games",
        "description": "Use cards or objects with matching pairs, such as animal cards or socks. Help your toddler find the matching pairs and encourage them to make connections. Matching games support cognitive development, memory skills, and visual discrimination.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 21,
    "activities": [
      {
        "id": 219,
        "title": "Sensory Baking",
        "description": "Involve your toddler in simple baking activities, like mixing ingredients, stirring, or adding toppings. Let them explore the textures, smells, and tastes of the ingredients. This activity encourages sensory exploration, fine motor skills, and language development.",
        "imageUrls": []
      },
      {
        "id": 220,
        "title": "Playdough Fun",
        "description": "Provide your toddler with playdough and child-safe tools like cookie cutters, rolling pins, or plastic utensils. Let them squish, mold, and create different shapes. This activity improves fine motor skills, hand-eye coordination, and creativity.",
        "imageUrls": []
      },
      {
        "id": 221,
        "title": "Nature Walk",
        "description": "Take your toddler for a nature walk in a nearby park or garden. Encourage them to observe and point out different plants, flowers, insects, or animals. This activity promotes sensory exploration, language development, and an appreciation for the environment.",
        "imageUrls": []
      },
      {
        "id": 222,
        "title": "Pretend Picnic",
        "description": "Arrange a pretend picnic with your toddler using play food, plates, and a blanket. Let them practice feeding their stuffed animals or dolls. This activity enhances imaginative play, social skills, and fine motor coordination.",
        "imageUrls": []
      },
      {
        "id": 223,
        "title": "Color Scavenger Hunt",
        "description": "Create a color scavenger hunt by hiding objects of different colors around the house. Give your toddler a color prompt and ask them to find objects matching that color. This activity improves color recognition, attention to detail, and problem-solving skills.",
        "imageUrls": []
      },
      {
        "id": 224,
        "title": "Action Songs",
        "description": "Teach your toddler action songs with simple movements, such as \"Head, Shoulders, Knees, and Toes\" or \"If You're Happy and You Know It.\" Sing and perform the actions together. This activity promotes gross motor skills, coordination, and language development.",
        "imageUrls": []
      },
      {
        "id": 225,
        "title": "Shape Puzzles",
        "description": "Offer puzzles with various shapes and encourage your toddler to match the pieces to the corresponding holes. Start with puzzles that have large, easy-to-grasp pieces. This activity enhances problem-solving skills, hand-eye coordination, and shape recognition.",
        "imageUrls": []
      },
      {
        "id": 226,
        "title": "Balloon Play",
        "description": "Inflate a balloon and engage your toddler in gentle play by bouncing, tossing, or rolling the balloon together. Ensure close supervision and use larger balloons to avoid choking hazards. This activity promotes gross motor skills, coordination, and sensory stimulation.",
        "imageUrls": []
      },
      {
        "id": 227,
        "title": "Sorting and Matching",
        "description": "Provide objects like buttons, blocks, or toys in different colors or shapes. Ask your toddler to sort and match them based on specific attributes. This activity improves categorization skills, fine motor control, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 228,
        "title": "Obstacle Course",
        "description": "Create a simple indoor or outdoor obstacle course using cushions, tunnels, cones, or stepping stones. Encourage your toddler to climb, crawl, and balance through the course. This activity enhances gross motor skills, coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 229,
        "title": "Watercolor Painting",
        "description": "Set up a watercolor painting activity for your toddler using large brushes, watercolors, and paper. Let them explore and create their own artwork. This activity improves fine motor skills, hand-eye coordination, and creativity.",
        "imageUrls": []
      },
      {
        "id": 230,
        "title": "Storytelling with Puppets",
        "description": "Use finger puppets or simple hand puppets to act out stories or songs. Encourage your toddler to join in and make up their own stories. This activity enhances language development, imagination, and social skills.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 22,
    "activities": [
      {
        "id": 231,
        "title": "Sensory Play with Playdough",
        "description": "Provide your toddler with non-toxic playdough and various tools like cookie cutters, rolling pins, and plastic utensils. This activity enhances sensory exploration, fine motor skills, and creativity.",
        "imageUrls": []
      },
      {
        "id": 232,
        "title": "Scavenger Hunt",
        "description": "Hide toys or objects around a room and provide your toddler with a basket or bag to collect them. Encourage them to find and collect the items, which promotes object recognition, problem-solving, and gross motor skills.",
        "imageUrls": []
      },
      {
        "id": 233,
        "title": "Simple Puzzles",
        "description": "Offer puzzles with larger and more complex pieces that your toddler can manipulate and assemble. Look for puzzles with familiar objects, animals, or shapes. This activity develops problem-solving, fine motor skills, and cognitive abilities.",
        "imageUrls": []
      },
      {
        "id": 234,
        "title": "Ball Play",
        "description": "Introduce soft balls of various sizes and encourage your toddler to roll, toss, and kick them. This activity improves gross motor skills, hand-eye coordination, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 235,
        "title": "Sorting and Matching",
        "description": "Provide objects or toys that can be sorted or matched based on attributes such as color, shape, or size. Encourage your toddler to sort and match them accordingly. This activity enhances cognitive development, classification skills, and logical thinking.",
        "imageUrls": []
      },
      {
        "id": 236,
        "title": "Indoor Obstacle Course",
        "description": "Create a safe indoor obstacle course using pillows, cushions, tunnels, and low obstacles. Guide your toddler through the course, encouraging crawling, climbing, and balance. This activity promotes gross motor skills, coordination, and physical confidence.",
        "imageUrls": []
      },
      {
        "id": 237,
        "title": "Name and Picture Recognition",
        "description": "Show your toddler family photos or pictures of familiar objects. Help them identify and name the people or objects in the pictures. This activity supports language development, visual recognition, and personal connection.",
        "imageUrls": []
      },
      {
        "id": 238,
        "title": "Art Exploration",
        "description": "Offer various art supplies such as washable markers, crayons, finger paints, and stickers. Allow your toddler to experiment and create their own artwork. This activity enhances creativity, fine motor skills, and self-expression.",
        "imageUrls": []
      },
      {
        "id": 239,
        "title": "Nature Walk",
        "description": "Take your toddler on a nature walk, exploring a local park or garden. Point out different plants, flowers, or animals, and engage them in conversation about their observations. This activity encourages sensory exploration, language development, and a connection with the natural world.",
        "imageUrls": []
      },
      {
        "id": 240,
        "title": "Simon Says",
        "description": "Play a simple game of Simon Says, giving your toddler commands like \"touch your nose\" or \"jump up and down.\" This activity promotes listening skills, body awareness, and following instructions.",
        "imageUrls": []
      },
      {
        "id": 241,
        "title": "Music and Movement",
        "description": "Play lively music and encourage your toddler to dance, clap, or stomp their feet. Provide musical instruments like shakers or drums for them to explore and make sounds. Music and movement activities enhance coordination, rhythm, and self-expression.",
        "imageUrls": []
      },
      {
        "id": 242,
        "title": "Daily Chores",
        "description": "Involve your toddler in simple age-appropriate chores like putting away toys, wiping surfaces, or sorting laundry. This promotes a sense of responsibility, fine motor skills, and a feeling of contributing to the family.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 23,
    "activities": [
      {
        "id": 243,
        "title": "Simple Puzzles",
        "description": "Introduce puzzles with more pieces and complexity. Choose puzzles with their favorite characters, animals, or vehicles. This activity promotes problem-solving skills, fine motor control, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 244,
        "title": "Playdough Fun",
        "description": "Provide your toddler with playdough and child-friendly tools like plastic cookie cutters, rolling pins, and molds. Encourage them to create shapes, animals, or objects using their imagination. This activity promotes fine motor skills, creativity, and sensory exploration.",
        "imageUrls": []
      },
      {
        "id": 245,
        "title": "Pretend Tea Party",
        "description": "Set up a pretend tea party with toy cups, saucers, and plates. Encourage your toddler to pour 'tea' and serve imaginary guests. This activity enhances imagination, social skills, and language development.",
        "imageUrls": []
      },
      {
        "id": 246,
        "title": "Sensory Bin Exploration",
        "description": "Create a sensory bin with various materials like colored rice, kinetic sand, or dried pasta. Add small toys or objects for your toddler to discover, manipulate, and sort. This activity stimulates sensory exploration, fine motor skills, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 247,
        "title": "Gross Motor Obstacle Course",
        "description": "Set up a mini obstacle course in your living room or backyard using pillows, cones, tunnels, and stepping stones. Encourage your toddler to climb, crawl, jump, and balance. This activity promotes gross motor skills, coordination, and physical confidence.",
        "imageUrls": []
      },
      {
        "id": 248,
        "title": "Name That Object",
        "description": "Show your toddler various objects or flashcards with pictures and encourage them to name each one. This activity enhances vocabulary, object recognition, and language development.",
        "imageUrls": []
      },
      {
        "id": 249,
        "title": "Building Towers",
        "description": "Provide building blocks or Duplo bricks for your toddler to build towers or structures. Encourage them to experiment with different shapes and sizes. This activity improves hand-eye coordination, spatial awareness, and problem-solving skills.",
        "imageUrls": []
      },
      {
        "id": 250,
        "title": "Nature Walk",
        "description": "Take your toddler for a walk in a park or garden. Encourage them to explore nature, collect leaves or rocks, and point out different plants and animals. This activity promotes sensory awareness, appreciation for the environment, and language development.",
        "imageUrls": []
      },
      {
        "id": 251,
        "title": "Musical Instruments",
        "description": "Offer simple musical instruments like drums, shakers, or xylophones for your toddler to experiment with. Encourage them to make sounds, follow rhythms, and express themselves through music. This activity enhances sensory development, coordination, and auditory skills.",
        "imageUrls": []
      },
      {
        "id": 252,
        "title": "Cooking Together",
        "description": "Involve your toddler in simple cooking tasks, such as stirring, pouring, or decorating cookies. This activity promotes fine motor skills, following instructions, and fosters a sense of independence.",
        "imageUrls": []
      },
      {
        "id": 253,
        "title": "Watercolor Painting",
        "description": "Provide your toddler with large sheets of paper and watercolor paints. Encourage them to explore different colors, patterns, and textures. This activity promotes creativity, fine motor skills, and artistic expression.",
        "imageUrls": []
      },
      {
        "id": 254,
        "title": "Follow the Leader",
        "description": "Engage in a game of 'Follow the Leader' where you take turns leading different movements like jumping, spinning, or clapping. This activity improves coordination, listening skills, and promotes physical activity.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 24,
    "activities": [
      {
        "id": 255,
        "title": "Pretend Play",
        "description": "Encourage your toddler to engage in pretend play by providing them with props like costumes, play kitchen sets, or doctor kits. This type of play enhances imagination, social skills, and language development.",
        "imageUrls": []
      },
      {
        "id": 256,
        "title": "Sorting and Matching",
        "description": "Introduce activities that involve sorting and matching, such as sorting toys by color, shape, or size, or matching puzzle pieces. This helps develop cognitive skills, problem-solving abilities, and categorization.",
        "imageUrls": []
      },
      {
        "id": 257,
        "title": "Building with Blocks",
        "description": "Provide building blocks or construction toys and encourage your toddler to build towers, houses, or other structures. This activity promotes fine motor skills, spatial awareness, and creativity.",
        "imageUrls": []
      },
      {
        "id": 258,
        "title": "Art and Craft",
        "description": "Offer age-appropriate art supplies like crayons, washable markers, and child-safe scissors. Let your toddler engage in drawing, coloring, cutting, and pasting activities. This fosters creativity, fine motor skills, and self-expression.",
        "imageUrls": []
      },
      {
        "id": 259,
        "title": "Gross Motor Play",
        "description": "Set up a mini obstacle course in your home or backyard, including activities like crawling under a table, jumping over cushions, or climbing over soft structures. This helps develop gross motor skills, balance, coordination, and body awareness.",
        "imageUrls": []
      },
      {
        "id": 260,
        "title": "Sensory Play",
        "description": "Create sensory bins with materials like rice, sand, or water, and add small toys, scoops, and containers. This activity provides tactile stimulation, encourages exploration, and enhances fine motor skills.",
        "imageUrls": []
      },
      {
        "id": 261,
        "title": "Shape and Color Hunts",
        "description": "Hide objects of different shapes or colors around the house and ask your toddler to find them. This activity improves visual discrimination, attention to detail, and reinforces shape and color recognition.",
        "imageUrls": []
      },
      {
        "id": 262,
        "title": "Nature Walks",
        "description": "Take your toddler for short walks in nature, such as a park or garden. Point out different plants, flowers, and animals, encouraging them to observe and interact with their surroundings. This fosters a love for nature, curiosity, and language development.",
        "imageUrls": []
      },
      {
        "id": 263,
        "title": "Cooking or Baking Together",
        "description": "Involve your toddler in simple cooking or baking activities, such as mixing ingredients or decorating cookies. This promotes sensory exploration, fine motor skills, following instructions, and a sense of accomplishment.",
        "imageUrls": []
      },
      {
        "id": 264,
        "title": "Music and Movement",
        "description": "Play different genres of music and encourage your toddler to dance, jump, or clap along. Sing songs together, teaching them simple nursery rhymes or action songs. This activity promotes coordination, rhythm, and language development.",
        "imageUrls": []
      },
      {
        "id": 265,
        "title": "Shape Puzzles",
        "description": "Offer puzzles with more complex shapes and more pieces for your toddler to assemble. This challenges their problem-solving abilities, fine motor skills, and spatial awareness.",
        "imageUrls": []
      },
      {
        "id": 266,
        "title": "Storytelling and Role-playing",
        "description": "Use puppets, stuffed animals, or dolls to tell stories or act out scenarios. Encourage your toddler to participate and use their imagination to create their own narratives. This activity enhances language skills, creativity, and social interaction.",
        "imageUrls": []
      }
    ]
  },
  {
    "month": 25,
    "activities": [
      {
        "id": 267,
        "title": "Block Stacking",
        "description": "Provide soft building blocks or large Lego-style blocks for your toddler to stack and knock down. This activity promotes hand-eye coordination, spatial awareness, and problem-solving skills.",
        "imageUrls": []
      },
      {
        "id": 268,
        "title": "Shape Sorting",
        "description": "Introduce shape sorting toys or puzzles where your child can match shapes to corresponding holes. This activity enhances fine motor skills, cognitive development, and shape recognition.",
        "imageUrls": []
      },
      {
        "id": 269,
        "title": "Pretend Play",
        "description": "Encourage your toddler to engage in pretend play by providing them with toys like dolls, kitchen sets, or stuffed animals. This type of play enhances imagination, social skills, and language development.",
        "imageUrls": []
      },
      {
        "id": 270,
        "title": "Gross Motor Play",
        "description": "Set up an obstacle course using cushions, tunnels, or low stools for your toddler to crawl over, under, and through. This helps develop their gross motor skills, balance, and coordination.",
        "imageUrls": []
      },
      {
        "id": 271,
        "title": "Sensory Bins",
        "description": "Create a sensory bin filled with materials like rice, pasta, or dried beans. Add spoons, cups, or small toys for your toddler to explore and manipulate. This activity stimulates sensory exploration, fine motor skills, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 272,
        "title": "Color Sorting",
        "description": "Provide a variety of objects or toys in different colors and ask your toddler to sort them into corresponding baskets or containers. This activity enhances color recognition, hand-eye coordination, and categorization skills.",
        "imageUrls": []
      },
      {
        "id": 273,
        "title": "Outdoor Play",
        "description": "Take your toddler to the park or backyard to engage in activities like swinging, sliding, or playing in a sandbox. Outdoor play promotes gross motor skills, social interaction, and an appreciation for nature.",
        "imageUrls": []
      },
      {
        "id": 274,
        "title": "Puzzles",
        "description": "Offer age-appropriate puzzles with large pieces for your toddler to assemble. Start with simple puzzles featuring familiar objects or animals. Puzzles encourage problem-solving, hand-eye coordination, and cognitive development.",
        "imageUrls": []
      },
      {
        "id": 275,
        "title": "Dancing and Singing",
        "description": "Play lively music and encourage your toddler to dance and sing along. This activity promotes physical coordination, rhythm, and language skills.",
        "imageUrls": []
      },
      {
        "id": 276,
        "title": "Water Play",
        "description": "Fill a basin with water and provide your toddler with cups, funnels, and bath toys for pouring and splashing. Water play improves fine motor skills, hand-eye coordination, and sensory exploration.",
        "imageUrls": []
      },
      {
        "id": 277,
        "title": "Reading Time",
        "description": "Read books with engaging stories and colorful illustrations to your toddler. Encourage them to point at objects and repeat simple words. Reading promotes language development, vocabulary expansion, and a love for books.",
        "imageUrls": []
      },
      {
        "id": 278,
        "title": "Shape Tracing",
        "description": "Draw basic shapes on a large piece of paper and have your toddler trace them using crayons or markers. This activity enhances hand-eye coordination, fine motor skills, and shape recognition.",
        "imageUrls": []
      }
    ]
  }
]

# Clear existing data from the table
Activity.objects.all().delete()

# Populate the table with new data
for item in data:
    month = item['month']
    activities = item['activities']
    for activity in activities:
        title = activity['title']
        description = activity['description']
        image_urls = activity['imageUrls']
        Activity.objects.create(month=month, title=title, description=description, imageUrls=image_urls)