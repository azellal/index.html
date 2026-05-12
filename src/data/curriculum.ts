import { GradeData } from '../types';

export const curriculum: GradeData[] = [
  {
    grade: '1A',
    themes: [
      {
        id: '1a-vocab',
        title: 'Vocabulaire : Ma Vie',
        lessons: [
          {
            id: '1a-v1',
            title: 'Ma Famille',
            description: 'Les noms des membres de la famille.',
            icon: 'Users',
            exercises: [
              {
                id: '1a-v1-e1',
                type: 'multiple-choice',
                question: 'La maman de mon papa est ma...',
                options: ['Grand-mère', 'Tante', 'Sœur'],
                correctAnswer: 'Grand-mère'
              },
              {
                id: '1a-v1-e2',
                type: 'multiple-choice',
                question: 'Le fils de mes parents est mon...',
                options: ['Père', 'Frère', 'Oncle'],
                correctAnswer: 'Frère'
              },
              {
                id: '1a-v1-listening',
                type: 'listening',
                audioPrompt: 'Ma maman est gentille',
                question: 'Qu\'as-tu entendu ?',
                options: ['Ma maman', 'Mon papa', 'Ma soeur'],
                correctAnswer: 'Ma maman'
              }
            ]
          },
          {
            id: '1a-v2',
            title: 'Les Couleurs',
            description: 'Apprendre les couleurs de base.',
            icon: 'Palette',
            exercises: [
              {
                id: '1a-v2-e1',
                type: 'multiple-choice',
                question: 'De quelle couleur est le ciel ?',
                options: ['Rouge', 'Bleu', 'Vert'],
                correctAnswer: 'Bleu'
              },
              {
                id: '1a-v2-e2',
                type: 'multiple-choice',
                question: 'La banane est...',
                options: ['Jaune', 'Noire', 'Rose'],
                correctAnswer: 'Jaune'
              },
              {
                id: '1a-v2-listening',
                type: 'listening',
                audioPrompt: 'Le ciel est bleu',
                question: 'Qu\'as-tu entendu ?',
                options: ['Le ciel est bleu', 'Le ciel est gris', 'Le ciel est noir'],
                correctAnswer: 'Le ciel est bleu'
              },
              {
                id: '1a-v2-imposter',
                type: 'imposter',
                question: 'Trouve l\'intrus !',
                options: ['Banane', 'Pomme', 'Bleu', 'Fraise'],
                correctAnswer: 'Bleu'
              }
            ]
          },
          {
            id: '1a-game-crossword',
            title: 'Jeu : Mots Croisés',
            description: 'Retrouve les mots de la famille et les couleurs !',
            icon: 'Grid3X3',
            exercises: [
              {
                id: '1a-crossword-1',
                type: 'crossword',
                question: 'Complète la grille en utilisant les indices !',
                correctAnswer: 'FAMILY_COLORS',
                clues: [
                  { word: 'ROSE', clue: 'Une couleur comme une fleur', orientation: 'across', row: 0, col: 0 },
                  { word: 'SOEUR', clue: 'La fille de mes parents', orientation: 'down', row: 0, col: 2 },
                  { word: 'ROUGE', clue: 'La couleur de la tomate', orientation: 'across', row: 4, col: 2 }
                ]
              }
            ]
          },
          {
            id: '1a-game-1',
            title: 'Défi : Couleurs & Formes',
            description: 'Un jeu rapide pour tester tes réflexes !',
            icon: 'Zap',
            exercises: [
              {
                id: '1a-g1-e1',
                type: 'multiple-choice',
                question: 'La tomate est ___ ?',
                options: ['Rouge', 'Verte', 'Bleue'],
                correctAnswer: 'Rouge'
              },
              {
                id: '1a-g1-e2',
                type: 'multiple-choice',
                question: 'Le soleil est un ___ ?',
                options: ['Carré', 'Triangle', 'Cercle'],
                correctAnswer: 'Cercle'
              }
            ]
          }
        ]
      },
      {
        id: '1a-stories',
        title: 'Le Coin des Histoires',
        lessons: [
          {
            id: '1a-story-1',
            title: 'Le Petit Lapin qui Partageait',
            description: 'Une histoire sur la générosité.',
            icon: 'BookOpen',
            storyContent: {
              text: 'Il était une fois un petit lapin nommé Frisquet. Il avait beaucoup de carottes délicieuses. Un jour, il vit son ami l\'écureuil qui avait très faim. Frisquet décida de partager ses carottes. Ils mangèrent ensemble et furent très heureux.',
              moral: 'Partager avec ses amis rend le cœur joyeux !',
              image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&q=80'
            },
            exercises: [
              {
                id: '1a-s1-e1',
                type: 'multiple-choice',
                question: 'Qu\'est-ce que Frisquet a partagé ?',
                options: ['Ses pommes', 'Ses carottes', 'Ses jouets'],
                correctAnswer: 'Ses carottes'
              }
            ]
          },
          {
            id: '1a-video-1',
            title: 'La Politesse en Chanson',
            description: 'Apprendre à dire "Bonjour" et "Merci".',
            icon: 'Video',
            videoUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
            exercises: [
              {
                id: '1a-v1-e1',
                type: 'multiple-choice',
                question: 'Que faut-il dire quand on reçoit un cadeau ?',
                options: ['Bonjour', 'Merci', 'Au revoir'],
                correctAnswer: 'Merci'
              }
            ]
          }
        ]
      },
      {
        id: '1a-gram',
        title: 'Grammaire : Les Bases',
        lessons: [
          {
            id: '1a-g1',
            title: 'Le ou La ?',
            description: 'Choisir le bon article défini.',
            icon: 'Settings2',
            exercises: [
              {
                id: '1a-g1-e1',
                type: 'multiple-choice',
                question: '___ table',
                options: ['Le', 'La'],
                correctAnswer: 'La'
              },
              {
                id: '1a-g1-e2',
                type: 'multiple-choice',
                question: '___ stylo',
                options: ['Le', 'La'],
                correctAnswer: 'Le'
              },
              {
                id: '1a-g1-e3',
                type: 'multiple-choice',
                question: '___ pomme',
                options: ['Un', 'Une'],
                correctAnswer: 'Une'
              },
              {
                id: '1a-g1-listening',
                type: 'listening',
                audioPrompt: 'Une pomme rouge',
                question: 'Quel article entends-tu ?',
                options: ['Un', 'Une'],
                correctAnswer: 'Une'
              }
            ]
          }
        ]
      },
      {
        id: '1a-comm',
        title: 'Communication : Saluer',
        lessons: [
          {
            id: '1a-c1-comm',
            title: 'Dire Bonjour',
            description: 'Apprendre à saluer ses amis.',
            icon: 'Smile',
            exercises: [
              {
                id: '1a-c1-comm-e1',
                type: 'multiple-choice',
                question: 'Quand je vois un ami le matin, je dis...',
                options: ['Bonjour', 'Bonne nuit', 'Au revoir'],
                correctAnswer: 'Bonjour'
              },
              {
                id: '1a-c1-comm-e2',
                type: 'multiple-choice',
                question: 'Comment on dit "Hello" en français ?',
                options: ['Salut', 'Merci', 'S\'il vous plaît'],
                correctAnswer: 'Salut'
              },
              {
                id: '1a-c1-listening',
                type: 'listening',
                audioPrompt: 'Bonjour tout le monde',
                question: 'Écoute et choisis le mot de salutation :',
                options: ['Bonjour', 'Bonsoir', 'Au revoir'],
                correctAnswer: 'Bonjour'
              }
            ]
          }
        ]
      },
      {
        id: '1a-test',
        title: 'Tests & Jeux : Niveau 1',
        lessons: [
          {
            id: '1a-t1',
            title: 'Évaluation Globale',
            description: 'Vérifie tes connaissances de la 1ère année.',
            icon: 'Trophy',
            exercises: [
              {
                id: '1a-t1-e1',
                type: 'multiple-choice',
                question: 'Quel est l\'article pour "livre" ?',
                options: ['Le', 'La'],
                correctAnswer: 'Le'
              },
              {
                id: '1a-t1-e2',
                type: 'multiple-choice',
                question: 'Quelle couleur est le soleil ?',
                options: ['Jaune', 'Bleu', 'Vert'],
                correctAnswer: 'Jaune'
              },
              {
                id: '1a-t1-e3',
                type: 'multiple-choice',
                question: 'Papa est un...',
                options: ['Garçon', 'Fille'],
                correctAnswer: 'Garçon'
              },
              {
                id: '1a-t1-listening',
                type: 'listening',
                audioPrompt: 'Je suis un élève de première année',
                question: 'Qu\'as-tu entendu ?',
                options: ['Première année', 'Deuxième année', 'Troisième année'],
                correctAnswer: 'Première année'
              }
            ]
          },
          {
            id: '1a-game-imposter',
            title: 'Jeu : Trouve l\'Intrus !',
            description: 'Lequel n\'appartient pas à la famille ?',
            icon: 'Ghost',
            exercises: [
              {
                id: '1a-gi-1',
                type: 'multiple-choice',
                question: 'Lequel est l\'imposteure ? (L\'intrus)',
                options: ['Le frère', 'La tante', 'Le robot'],
                correctAnswer: 'Le robot'
              },
              {
                id: '1a-gi-2',
                type: 'multiple-choice',
                question: 'Qui n\'est pas un animal ?',
                options: ['Le chat', 'La table', 'Le chien'],
                correctAnswer: 'La table'
              },
              {
                id: '1a-gi-listening',
                type: 'listening',
                audioPrompt: 'Le chat miaule sur le toit',
                question: 'Quel animal entends-tu ?',
                options: ['Le chat', 'Le chien', 'L\'oiseau'],
                correctAnswer: 'Le chat'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: '2A',
    themes: [
      {
        id: '2a-vocab',
        title: 'Vocabulaire : L\'École',
        lessons: [
          {
            id: '2a-v1',
            title: 'Fournitures Scolaires',
            description: 'Les objets de la trousse et du sac.',
            icon: 'School',
            exercises: [
              {
                id: '2a-v1-e1',
                type: 'multiple-choice',
                question: 'Pour gommer, j\'utilise...',
                options: ['Une règle', 'Une gomme', 'Un crayon'],
                correctAnswer: 'Une gomme'
              },
              {
                id: '2a-v1-e2',
                type: 'multiple-choice',
                question: 'Je range mes crayons dans...',
                options: ['La trousse', 'Le cartable', 'Le bureau'],
                correctAnswer: 'La trousse'
              },
              {
                id: '2a-v1-listening',
                type: 'listening',
                audioPrompt: 'Un stylo bleu',
                question: 'Qu\'as-tu entendu ?',
                options: ['Un stylo bleu', 'Une règle rouge', 'Un sac vert'],
                correctAnswer: 'Un stylo bleu'
              }
            ]
          },
          {
            id: '2a-game-imposter',
            title: 'Mini-Jeu : L\'Intrus de Classe',
            description: 'Repère l\'objet qui n\'a rien à faire ici !',
            icon: 'Target',
            exercises: [
              {
                id: '2a-gi-1',
                type: 'multiple-choice',
                question: 'Cherche l\'imposteur de la classe :',
                options: ['Le stylo', 'Le lit', 'Le tableau'],
                correctAnswer: 'Le lit'
              },
              {
                id: '2a-gi-2',
                type: 'multiple-choice',
                question: 'Trouve l\'intrus scolaire :',
                options: ['La règle', 'Le sac', 'Le ballon'],
                correctAnswer: 'Le ballon'
              },
              {
                id: '2a-gi-listening',
                type: 'listening',
                audioPrompt: 'Le tableau est grand',
                question: 'Quel objet de la classe as-tu entendu ?',
                options: ['Le tableau', 'Le bureau', 'La gomme'],
                correctAnswer: 'Le tableau'
              }
            ]
          },
          {
            id: '2a-v2',
            title: 'Les Vêtements',
            description: 'Identifier ce que l\'on porte.',
            icon: 'Shirt',
            exercises: [
              {
                id: '2a-v2-e1',
                type: 'multiple-choice',
                question: 'Papa porte une ___ pour travailler.',
                options: ['Cravate', 'Jupe', 'Chaussette'],
                correctAnswer: 'Cravate'
              },
              {
                id: '2a-v2-listening',
                type: 'listening',
                audioPrompt: 'Je mets mes chaussures',
                question: 'Quel vêtement entends-tu ?',
                options: ['Chaussures', 'Chapeau', 'Chemise'],
                correctAnswer: 'Chaussures'
              }
            ]
          }
        ]
      },
      {
        id: '2a-games',
        title: 'Activités & Jeux',
        lessons: [
          {
            id: '2a-game-1',
            title: 'Jeu : Le Tri Fou',
            description: 'Trie les objets rapidement !',
            icon: 'Activity',
            exercises: [
              {
                id: '2a-g1-e1',
                type: 'multiple-choice',
                question: 'Lequel est un fruit ?',
                options: ['Pomme', 'Stylo', 'Chaise'],
                correctAnswer: 'Pomme'
              },
              {
                id: '2a-g1-e2',
                type: 'multiple-choice',
                question: 'Lequel est un vêtement ?',
                options: ['Pantalon', 'Tableau', 'Livre'],
                correctAnswer: 'Pantalon'
              },
              {
                id: '2a-g1-listening-game',
                type: 'listening',
                audioPrompt: 'Une pomme rouge et un pantalon bleu',
                question: 'Écoute bien. Qu\'est-ce qui est bleu ?',
                options: ['La pomme', 'Le pantalon', 'Le ciel'],
                correctAnswer: 'Le pantalon'
              }
            ]
          }
        ]
      },
      {
        id: '2a-stories',
        title: 'Coin des Histoires',
        lessons: [
          {
            id: '2a-story-1',
            title: 'Le Lion et la Souris',
            description: 'Une fable sur l\'entraide.',
            icon: 'BookOpen',
            storyContent: {
              text: 'Un lion épargna une petite souris. Plus tard, le lion fut pris dans un filet de chasseur. La petite souris rongea les cordes et libéra le lion. Elle lui montra que même les plus petits peuvent aider les plus grands.',
              moral: 'On a souvent besoin d\'un plus petit que soi.',
              image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80'
            },
            exercises: [
              {
                id: '2a-s1-e1',
                type: 'multiple-choice',
                question: 'Qui a sauvé le lion ?',
                options: ['Le chasseur', 'La souris', 'Un autre lion'],
                correctAnswer: 'La souris'
              }
            ]
          }
        ]
      },
      {
        id: '2a-comm',
        title: 'Communication : Dialogues',
        lessons: [
          {
            id: '2a-c1-comm',
            title: 'Se Présenter',
            description: 'Dire son nom et son âge.',
            icon: 'MessageSquare',
            exercises: [
              {
                id: '2a-c1-comm-e1',
                type: 'multiple-choice',
                question: 'Comment on demande le nom ?',
                options: ['Comment t\'appelles-tu ?', 'Où vas-tu ?', 'Quel âge as-tu ?'],
                correctAnswer: 'Comment t\'appelles-tu ?'
              },
              {
                id: '2a-c1-comm-e2',
                type: 'multiple-choice',
                question: 'La réponse à "Ça va ?" est...',
                options: ['Ça va bien, merci', 'Je m\'appelle Jean', 'J\'ai 8 ans'],
                correctAnswer: 'Ça va bien, merci'
              },
              {
                id: '2a-c1-listening',
                type: 'listening',
                audioPrompt: 'Enchanté de faire ta connaissance',
                question: 'Écoute et répète mentalement. Quel sentiment est exprimé ?',
                options: ['La rencontre', 'La colère', 'La peur'],
                correctAnswer: 'La rencontre'
              }
            ]
          }
        ]
      },
      {
        id: '2a-conj',
        title: 'Conjugaison : Présent',
        lessons: [
          {
            id: '2a-c1',
            title: 'Le verbe Être',
            description: 'Conjuguer être au présent.',
            icon: 'Zap',
            exercises: [
              {
                id: '2a-c1-e1',
                type: 'multiple-choice',
                question: 'Je ___ content.',
                options: ['suis', 'es', 'est'],
                correctAnswer: 'suis'
              },
              {
                id: '2a-c1-e2',
                type: 'multiple-choice',
                question: 'Tu ___ un champion.',
                options: ['suis', 'es', 'est'],
                correctAnswer: 'es'
              },
              {
                id: '2a-c1-e3',
                type: 'multiple-choice',
                question: 'Nous ___ des amis.',
                options: ['sommes', 'êtes', 'sont'],
                correctAnswer: 'sommes'
              },
              {
                id: '2a-c1-listening',
                type: 'listening',
                audioPrompt: 'Nous sommes à l\'école',
                question: 'Quel verbe entends-tu ?',
                options: ['Sommes', 'Sommeil', 'Sommet'],
                correctAnswer: 'Sommes'
              }
            ]
          },
          {
            id: '2a-c2',
            title: 'Le verbe Avoir',
            description: 'Conjuguer avoir au présent.',
            icon: 'Zap',
            exercises: [
              {
                id: '2a-c2-e1',
                type: 'multiple-choice',
                question: 'J\'___ un livre.',
                options: ['ai', 'as', 'a'],
                correctAnswer: 'ai'
              },
              {
                id: '2a-c2-e2',
                type: 'multiple-choice',
                question: 'Ils ___ faim.',
                options: ['ont', 'avez', 'avons'],
                correctAnswer: 'ont'
              },
              {
                id: '2a-c2-listening',
                type: 'listening',
                audioPrompt: 'Ils ont soif',
                question: 'Qu\'est-ce qu\'ils ont ?',
                options: ['Soif', 'Faim', 'Froid'],
                correctAnswer: 'Soif'
              }
            ]
          }
        ]
      },
      {
        id: '2a-gram',
        title: 'Grammaire : Le Pluriel',
        lessons: [
          {
            id: '2a-g1',
            title: 'Singulier et Pluriel',
            description: 'Utiliser "les" et le "s" final.',
            icon: 'Settings2',
            exercises: [
              {
                id: '2a-g1-e1',
                type: 'multiple-choice',
                question: 'Le pluriel de "le chat" est...',
                options: ['Les chats', 'Le chats', 'Les chat'],
                correctAnswer: 'Les chats'
              },
              {
                id: '2a-g1-listening',
                type: 'listening',
                audioPrompt: 'Les oiseaux chantent',
                question: 'Le mot "oiseaux" est-il au :',
                options: ['Singulier', 'Pluriel'],
                correctAnswer: 'Pluriel'
              }
            ]
          }
        ]
      },
      {
        id: '2a-test',
        title: 'Test Final : Niveau 2',
        lessons: [
          {
            id: '2a-t1',
            title: 'Évaluation Globale',
            description: 'Vérifie tes connaissances de la 2ème année.',
            icon: 'Trophy',
            exercises: [
              {
                id: '2a-t1-e1',
                type: 'multiple-choice',
                question: 'Nous ___ à l\'école.',
                options: ['sommes', 'êtes', 'sont'],
                correctAnswer: 'sommes'
              },
              {
                id: '2a-t1-e2',
                type: 'multiple-choice',
                question: 'Le pluriel de "une fleur" est...',
                options: ['Des fleurs', 'La fleurs', 'Une fleurs'],
                correctAnswer: 'Des fleurs'
              },
              {
                id: '2a-t1-e3',
                type: 'multiple-choice',
                question: 'J\'écris avec mon...',
                options: ['Crayon', 'Gomme', 'Bureau'],
                correctAnswer: 'Crayon'
              },
              {
                id: '2a-t1-listening',
                type: 'listening',
                audioPrompt: 'Demain il y aura du soleil',
                question: 'Quel temps fera-t-il ?',
                options: ['Pluie', 'Soleil', 'Neige'],
                correctAnswer: 'Soleil'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: '3A',
    themes: [
      {
        id: '3a-vocab',
        title: 'Vocabulaire : Métiers',
        lessons: [
          {
            id: '3a-v1',
            title: 'Les Professions',
            description: 'Qui fait quoi ?',
            icon: 'Users',
            exercises: [
              {
                id: '3a-v1-e1',
                type: 'multiple-choice',
                question: 'Celui qui soigne les malades est le...',
                options: ['Médecin', 'Boulanger', 'Pilote'],
                correctAnswer: 'Médecin'
              },
              {
                id: '3a-v1-listening',
                type: 'listening',
                audioPrompt: 'Le boulanger prépare le pain',
                question: 'Qui prépare le pain ?',
                options: ['Le mécanicien', 'Le boulanger', 'Le boucher'],
                correctAnswer: 'Le boulanger'
              }
            ]
          }
        ]
      },
      {
        id: '3a-gram',
        title: 'Grammaire : Adjectifs',
        lessons: [
          {
            id: '3a-g1',
            title: 'L\'adjectif qualificatif',
            description: 'Décrire des objets ou des personnes.',
            icon: 'AlignLeft',
            exercises: [
              {
                id: '3a-g1-e1',
                type: 'multiple-choice',
                question: 'Dans "La petite fille", quel est l\'adjectif ?',
                options: ['La', 'petite', 'fille'],
                correctAnswer: 'petite'
              },
              {
                id: '3a-g1-listening',
                type: 'listening',
                audioPrompt: 'C\'est un grand arbre vert',
                question: 'Quels adjectifs as-tu entendus ?',
                options: ['Grand et vert', 'Petit et rouge', 'Long et bleu'],
                correctAnswer: 'Grand et vert'
              }
            ]
          }
        ]
      },
      {
        id: '3a-conj',
        title: 'Conjugaison : 1er Groupe',
        lessons: [
          {
            id: '3a-c1',
            title: 'Présent en -er',
            description: 'Terminaisons e, es, e, ons, ez, ent.',
            icon: 'Activity',
            exercises: [
              {
                id: '3a-c1-e1',
                type: 'multiple-choice',
                question: 'Nous ___ (manger) une pomme.',
                options: ['mangeons', 'mangez', 'mangent'],
                correctAnswer: 'mangeons'
              },
              {
                id: '3a-c1-e2',
                type: 'multiple-choice',
                question: 'Ils ___ (jouer) ensemble.',
                options: ['joue', 'joues', 'jouent'],
                correctAnswer: 'jouent'
              },
              {
                id: '3a-c1-listening',
                type: 'listening',
                audioPrompt: 'Nous aimons beaucoup dessiner',
                question: 'Quelle activité entends-tu ?',
                options: ['Danser', 'Dessiner', 'Dormir'],
                correctAnswer: 'Dessiner'
              }
            ]
          }
        ]
      },
      {
        id: '3a-comm',
        title: 'Communication : À l\'École',
        lessons: [
          {
            id: '3a-c1-comm',
            title: 'Demander la permission',
            description: 'Expressions utiles en classe.',
            icon: 'MessageSquare',
            exercises: [
              {
                id: '3a-c1-comm-e1',
                type: 'multiple-choice',
                question: 'Puis-je ___ aux toilettes ?',
                options: ['aller', 'faire', 'jouer'],
                correctAnswer: 'aller'
              },
              {
                id: '3a-c1-comm-e2',
                type: 'multiple-choice',
                question: 'Pour demander un stylo, je dis...',
                options: ['Prête-moi ton stylo', 'Donne-moi ton sac', 'Regarde ma règle'],
                correctAnswer: 'Prête-moi ton stylo'
              },
              {
                id: '3a-c2-listening',
                type: 'listening',
                audioPrompt: 'S\'il vous plaît monsieur, je peux sortir ?',
                question: 'Que demande l\'élève ?',
                options: ['De sortir', 'De chanter', 'D\'écrire'],
                correctAnswer: 'De sortir'
              }
            ]
          }
        ]
      },
      {
        id: '3a-test',
        title: 'Test Final : Niveau 3',
        lessons: [
          {
            id: '3a-t1',
            title: 'Évaluation Globale',
            description: 'Vérifie tes connaissances de la 3ème année.',
            icon: 'Trophy',
            exercises: [
              {
                id: '3a-t1-e1',
                type: 'multiple-choice',
                question: 'Elle ___ (chanter) une chanson.',
                options: ['chante', 'chantes', 'chantent'],
                correctAnswer: 'chante'
              },
              {
                id: '3a-t1-e2',
                type: 'multiple-choice',
                question: 'L\'adjectif dans "Le grand arbre" est...',
                options: ['Le', 'grand', 'arbre'],
                correctAnswer: 'grand'
              },
              {
                id: '3a-t1-e3',
                type: 'multiple-choice',
                question: 'Le frère de ma mère est mon...',
                options: ['Oncle', 'Cousin', 'Père'],
                correctAnswer: 'Oncle'
              },
              {
                id: '3a-t1-listening',
                type: 'listening',
                audioPrompt: 'L\'école commence à huit heures',
                question: 'À quelle heure commence l\'école ?',
                options: ['7h00', '8h00', '9h00'],
                correctAnswer: '8h00'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: '4A',
    themes: [
      {
        id: '4a-vocab',
        title: 'Vocabulaire : Voyage & Nature',
        lessons: [
          {
            id: '4a-v1',
            title: 'Le Voyage',
            description: 'Moyens de transport et bagages.',
            icon: 'Plane',
            exercises: [
              {
                id: '4a-v1-e1',
                type: 'multiple-choice',
                question: 'Pour aller très loin et vite, on prend...',
                options: ['Le vélo', 'L\'avion', 'La marche'],
                correctAnswer: 'L\'avion'
              },
              {
                id: '4a-v1-imposter',
                type: 'imposter',
                question: 'Lequel n\'est pas un moyen de transport ?',
                options: ['Train', 'Bus', 'Chaise', 'Bateau'],
                correctAnswer: 'Chaise'
              },
              {
                id: '4a-v1-listening',
                type: 'listening',
                audioPrompt: 'Je prends le train pour voyager',
                question: 'Quel moyen de transport as-tu entendu ?',
                options: ['L\'avion', 'Le train', 'Le bus'],
                correctAnswer: 'Le train'
              }
            ]
          }
        ]
      },
      {
        id: '4a-gram',
        title: 'Grammaire : Accords',
        lessons: [
          {
            id: '4a-g1',
            title: 'Accord de l\'adjectif',
            description: 'Masculin, féminin, singulier, pluriel.',
            icon: 'AlignLeft',
            exercises: [
              {
                id: '4a-g1-e1',
                type: 'multiple-choice',
                question: 'Des fleurs ___ (beau).',
                options: ['beaux', 'belles', 'belle'],
                correctAnswer: 'belles'
              },
              {
                id: '4a-g1-listening',
                type: 'listening',
                audioPrompt: 'Les voitures sont rapides',
                question: 'L\'adjectif est-il au masculin ou féminin ?',
                options: ['Masculin', 'Féminin'],
                correctAnswer: 'Féminin'
              }
            ]
          }
        ]
      },
      {
        id: '4a-conj',
        title: 'Conjugaison : Imparfait',
        lessons: [
          {
            id: '4a-c1',
            title: 'L\'imparfait de l\'indicatif',
            description: 'Décrire le passé (ais, ais, ait...).',
            icon: 'History',
            exercises: [
              {
                id: '4a-c1-e1',
                type: 'multiple-choice',
                question: 'Quand j\'___ (être) petit...',
                options: ['étais', 'était', 'étois'],
                correctAnswer: 'étais'
              },
              {
                id: '4a-c1-listening',
                type: 'listening',
                audioPrompt: 'Tu parlais trop vite',
                question: 'Écoute et choisis la personne (sujet) :',
                options: ['Je', 'Tu', 'Il'],
                correctAnswer: 'Tu'
              }
            ]
          }
        ]
      },
      {
        id: '4a-test',
        title: 'Test Final : Niveau 4',
        lessons: [
          {
            id: '4a-t1',
            title: 'Évaluation Globale 4A',
            description: 'Es-tu prêt pour la 5ème année ?',
            icon: 'Trophy',
            exercises: [
              {
                id: '4a-t1-e1',
                type: 'multiple-choice',
                question: 'Comment s\'appelle l\'objet pour s\'orienter ?',
                options: ['Une boussole', 'Un miroir', 'Un livre'],
                correctAnswer: 'Une boussole'
              },
              {
                id: '4a-t1-listening',
                type: 'listening',
                audioPrompt: 'La nature est notre amie',
                question: 'Qu\'as-tu entendu ?',
                options: ['La nature est notre amie', 'La nature est belle', 'La nature est verte'],
                correctAnswer: 'La nature est notre amie'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: '5A',
    themes: [
      {
        id: '5a-vocab',
        title: 'Vocabulaire : Environnement',
        lessons: [
          {
            id: '5a-v1',
            title: 'Protéger la Terre',
            description: 'Écologie et recyclage.',
            icon: 'Leaf',
            exercises: [
              {
                id: '5a-v1-e1',
                type: 'multiple-choice',
                question: 'On doit ___ les déchets.',
                options: ['jeter', 'recycler', 'brûler'],
                correctAnswer: 'recycler'
              },
              {
                id: '5a-v1-listening',
                type: 'listening',
                audioPrompt: 'Il faut trier les déchets',
                question: 'Que faut-il faire ?',
                options: ['Brûler', 'Trier', 'Cacher'],
                correctAnswer: 'Trier'
              }
            ]
          }
        ]
      },
      {
        id: '5a-conj',
        title: 'Conjugaison : Futur Simple',
        lessons: [
          {
            id: '5a-c1',
            title: 'Le Futur',
            description: 'Actions à venir (rai, ras, ra...).',
            icon: 'FastForward',
            exercises: [
              {
                id: '5a-c1-e1',
                type: 'multiple-choice',
                question: 'Demain, je ___ (partir).',
                options: ['partirai', 'partira', 'partiray'],
                correctAnswer: 'partirai'
              },
              {
                id: '5a-c1-listening',
                type: 'listening',
                audioPrompt: 'Nous irons à la plage',
                question: 'Quel est le verbe ?',
                options: ['Irons', 'Allez', 'Allons'],
                correctAnswer: 'Irons'
              }
            ]
          }
        ]
      },
      {
        id: '5a-gram',
        title: 'Grammaire : Compléments',
        lessons: [
          {
            id: '5a-g1',
            title: 'COD et COI',
            description: 'Identifier les compléments d\'objet.',
            icon: 'Target',
            exercises: [
              {
                id: '5a-g1-e1',
                type: 'multiple-choice',
                question: 'Dans "Il mange une pomme", que mange-t-il ?',
                options: ['Il', 'mange', 'une pomme'],
                correctAnswer: 'une pomme'
              },
              {
                id: '5a-g1-listening',
                type: 'listening',
                audioPrompt: 'Elle écrit une lettre à son ami',
                question: 'À qui écrit-elle ?',
                options: ['À son père', 'À son ami', 'À sa mère'],
                correctAnswer: 'À son ami'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: '6A',
    themes: [
      {
        id: '6a-vocab',
        title: 'Vocabulaire : Citoyenneté',
        lessons: [
          {
            id: '6a-v1',
            title: 'Valeurs Universelles',
            description: 'Droits et devoirs du citoyen.',
            icon: 'UserCheck',
            exercises: [
              {
                id: '6a-v1-e1',
                type: 'multiple-choice',
                question: 'Voter est un ___ .',
                options: ['Devoir', 'Jeu', 'Droit'],
                correctAnswer: 'Droit'
              },
              {
                id: '6a-v1-listening',
                type: 'listening',
                audioPrompt: 'La paix est une valeur importante',
                question: 'Quelle valeur entends-tu ?',
                options: ['La guerre', 'La paix', 'La force'],
                correctAnswer: 'La paix'
              }
            ]
          }
        ]
      },
      {
        id: '6a-gram',
        title: 'Grammaire : COD, COI et Pronoms',
        lessons: [
          {
            id: '6a-g1',
            title: 'Mission COD : Le Complément d\'Objet Direct',
            description: 'Apprends à repérer le COD sans utiliser de miroir magique, en posant les questions "Qui ?" ou "Quoi ?".',
            icon: 'Target',
            storyContent: {
              text: 'Dans la forêt des mots, le verbe est roi, mais il a toujours besoin de son aide de camp : le Complément d\'Objet Direct (COD). Pour trouver ce fidèle compagnon, le détective pose toujours deux questions magiques juste après le verbe : "Qui ?" ou "Quoi ?". Par exemple : "Le chevalier combat (quoi ?) le dragon." Le dragon est le COD !',
              moral: 'Le COD complète le verbe directement, sans aucun petit mot (préposition) entre eux !',
              image: 'https://images.unsplash.com/photo-1598256989445-6a5fae8fa6ab?w=800&q=80'
            },
            exercises: [
              {
                id: '6a-g1-e1',
                type: 'multiple-choice',
                question: 'Dans la phrase "Karim appelle ses amis", trouve le COD en posant la question "Karim appelle qui ?".',
                options: ['Karim', 'appelle', 'ses amis'],
                correctAnswer: 'ses amis'
              },
              {
                id: '6a-g1-e2',
                type: 'multiple-choice',
                question: 'Dans "Je vois ma voisine", quel est le COD ?',
                options: ['Je', 'vois', 'ma voisine'],
                correctAnswer: 'ma voisine'
              },
              {
                id: '6a-g1-e3',
                type: 'multiple-choice',
                question: 'Lequel de ces groupes de mots est un COD ? "Le chat boit du lait."',
                options: ['Le chat', 'boit', 'du lait'],
                correctAnswer: 'du lait'
              },
              {
                id: '6a-g1-cw',
                type: 'crossword',
                question: 'Mots croisés : trouve les COD !',
                correctAnswer: 'BRAVO',
                clues: [
                  { word: 'AMIS', clue: 'Karim appelle ses...', orientation: 'across', row: 0, col: 0 },
                  { word: 'LAIT', clue: 'Le chat boit du...', orientation: 'down', row: 0, col: 2 },
                  { word: 'VOISINE', clue: 'Je vois ma...', orientation: 'across', row: 3, col: 0 }
                ]
              }
            ]
          },
          {
            id: '6a-g2',
            title: 'Mission COI : Le Complément d\'Objet Indirect',
            description: 'Découvre le COI, le complément qui se cache toujours derrière une préposition comme "à" ou "de".',
            icon: 'MessageCircle',
            storyContent: {
              text: 'Parfois, le verbe veut parler à quelqu\'un de spécial, mais il y a un garde à l\'entrée : c\'est la préposition ("à", "de", "pour"). Quand cette petite barrière est là, l\'aide de camp devient un Complément d\'Objet Indirect (COI) ! On le trouve en posant la question : "À qui ?", "À quoi ?", "De qui ?", "De quoi ?". Exemple : "Je parle (à qui ?) à mon voisin."',
              moral: 'Le COI est "indirect" parce qu\'il est séparé du verbe par une préposition !',
              image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80'
            },
            exercises: [
              {
                id: '6a-g2-e1',
                type: 'multiple-choice',
                question: 'Dans "Je parle à mon ami", trouve le COI en posant la question "Je parle à qui ?".',
                options: ['Je', 'parle', 'à mon ami'],
                correctAnswer: 'à mon ami'
              },
              {
                id: '6a-g2-e2',
                type: 'multiple-choice',
                question: 'Dans "Il se souvient de ses vacances", quel est le COI ?',
                options: ['Il', 'de ses vacances', 'se souvient'],
                correctAnswer: 'de ses vacances'
              },
              {
                id: '6a-g2-imposter',
                type: 'imposter',
                question: 'Lequel de ces compléments est DIRECT (COD) et va donc chasser les COI ?',
                options: ['à sa mère', 'de son frère', 'une lettre', 'aux enfants'],
                correctAnswer: 'une lettre'
              }
            ]
          },
          {
            id: '6a-g3',
            title: 'Mode Expert : Les Pronoms COD',
            description: 'Transforme les phrases en remplaçant le COD par un pronom (le, la, l\', les) pour éviter les répétitions !',
            icon: 'Zap',
            exercises: [
              {
                id: '6a-g3-e1',
                type: 'multiple-choice',
                question: 'Remplace le COD : "Amine va voir son ami." -> "Amine va ___ voir."',
                options: ['le', 'la', 'les'],
                correctAnswer: 'le'
              },
              {
                id: '6a-g3-e2',
                type: 'multiple-choice',
                question: 'Remplace le COD : "Tu vas voir Samira." -> "Tu vas ___ voir."',
                options: ['lui', 'la', 'l\''],
                correctAnswer: 'la'
              },
              {
                id: '6a-g3-e3',
                type: 'multiple-choice',
                question: 'Remplace le COD : "Karim appelle ses amis." -> "Karim ___ appelle."',
                options: ['le', 'leur', 'les'],
                correctAnswer: 'les'
              },
              {
                id: '6a-g3-listening',
                type: 'listening',
                audioPrompt: 'Réda l\'appelle',
                question: 'Quel est le pronom utilisé pour "son cousin" dans la phrase "Réda appelle son cousin" ?',
                options: ['le', 'la', 'l\''],
                correctAnswer: 'l\''
              }
            ]
          },
          {
            id: '6a-g4',
            title: 'Le Grand Quiz des Compléments',
            description: 'Prouve que tu es le maître absolu des COD et COI !',
            icon: 'Trophy',
            exercises: [
              {
                id: '6a-g4-e1',
                type: 'multiple-choice',
                question: '"J\'écris à ma grand-mère". Que représente "à ma grand-mère" ?',
                options: ['COD', 'COI', 'Sujet'],
                correctAnswer: 'COI'
              },
              {
                id: '6a-g4-e2',
                type: 'multiple-choice',
                question: '"Nous mangeons des pommes". Que représente "des pommes" ?',
                options: ['COD', 'COI', 'Verbe'],
                correctAnswer: 'COD'
              },
              {
                id: '6a-g4-e3',
                type: 'multiple-choice',
                question: 'Choisis la bonne phrase avec le pronom COD pour "Je vois ma voisine" :',
                options: ['Je lui vois', 'Je la vois', 'Je le vois'],
                correctAnswer: 'Je la vois'
              },
              {
                id: '6a-g4-e4',
                type: 'multiple-choice',
                question: 'Choisis la bonne phrase pour "Il téléphone à ses parents" :',
                options: ['Il les téléphone', 'Il lui téléphone', 'Il leur téléphone'],
                correctAnswer: 'Il leur téléphone'
              }
            ]
          }
        ]
      },
      {
        id: '6a-conj',
        title: 'Conjugaison : Passé Composé',
        lessons: [
          {
            id: '6a-c1',
            title: 'Auxiliaires et Participes',
            description: 'Utiliser avoir et être au passé.',
            icon: 'History',
            exercises: [
              {
                id: '6a-c1-e1',
                type: 'multiple-choice',
                question: 'Elle ___ (aller) au marché.',
                options: ['est allée', 'a allé', 'est allé'],
                correctAnswer: 'est allée'
              },
              {
                id: '6a-c1-listening',
                type: 'listening',
                audioPrompt: 'Nous sommes partis en vacances',
                question: 'Écoute et choisis le verbe :',
                options: ['Sommes partis', 'Étiez partis', 'Seront partis'],
                correctAnswer: 'Sommes partis'
              }
            ]
          }
        ]
      },
      {
        id: '6a-test',
        title: 'Certificat Primaire',
        lessons: [
          {
            id: '6a-t1',
            title: 'Examen Final YOJA',
            description: 'Le dernier défi avant le collège !',
            icon: 'Medal',
            exercises: [
              {
                id: '6a-t1-e1',
                type: 'multiple-choice',
                question: 'Quel est l\'infinitif de "nous fûmes" ?',
                options: ['Avoir', 'Être', 'Faire'],
                correctAnswer: 'Être'
              },
              {
                id: '6a-t1-listening',
                type: 'listening',
                audioPrompt: 'Félicitations pour ton diplôme YOJA',
                question: 'Qu\'as-tu entendu à la fin ?',
                options: ['Ton diplôme', 'Ton voyage', 'Ton travail'],
                correctAnswer: 'Ton diplôme'
              }
            ]
          }
        ]
      }
    ]
  }
];
