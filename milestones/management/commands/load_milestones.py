from django.core.management.base import BaseCommand
from milestones.models import Milestone

class Command(BaseCommand):
    help = 'Loads milestones data into the database from a predefined dataset.'

    def handle(self, *args, **options):
        # Define your data inside the command or load it from a JSON file
        data = [
  {
    "month": 0,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Feeding every 2 to 3 hours.",
        "Area": "Feeding"
      },
      {
        "id": 2,
        "checkpoint": "Sleeping for about 16 to 18 hours a day.",
        "Area": "Sleeping"
      },
      {
        "id": 3,
        "checkpoint": "Crying to communicate their needs.",
        "Area": "Communication"
      },
      {
        "id": 4,
        "checkpoint": "Bonding through eye contact and cuddling.",
        "Area": "Bonding"
      },
      {
        "id": 5,
        "checkpoint": "Demonstrating reflexes like rooting and sucking.",
        "Area": "Motor Skills"
      },
      {
        "id": 6,
        "checkpoint": "Grasping objects with weak grip strength.",
        "Area": "Motor Skills"
      },
      {
        "id": 7,
        "checkpoint": "Exploring senses and responding to stimuli.",
        "Area": "Sensory Development"
      },
      {
        "id": 8,
        "checkpoint": "Engaging in supervised tummy time.",
        "Area": "Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Responding to human voices and faces.",
        "Area": "Social Skills"
      }
    ]
  },
  {
    "month": 1,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Displays reflexes like turning head and grasping objects.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Makes eye contact and tracks moving objects.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 3,
        "checkpoint": "Coos and vocalizes with soft sounds.",
        "Area": "Language Skills"
      },
      {
        "id": 4,
        "checkpoint": "Recognizes and responds to familiar voices.",
        "Area": "Social Skills"
      },
      {
        "id": 5,
        "checkpoint": "Mimics facial expressions like smiling.",
        "Area": "Emotional Development"
      },
      {
        "id": 6,
        "checkpoint": "Tracks objects and people with their gaze.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 7,
        "checkpoint": "Begins supervised tummy time for neck and upper body strength.",
        "Area": "Motor Skills"
      },
      {
        "id": 8,
        "checkpoint": "Engages with gentle touch and contrasting visual stimuli.",
        "Area": "Sensory Development"
      },
      {
        "id": 9,
        "checkpoint": "Sleeps for most of the day, wakes up for regular feedings.",
        "Area": "Sleep Patterns"
      }
    ]
  },
  {
    "month": 2,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Lifts and holds head up momentarily during tummy time.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Begins to track moving objects with eyes.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 3,
        "checkpoint": "Coos and makes gurgling sounds.",
        "Area": "Language Skills"
      },
      {
        "id": 4,
        "checkpoint": "Smiles in response to stimuli.",
        "Area": "Emotional Development"
      },
      {
        "id": 5,
        "checkpoint": "Starts to bat at and grasp objects.",
        "Area": "Motor Skills"
      },
      {
        "id": 6,
        "checkpoint": "Shows signs of recognizing familiar faces.",
        "Area": "Social Skills"
      },
      {
        "id": 7,
        "checkpoint": "Begins to imitate facial expressions.",
        "Area": "Social Skills"
      },
      {
        "id": 8,
        "checkpoint": "Displays increased head control while being held upright.",
        "Area": "Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Attempts to push up when lying on stomach.",
        "Area": "Motor Skills"
      },
      {
        "id": 10,
        "checkpoint": "Starts to visually follow objects from side to side.",
        "Area": "Cognitive Skills"
      }
    ]
  },
  {
    "month": 3,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Lifts head and chest when lying on tummy, supporting weight on forearms.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Begins to reach for and grab objects intentionally.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Smiles and laughs in response to social interaction.",
        "Area": "Emotional Development"
      },
      {
        "id": 4,
        "checkpoint": "Makes babbling sounds and experiments with different vocalizations.",
        "Area": "Language Skills"
      },
      {
        "id": 5,
        "checkpoint": "Begins to roll over from tummy to back or back to tummy.",
        "Area": "Motor Skills"
      },
      {
        "id": 6,
        "checkpoint": "Shows increased interest in surroundings and starts to explore with hands and mouth.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 7,
        "checkpoint": "Starts to bring hands together and grasp toys.",
        "Area": "Motor Skills"
      },
      {
        "id": 8,
        "checkpoint": "Tracks objects and people with eyes more smoothly.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 9,
        "checkpoint": "Displays improved head control and can hold head steady while sitting with support.",
        "Area": "Motor Skills"
      },
      {
        "id": 10,
        "checkpoint": "Starts to exhibit more coordinated movements, waving arms and kicking legs.",
        "Area": "Motor Skills"
      }
    ]
  },
  {
    "month": 4,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Rolls over from tummy to back and back to tummy.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Begins to laugh and make joyful sounds.",
        "Area": "Emotional Development"
      },
      {
        "id": 3,
        "checkpoint": "Reaches and grabs for objects with increased accuracy.",
        "Area": "Motor Skills"
      },
      {
        "id": 4,
        "checkpoint": "Holds and shakes objects with hands.",
        "Area": "Motor Skills"
      },
      {
        "id": 5,
        "checkpoint": "Shows interest in surrounding environment and engages in exploration.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 6,
        "checkpoint": "Begins to babble and make consonant sounds.",
        "Area": "Language Skills"
      },
      {
        "id": 7,
        "checkpoint": "Demonstrates increased control of head and neck.",
        "Area": "Motor Skills"
      },
      {
        "id": 8,
        "checkpoint": "Begins to visually track moving objects in a coordinated manner.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 9,
        "checkpoint": "Shows signs of teething and may put objects in mouth.",
        "Area": "Motor Skills"
      },
      {
        "id": 10,
        "checkpoint": "Starts to push up on forearms while lying on tummy.",
        "Area": "Motor Skills"
      }
    ]
  },
  {
    "month": 5,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Sits with support and may be able to sit momentarily without assistance.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Begins to reach for and grasp objects with a raking motion.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Shows increased interest in social interactions and may smile at familiar faces.",
        "Area": "Emotional Development"
      },
      {
        "id": 4,
        "checkpoint": "Starts to respond to own name.",
        "Area": "Social Skills"
      },
      {
        "id": 5,
        "checkpoint": "Begins to babble with more varied sounds and intonations.",
        "Area": "Language Skills"
      },
      {
        "id": 6,
        "checkpoint": "Rolls from back to tummy and may attempt to roll in both directions.",
        "Area": "Motor Skills"
      },
      {
        "id": 7,
        "checkpoint": "Exhibits increased hand-eye coordination and can transfer objects between hands.",
        "Area": "Motor Skills"
      },
      {
        "id": 8,
        "checkpoint": "Demonstrates curiosity by exploring objects with mouth.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 9,
        "checkpoint": "Shows excitement and engages in playful interactions.",
        "Area": "Social Skills"
      },
      {
        "id": 10,
        "checkpoint": "Begins to show signs of teething discomfort and may drool more frequently.",
        "Area": "Physical Development"
      }
    ]
  },
  {
    "month": 6,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Sits with support and may begin to sit unassisted for short periods.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Starts to show signs of wanting to crawl or scoot.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Begins to reach for and grasp objects with a raking motion.",
        "Area": "Motor Skills"
      },
      {
        "id": 4,
        "checkpoint": "Explores objects by mouthing and banging them together.",
        "Area": "Sensory Development"
      },
      {
        "id": 5,
        "checkpoint": "Responds to their name and shows recognition of familiar faces.",
        "Area": "Social Skills"
      },
      {
        "id": 6,
        "checkpoint": "Begins to imitate sounds and simple gestures.",
        "Area": "Language Skills"
      },
      {
        "id": 7,
        "checkpoint": "Shows interest in looking at pictures and books.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 8,
        "checkpoint": "Demonstrates increased hand-eye coordination.",
        "Area": "Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Begins to eat solid foods and shows interest in self-feeding.",
        "Area": "Feeding"
      },
      {
        "id": 10,
        "checkpoint": "Shows increased awareness of their own body, such as touching toes or feet.",
        "Area": "Motor Skills"
      }
    ]
  },
  {
    "month": 7,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Sits up without support and maintains balance.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Begins to crawl or scoot across the floor.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Uses thumb and fingers to pick up small objects.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 4,
        "checkpoint": "Starts to respond to their own name.",
        "Area": "Social Skills"
      },
      {
        "id": 5,
        "checkpoint": "Engages in 'baby talk' and attempts to imitate sounds.",
        "Area": "Language Skills"
      },
      {
        "id": 6,
        "checkpoint": "Exhibits increased hand-eye coordination and explores objects with more precision.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 7,
        "checkpoint": "Shows interest in playing interactive games like peek-a-boo.",
        "Area": "Social Skills"
      },
      {
        "id": 8,
        "checkpoint": "Begins to pull themselves up to a standing position with support.",
        "Area": "Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Explores objects by banging, shaking, and throwing them.",
        "Area": "Motor Skills"
      },
      {
        "id": 10,
        "checkpoint": "Begins to develop a pincer grasp for picking up smaller items.",
        "Area": "Fine Motor Skills"
      }
    ]
  },
  {
    "month": 8,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Sits up unsupported and maintains balance.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Begins to crawl or scoot around.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Uses thumb and forefinger to pick up small objects.",
        "Area": "Motor Skills"
      },
      {
        "id": 4,
        "checkpoint": "Responds to simple verbal cues and recognizes own name.",
        "Area": "Language Skills"
      },
      {
        "id": 5,
        "checkpoint": "Babbling turns into more recognizable sounds and attempts at words.",
        "Area": "Language Skills"
      },
      {
        "id": 6,
        "checkpoint": "Shows increased curiosity and may attempt to explore out of reach objects.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 7,
        "checkpoint": "Begins to pull themselves up to a standing position using furniture or support.",
        "Area": "Motor Skills"
      },
      {
        "id": 8,
        "checkpoint": "Demonstrates improved hand-eye coordination when playing with toys.",
        "Area": "Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Starts to develop a pincer grasp for picking up smaller objects.",
        "Area": "Motor Skills"
      }
    ]
  },
  {
    "month": 9,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Sits unsupported for extended periods of time.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Crawls or begins to show signs of crawling.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Picks up small objects using pincer grasp (thumb and forefinger).",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 4,
        "checkpoint": "Babbles with a wider range of sounds and syllables.",
        "Area": "Language Skills"
      },
      {
        "id": 5,
        "checkpoint": "Begins to understand simple commands and gestures.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 6,
        "checkpoint": "Pulls self up to stand and may cruise along furniture.",
        "Area": "Motor Skills"
      },
      {
        "id": 7,
        "checkpoint": "Responds to own name and recognizes familiar people.",
        "Area": "Social Skills"
      },
      {
        "id": 8,
        "checkpoint": "Explores objects by banging, shaking, and throwing.",
        "Area": "Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Starts to feed self with fingers and attempts to use a spoon.",
        "Area": "Self-Feeding Skills"
      },
      {
        "id": 10,
        "checkpoint": "Shows curiosity and interest in exploring different textures.",
        "Area": "Sensory Development"
      }
    ]
  },
  {
    "month": 10,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Takes independent steps or walks with support.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses gestures, like pointing, to communicate needs and wants.",
        "Area": "Communication Skills"
      },
      {
        "id": 3,
        "checkpoint": "Picks up small objects with thumb and forefinger.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 4,
        "checkpoint": "Begins to imitate simple actions and sounds.",
        "Area": "Social Skills"
      },
      {
        "id": 5,
        "checkpoint": "Understands and responds to simple verbal commands.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 6,
        "checkpoint": "Enjoys playing interactive games, such as peek-a-boo.",
        "Area": "Social Skills"
      },
      {
        "id": 7,
        "checkpoint": "Shows preference for certain toys or objects.",
        "Area": "Preferences"
      },
      {
        "id": 8,
        "checkpoint": "Starts to develop a pincer grasp for picking up smaller items.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Begins to show interest in self-feeding with a spoon.",
        "Area": "Self-Feeding Skills"
      },
      {
        "id": 10,
        "checkpoint": "Engages in simple pretend play, like feeding a doll or stuffed animal.",
        "Area": "Imagination and Play"
      }
    ]
  },
  {
    "month": 11,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Takes first independent steps or walks with support.",
        "Area": "Gross Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses simple gestures like waving and pointing.",
        "Area": "Communication Skills"
      },
      {
        "id": 3,
        "checkpoint": "Attempts to feed self with a spoon and drink from a cup.",
        "Area": "Self-Feeding Skills"
      },
      {
        "id": 4,
        "checkpoint": "Begins to imitate words and sounds.",
        "Area": "Language Skills"
      },
      {
        "id": 5,
        "checkpoint": "Understands and follows simple instructions.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 6,
        "checkpoint": "Engages in simple pretend play.",
        "Area": "Imagination and Creativity"
      },
      {
        "id": 7,
        "checkpoint": "Shows increased coordination and accuracy when manipulating objects.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 8,
        "checkpoint": "Explores and experiments with objects in various ways.",
        "Area": "Cognitive Development"
      },
      {
        "id": 9,
        "checkpoint": "Shows interest in books and may turn pages.",
        "Area": "Literacy Skills"
      },
      {
        "id": 10,
        "checkpoint": "Displays increased social interaction and initiates play with others.",
        "Area": "Social Skills"
      }
    ]
  },
  {
    "month": 12,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Takes first independent steps and begins to walk.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Says a few simple words and understands basic instructions.",
        "Area": "Language Skills"
      },
      {
        "id": 3,
        "checkpoint": "Uses gestures like pointing or waving to communicate.",
        "Area": "Communication Skills"
      },
      {
        "id": 4,
        "checkpoint": "Begins to imitate familiar actions and sounds.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 5,
        "checkpoint": "Enjoys simple pretend play, such as feeding a doll or stuffed animal.",
        "Area": "Social Skills"
      },
      {
        "id": 6,
        "checkpoint": "Can stack blocks or toys on top of each other.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 7,
        "checkpoint": "Drinks from a cup with some assistance.",
        "Area": "Self-Feeding Skills"
      },
      {
        "id": 8,
        "checkpoint": "Shows attachment to primary caregivers and displays separation anxiety.",
        "Area": "Emotional Development"
      },
      {
        "id": 9,
        "checkpoint": "Begins to show preference for certain toys or activities.",
        "Area": "Play Preferences"
      },
      {
        "id": 10,
        "checkpoint": "Follows simple routines and understands basic concepts like \"in\" and \"out\".",
        "Area": "Cognitive Skills"
      }
    ]
  },
  {
    "month": 13,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Walks independently without support.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses simple gestures like waving \"bye-bye\" or nodding/shaking head.",
        "Area": "Social Skills"
      },
      {
        "id": 3,
        "checkpoint": "Begins to say a few words and understands simple instructions.",
        "Area": "Language Skills"
      },
      {
        "id": 4,
        "checkpoint": "Attempts to feed self with a spoon and drink from a cup.",
        "Area": "Self-Feeding Skills"
      },
      {
        "id": 5,
        "checkpoint": "Explores objects by stacking, sorting, and nesting.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 6,
        "checkpoint": "Enjoys imitating others and playing simple pretend games.",
        "Area": "Social Skills"
      },
      {
        "id": 7,
        "checkpoint": "Points to objects of interest and shows increased curiosity.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 8,
        "checkpoint": "Shows interest in picture books and turns pages.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 9,
        "checkpoint": "Begins to scribble and make marks with crayons.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 10,
        "checkpoint": "Engages in interactive play with caregivers and peers.",
        "Area": "Social Skills"
      }
    ]
  },
  {
    "month": 14,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Takes independent steps and begins to walk.",
        "Area": "Gross Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses simple gestures, such as waving or pointing.",
        "Area": "Social Skills"
      },
      {
        "id": 3,
        "checkpoint": "Begins to say a few recognizable words.",
        "Area": "Language Skills"
      },
      {
        "id": 4,
        "checkpoint": "Shows interest in imitating actions and play.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 5,
        "checkpoint": "Enjoys playing with simple puzzles and stacking blocks.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 6,
        "checkpoint": "Feeds self with a spoon and drinks from a cup with assistance.",
        "Area": "Self-Feeding Skills"
      },
      {
        "id": 7,
        "checkpoint": "Understands and follows simple instructions.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 8,
        "checkpoint": "Engages in pretend play and imitates everyday activities.",
        "Area": "Social Skills"
      },
      {
        "id": 9,
        "checkpoint": "Shows curiosity and explores objects using all senses.",
        "Area": "Sensory Development"
      },
      {
        "id": 10,
        "checkpoint": "Begins to scribble or make marks on paper.",
        "Area": "Fine Motor Skills"
      }
    ]
  },
  {
    "month": 15,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Walks independently and begins to run.",
        "Area": "Gross Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses simple gestures like pointing or waving.",
        "Area": "Communication Skills"
      },
      {
        "id": 3,
        "checkpoint": "Says a few words and understands simple instructions.",
        "Area": "Language Skills"
      },
      {
        "id": 4,
        "checkpoint": "Stacks blocks or toys.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 5,
        "checkpoint": "Begins to use a spoon or fork for self-feeding.",
        "Area": "Self-Feeding Skills"
      },
      {
        "id": 6,
        "checkpoint": "Scribbles with a crayon or marker.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 7,
        "checkpoint": "Shows interest in pretend play and imitates everyday activities.",
        "Area": "Imaginative Play"
      },
      {
        "id": 8,
        "checkpoint": "Follows simple routines and recognizes familiar objects.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 9,
        "checkpoint": "Enjoys listening to simple stories or rhymes.",
        "Area": "Language Skills"
      },
      {
        "id": 10,
        "checkpoint": "Shows increased independence and attempts to dress or undress with assistance.",
        "Area": "Self-Help Skills"
      }
    ]
  },
  {
    "month": 16,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Walks independently, without assistance.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Begins to use simple words and understands basic instructions.",
        "Area": "Language Skills"
      },
      {
        "id": 3,
        "checkpoint": "Scribbles with a crayon or pencil.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 4,
        "checkpoint": "Points to body parts when named.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 5,
        "checkpoint": "Shows interest in pretend play and imitates actions.",
        "Area": "Social Skills"
      },
      {
        "id": 6,
        "checkpoint": "Uses simple gestures, such as waving goodbye or shaking head.",
        "Area": "Social Skills"
      },
      {
        "id": 7,
        "checkpoint": "Begins to stack blocks or toys.",
        "Area": "Motor Skills"
      },
      {
        "id": 8,
        "checkpoint": "Shows signs of increased independence and asserts preferences.",
        "Area": "Social Skills"
      },
      {
        "id": 9,
        "checkpoint": "Enjoys looking at picture books and turning pages.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 10,
        "checkpoint": "Engages in parallel play alongside other children.",
        "Area": "Social Skills"
      }
    ]
  },
  {
    "month": 17,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Walks up and down stairs with assistance.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses at least six to ten words consistently.",
        "Area": "Language Skills"
      },
      {
        "id": 3,
        "checkpoint": "Begins to engage in imaginative play, such as feeding a doll.",
        "Area": "Social Skills"
      },
      {
        "id": 4,
        "checkpoint": "Shows increased dexterity in manipulating small objects.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 5,
        "checkpoint": "Begins to show understanding of simple questions and commands.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 6,
        "checkpoint": "Scribbles with purpose and control.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 7,
        "checkpoint": "Enjoys playing with other children and attempts to interact.",
        "Area": "Social Skills"
      },
      {
        "id": 8,
        "checkpoint": "Follows simple routines and transitions with guidance.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 9,
        "checkpoint": "Shows interest in helping with simple tasks, such as picking up toys.",
        "Area": "Social Skills"
      },
      {
        "id": 10,
        "checkpoint": "Explores the environment more actively and curiously.",
        "Area": "Cognitive Skills"
      }
    ]
  },
  {
    "month": 18,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Runs with more control and coordination.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Begins to use two-word phrases or simple sentences.",
        "Area": "Language Skills"
      },
      {
        "id": 3,
        "checkpoint": "Helps with simple tasks, such as putting toys away.",
        "Area": "Social Skills"
      },
      {
        "id": 4,
        "checkpoint": "Points to objects of interest and asks for them by name.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 5,
        "checkpoint": "Shows increased curiosity and explores surroundings more independently.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 6,
        "checkpoint": "Begins to sort shapes and objects based on similarities.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 7,
        "checkpoint": "Enjoys imitating actions and behaviors of others.",
        "Area": "Social Skills"
      },
      {
        "id": 8,
        "checkpoint": "Starts to use a spoon and drink from a cup with assistance.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Engages in pretend play and uses objects in symbolic ways.",
        "Area": "Social Skills"
      },
      {
        "id": 10,
        "checkpoint": "Shows increased social awareness and interacts with peers during play.",
        "Area": "Social Skills"
      }
    ]
  },
  {
    "month": 19,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Runs and climbs with increased coordination and balance.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses at least 10 words and attempts to combine words.",
        "Area": "Language Skills"
      },
      {
        "id": 3,
        "checkpoint": "Begins to show interest in toilet training.",
        "Area": "Self-care Skills"
      },
      {
        "id": 4,
        "checkpoint": "Throws a ball with increasing accuracy.",
        "Area": "Motor Skills"
      },
      {
        "id": 5,
        "checkpoint": "Scribbles with purpose and tries to draw simple shapes.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 6,
        "checkpoint": "Uses a spoon and fork with assistance.",
        "Area": "Self-care Skills"
      },
      {
        "id": 7,
        "checkpoint": "Shows signs of pretend play with toys.",
        "Area": "Social Skills"
      },
      {
        "id": 8,
        "checkpoint": "Follows simple instructions and understands simple questions.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 9,
        "checkpoint": "Points to objects when named.",
        "Area": "Language Skills"
      },
      {
        "id": 10,
        "checkpoint": "Enjoys looking at and identifying familiar objects in books.",
        "Area": "Cognitive Skills"
      }
    ]
  },
  {
    "month": 20,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Uses 2-3 word phrases to communicate needs and desires.",
        "Area": "Language Skills"
      },
      {
        "id": 2,
        "checkpoint": "Runs and climbs with more confidence and coordination.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Begins to sort objects by shape or color.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 4,
        "checkpoint": "Shows interest in using utensils and attempts to feed self.",
        "Area": "Self-Help Skills"
      },
      {
        "id": 5,
        "checkpoint": "Engages in pretend play with toys and imitates everyday activities.",
        "Area": "Social Skills"
      },
      {
        "id": 6,
        "checkpoint": "Points to pictures or objects when named.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 7,
        "checkpoint": "Begins to recognize and identify familiar objects and people.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 8,
        "checkpoint": "Shows improved fine motor skills, such as stacking blocks or fitting shapes into corresponding holes.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Follows simple instructions and understands basic concepts like 'big' and 'small'.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 10,
        "checkpoint": "Demonstrates increasing curiosity and explores surroundings more independently.",
        "Area": "Cognitive Skills"
      }
    ]
  },
  {
    "month": 21,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Runs and walks confidently, with improved balance.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses 2-3 word phrases to express thoughts or needs.",
        "Area": "Language Skills"
      },
      {
        "id": 3,
        "checkpoint": "Begins to sort objects by shape or color.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 4,
        "checkpoint": "Shows interest in using utensils and attempts to feed self.",
        "Area": "Self-Help Skills"
      },
      {
        "id": 5,
        "checkpoint": "Imitates more complex actions and role-plays.",
        "Area": "Social Skills"
      },
      {
        "id": 6,
        "checkpoint": "Points to pictures in books and identifies simple objects.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 7,
        "checkpoint": "Follows simple instructions with 2-3 steps.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 8,
        "checkpoint": "Engages in pretend play with dolls, stuffed animals, or toys.",
        "Area": "Social Skills"
      },
      {
        "id": 9,
        "checkpoint": "Begins to use a spoon or fork with some success.",
        "Area": "Self-Help Skills"
      },
      {
        "id": 10,
        "checkpoint": "Demonstrates increasing curiosity and asks simple questions.",
        "Area": "Cognitive Skills"
      }
    ]
  },
  {
    "month": 22,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Runs and climbs with improved coordination and balance.",
        "Area": "Motor Skills"
      },
      {
        "id": 2,
        "checkpoint": "Uses two-word phrases and attempts to communicate in short sentences.",
        "Area": "Language Skills"
      },
      {
        "id": 3,
        "checkpoint": "Shows interest in toilet training and may start to use a potty.",
        "Area": "Self-Care Skills"
      },
      {
        "id": 4,
        "checkpoint": "Sorts objects by shape or color.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 5,
        "checkpoint": "Engages in imaginative play with dolls, stuffed animals, or toys.",
        "Area": "Social Skills"
      },
      {
        "id": 6,
        "checkpoint": "Begins to follow simple instructions and understands basic rules.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 7,
        "checkpoint": "Shows increased curiosity and asks questions using \"why\" and \"what.\"",
        "Area": "Cognitive Skills"
      },
      {
        "id": 8,
        "checkpoint": "Begins to use utensils and attempts to feed self independently.",
        "Area": "Self-Care Skills"
      },
      {
        "id": 9,
        "checkpoint": "Shows affection towards familiar people and seeks comfort when upset.",
        "Area": "Emotional Development"
      },
      {
        "id": 10,
        "checkpoint": "Demonstrates improved hand-eye coordination and scribbles with purpose.",
        "Area": "Fine Motor Skills"
      }
    ]
  },
  {
    "month": 23,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Speaks in short sentences and is understood by familiar adults.",
        "Area": "Language Skills"
      },
      {
        "id": 2,
        "checkpoint": "Runs, jumps, and climbs with coordination and balance.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Uses a spoon and fork to feed self independently.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 4,
        "checkpoint": "Engages in imaginative play, such as pretending to be a character.",
        "Area": "Social Skills"
      },
      {
        "id": 5,
        "checkpoint": "Begins to sort objects by shape or color.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 6,
        "checkpoint": "Follows simple instructions and understands basic concepts (big, small, up, down).",
        "Area": "Cognitive Skills"
      },
      {
        "id": 7,
        "checkpoint": "Names common objects and animals.",
        "Area": "Language Skills"
      },
      {
        "id": 8,
        "checkpoint": "Builds towers with more than four blocks.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 9,
        "checkpoint": "Shows increased curiosity and asks questions.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 10,
        "checkpoint": "Engages in cooperative play with other children.",
        "Area": "Social Skills"
      }
    ]
  },
  {
    "month": 24,
    "milestones": [
      {
        "id": 1,
        "checkpoint": "Uses two-word phrases and simple sentences to communicate.",
        "Area": "Language Skills"
      },
      {
        "id": 2,
        "checkpoint": "Runs, jumps, and climbs with coordination and balance.",
        "Area": "Motor Skills"
      },
      {
        "id": 3,
        "checkpoint": "Begins to sort objects by shape or color.",
        "Area": "Cognitive Skills"
      },
      {
        "id": 4,
        "checkpoint": "Begins to use utensils and feed self with minimal assistance.",
        "Area": "Self-Help Skills"
      },
      {
        "id": 5,
        "checkpoint": "Engages in imaginative play and role-playing.",
        "Area": "Social Skills"
      },
      {
        "id": 6,
        "checkpoint": "Shows interest in potty training and may start to use a potty chair.",
        "Area": "Self-Help Skills"
      },
      {
        "id": 7,
        "checkpoint": "Names familiar objects and people.",
        "Area": "Language Skills"
      },
      {
        "id": 8,
        "checkpoint": "Follows simple instructions and understands basic concepts (e.g., big/small, up/down).",
        "Area": "Cognitive Skills"
      },
      {
        "id": 9,
        "checkpoint": "Builds towers with several blocks.",
        "Area": "Fine Motor Skills"
      },
      {
        "id": 10,
        "checkpoint": "Demonstrates increased curiosity and asks \"why\" questions.",
        "Area": "Cognitive Skills"
      }
    ]
  }
]

        # Clear existing data
        Milestone.objects.all().delete()

        # Load new data
        for item in data:
            month = item['month']
            milestones = item['milestones']
            for milestone in milestones:
                Milestone.objects.create(
                    month=month,
                    description=milestone['checkpoint'],
                    area=milestone['Area']
                )

        self.stdout.write(self.style.SUCCESS('Successfully loaded all milestones.'))