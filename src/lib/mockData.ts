import { MediaEntry } from "../types";

export const generateMockData = (count: number = 50): MediaEntry[] => {
  const movies = [
    {
      title: "Inception",
      director: "Christopher Nolan",
      budget: "$160M",
      location: "Los Angeles, Paris, Tokyo",
      duration: "148 min",
      year: "2010",
      poster: "https://images.unsplash.com/photo-1548095115-45697e222a58?w=400",
      description: "A thief who steals corporate secrets through dream-sharing technology."
    },
    {
      title: "The Dark Knight",
      director: "Christopher Nolan",
      budget: "$185M",
      location: "Chicago, London",
      duration: "152 min",
      year: "2008",
      poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400",
      description: "Batman faces the Joker, a criminal mastermind wreaking havoc on Gotham."
    },
    {
      title: "Interstellar",
      director: "Christopher Nolan",
      budget: "$165M",
      location: "Alberta, Iceland",
      duration: "169 min",
      year: "2014",
      poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400",
      description: "A team of explorers travel through a wormhole in space."
    },
    {
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      budget: "$25M",
      location: "Ohio",
      duration: "142 min",
      year: "1994",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
      description: "Two imprisoned men bond over years, finding redemption."
    },
    {
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      budget: "$8M",
      location: "Los Angeles",
      duration: "154 min",
      year: "1994",
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400",
      description: "Various interconnected stories of criminals in Los Angeles."
    },
    {
      title: "The Godfather",
      director: "Francis Ford Coppola",
      budget: "$6M",
      location: "New York, Sicily",
      duration: "175 min",
      year: "1972",
      poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400",
      description: "The aging patriarch of an organized crime dynasty transfers control."
    },
    {
      title: "Fight Club",
      director: "David Fincher",
      budget: "$63M",
      location: "Los Angeles",
      duration: "139 min",
      year: "1999",
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400",
      description: "An insomniac office worker forms an underground fight club."
    },
    {
      title: "Forrest Gump",
      director: "Robert Zemeckis",
      budget: "$55M",
      location: "South Carolina",
      duration: "142 min",
      year: "1994",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
      description: "The presidencies of Kennedy and Johnson unfold through a slow-witted man."
    },
    {
      title: "The Matrix",
      director: "Lana Wachowski",
      budget: "$63M",
      location: "Sydney",
      duration: "136 min",
      year: "1999",
      poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400",
      description: "A computer hacker learns about the true nature of reality."
    },
    {
      title: "Goodfellas",
      director: "Martin Scorsese",
      budget: "$25M",
      location: "New York",
      duration: "146 min",
      year: "1990",
      poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400",
      description: "The story of Henry Hill and his life in the mob."
    }
  ];

  const tvShows = [
    {
      title: "Breaking Bad",
      director: "Vince Gilligan",
      budget: "$3M/episode",
      location: "Albuquerque, New Mexico",
      duration: "49 min/episode",
      year: "2008-2013",
      poster: "https://images.unsplash.com/photo-1558886668-e9a014c0141a?w=400",
      description: "A chemistry teacher turned methamphetamine producer."
    },
    {
      title: "Stranger Things",
      director: "The Duffer Brothers",
      budget: "$8M/episode",
      location: "Atlanta, Georgia",
      duration: "50 min/episode",
      year: "2016-present",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400",
      description: "A group of kids uncover supernatural mysteries in their town."
    },
    {
      title: "Game of Thrones",
      director: "David Benioff",
      budget: "$6M/episode",
      location: "Belfast, Croatia",
      duration: "57 min/episode",
      year: "2011-2019",
      poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "Noble families vie for control of the Iron Throne."
    },
    {
      title: "The Crown",
      director: "Peter Morgan",
      budget: "$13M/episode",
      location: "London, Scotland",
      duration: "58 min/episode",
      year: "2016-2023",
      poster: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      description: "The reign of Queen Elizabeth II."
    },
    {
      title: "The Office",
      director: "Greg Daniels",
      budget: "$500K/episode",
      location: "Los Angeles",
      duration: "22 min/episode",
      year: "2005-2013",
      poster: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      description: "A mockumentary on a group of office workers."
    },
    {
      title: "Friends",
      director: "David Crane",
      budget: "$1M/episode",
      location: "Los Angeles",
      duration: "22 min/episode",
      year: "1994-2004",
      poster: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
      description: "Six friends navigate life and love in New York City."
    },
    {
      title: "The Witcher",
      director: "Lauren Schmidt",
      budget: "$10M/episode",
      location: "Hungary, Poland",
      duration: "60 min/episode",
      year: "2019-present",
      poster: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      description: "Geralt of Rivia, a monster hunter, struggles to find his place."
    },
    {
      title: "The Mandalorian",
      director: "Jon Favreau",
      budget: "$15M/episode",
      location: "California",
      duration: "40 min/episode",
      year: "2019-present",
      poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "A lone bounty hunter in the outer reaches of the galaxy."
    },
    {
      title: "Sherlock",
      director: "Mark Gatiss",
      budget: "$2M/episode",
      location: "London",
      duration: "90 min/episode",
      year: "2010-2017",
      poster: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
      description: "A modern update of Sherlock Holmes mysteries."
    },
    {
      title: "The Boys",
      director: "Eric Kripke",
      budget: "$11M/episode",
      location: "Toronto",
      duration: "60 min/episode",
      year: "2019-present",
      poster: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      description: "A group of vigilantes combat corrupt superheroes."
    }
  ];

  const allMedia = [...movies.map(m => ({ ...m, type: "Movie" as const })), ...tvShows.map(t => ({ ...t, type: "TV Show" as const }))];
  
  const result: MediaEntry[] = [];
  for (let i = 0; i < count; i++) {
    const template = allMedia[i % allMedia.length];
    result.push({
      id: `media-${i + 1}`,
      ...template,
      title: i < allMedia.length ? template.title : `${template.title} ${Math.floor(i / allMedia.length) + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
