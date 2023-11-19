export const usersMock = [
  {
      id: 1,
      userId: '34xc98(dfk',
      email: 'user1@email.com',
      password: 'password',
      username: 'user1',
      goals: [],
      library: {
          haveRead: [],
          toRead: []
      },
      bookClubs: {
          host: ['fdul694*'],
          invited: [],
          accepted: ['sdfjil234)', 'fsqjil$t72']
      }
  },
  {
      id: 2,
      userId: '523dgf*5gn&',
      email: 'user2@email.com',
      password: 'password',
      username: 'user2',
      goals: [],
      library: {
          haveRead: [],
          toRead: []
      },
      bookClubs: {
          host: ['fsqjil$t72'],
          invited: ['sdfjil234'],
          accepted: ['fdul694*']
      }
  },
  {
      id: 3,
      userId: '62jt*(kj!3',
      email: 'user3@email.com',
      password: 'password',
      username: 'user3',
      goals: [{
          name: 'My First Goal',
          number: '20 pages',
          timeline: '3 days',
      }],
      library: {
          haveRead: [{
              title: 'title1',
              authors: [ 'John Smith', 'Julie Black' ],
              categories: [ 'Non-Fiction' ],
              averageRating: 5,
              description: 'A great book about things',
              imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
              pageCount: 234,
              publisher: 'Clearly'
            },{
              title: 'title2',
              authors: [ 'Fred Smith', 'Julie Steinberg' ],
              categories: [ 'Fiction' ],
              averageRating: 4,
              description: 'A great book about stuff',
              imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
              pageCount: 154,
              publisher: 'Smithson'
            },
            {
              title: 'title3',
              authors: [ 'Fred Smith', 'Julie Steinberg' ],
              categories: [ 'Fiction' ],
              averageRating: 3,
              description: 'A great novel about stuff',
              imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
              pageCount: 200,
              publisher: 'Smithly'
            }],
            toRead: [{
              title: 'title4',
              authors: [ 'Whit Merrifield'],
              categories: [ 'Biography', 'Sports' ],
              averageRating: 5,
              description: 'A great book about Whit',
              imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
              pageCount: 234,
              publisher: 'Jays'
            },
            {
              title: 'title5',
              authors: [ 'Fred Smith Black', 'Julie Steinberg' ],
              categories: [ 'Fiction' ],
              averageRating: 4,
              description: 'A great book about stuff',
              imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
              pageCount: 34,
              publisher: 'New'
            }]
      },
      bookClubs: {
          host: ['sdfjil234)'],
          invited: ['fdul694*'],
          accepted: ['fsqjil$t72']
      }
  }
];

export const userMock = usersMock[2];
