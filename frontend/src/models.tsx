export interface Course {
  id: number; // unique course id
  name: string,
  location: string,
  holes: Hole[];
}

export interface Hole {
  id: number; // unique hole id per course
  par: number;
}

// TEMP place for this, will need to be stored on the backend later anyway
export function LoadCourses(): Course[] {
  return [
    {
      id: 0,
      name: 'Cherry Hill',
      location: 'CA',
      holes: [
        {
          id: 1,
          par: 3,
        },
        {
          id: 2,
          par: 4,
        },
      ],
    },
    {
      id: 1,
      name: 'Orange Brook',
      location: 'OR',
      holes: [
        {
          id: 1,
          par: 4,
        },
        {
          id: 2,
          par: 3,
        },
      ],
    },
  ];
}