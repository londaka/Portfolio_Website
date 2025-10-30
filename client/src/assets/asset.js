import codingImage from './coding.png'
import profileImage from './profile.png'
import reactIcon from './react.png';
import javascriptIcon from './javascript.png';
import figmaIcon from './figma.png';
import gitIcon from './git.png';
import photoShop from './photoshop.png'
import spotifyImage from './spotify.png'
import todoImage from './todo.png'
import bookImage from './book.png'
import varificationImage from './varification.png'





export const skills = [
  { name: "React", icon: reactIcon },
  { name: "JavaScript", icon: javascriptIcon },
  { name: "Figma (UI/UX)", icon: figmaIcon },
  { name: "Git", icon: gitIcon },
  { name: "PhotoShop", icon:photoShop  }
];

export const projects = [
  {
    id: 1,
    projectImage: spotifyImage,
    title:'Spotify Clone',
    description: 'A full-featured Spotify platform built with React',
    technologies: ['React', 'Tailwindcss', 'Node/Express.js', 'MongoDB'],
    link: 'https://github.com/londaka/Spotify_Clone'
  },
  {
    id: 2,
    projectImage: todoImage,
    title: 'Todo-List App',
    description: 'A simple and fully functional app ',
    technologies: ['React', 'Tailwindcss', 'Node/Express.js', 'MongoDB'],
    link: 'https://github.com/londaka/Full-Stack-TO-DO-App'
  },
  {
    id: 3,
    projectImage: bookImage,
    title: 'Book-Recommendation System(Group-Project)',
    description: 'A simple and fully functional system',
    technologies: ['Python', 'HTML/CSS', 'Numpy/Pandas', 'MySQL'],
    link: 'https://github.com/londaka/Python-project'
  },
  {
    id: 4,
    projectImage:  varificationImage,
    title: 'Login & Registeration Form',
    description: 'A simple and fully functioal for Login and Signup',
    technologies: ['React', 'Node/Express.js', 'MongoDB'],
    link: 'https://github.com/londaka/React-Signup-and-Registration-form'
  }
]




export { codingImage, profileImage }


