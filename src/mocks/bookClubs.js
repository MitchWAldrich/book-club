export const bookClubsMock = [
  {
      id: 1,
      bookClubId: 'sdfjil234)',
      bookClubHostId: '62jt*(kj!3',
      hostUserName: 'Amari Bolt',
      name: 'My First Book Club',
      members: {invited: [], accepted: []},
      books: {
        currentBook: {title: 'Reese\'s Favourite Book', author: 'Luna Slink', thumbnail: ''},
        nextBook: 'Oprah\'s Favourite Book',
        upcomingBooks: ['Next Book', 'Other Next Book', 'Biography of a Celeb'],
        previousBooks: ['Old Book', 'Other Old Book', 'A Graphic Novel'],
      },
      meetings: {
        meetingFrequency: 'weekly',
        nextMeetingDate: '12/24/2023',
        nextMeetingTime: '7:00pm',
        nextMeetingLocation: {
          online: 'N/A',
          inPerson: {
            'streetNumber': 234,
            'unitNumber': '3',
            'streetName': 'Yonge Blvd',
            'city': 'Toronto',
            'province': 'ON',
            'country': 'CA'
          }
        }
      },
      isNewBookClub: true,
      visibility: 'public',
      genre: 'Fantasy',
  },
  {
      id: 2,
      bookClubId: 'fsqjil$t72',
      bookClubHostId: '523dgf*5gn&',
      hostUserName: 'Jenna Black',
      name: 'My Second Book Club',
      members: {invited: [],  accepted: ['62jt*(kj!3', '34xc98(dfk']},
      books: {
        currentBook: {title: 'Reese\'s 2nd Favourite Book', author: 'Luna Slink', thumbnail: ''},
        nextBook: 'Oprah\'s 2nd Favourite Book',
        upcomingBooks: ['New Book', 'New Odd Book', 'SoCal Dreams'],
        previousBooks: ['Old Book 2', 'A 2nd Old Book', 'A 2nd Graphic Novel'],
      },
      meetings: {
        meetingFrequency: 'monthly',
        nextMeetingDate: '12/27/2023',
        nextMeetingTime: '7:00pm',
        nextMeetingLocation: {
          online: 'Zoom.link',
          inPerson: 'N/A'
        }
      },
      isNewBookClub: false,
      visibility: 'friendsCanSee',
      genre: 'Fiction',
  },
  {
      id: 3,
      bookClubId: 'fdul694*',
      bookClubHostId: '34xc98(dfk',
      hostUserName: 'Jamie Smith',
      name: 'Book Clubbing',
      members: {invited: ['62jt*(kj!3'], accepted: ['523dgf*5gn&']},
      books: {
        currentBook: {title: 'Reese\'s 3rd Favourite Book', author: 'Luna Slink', thumbnail: ''},
        nextBook: 'Oprah\'s 3rd Favourite Book',
        upcomingBooks: ['Three and One Book', 'Books are Fun', 'Anatomy of a Society'],
        previousBooks: ['Old Book 3', 'Third Old Book', 'A 3rd Graphic Novel'],
      },
      meetings: {
        meetingFrequency: 'bi-weekly',
        nextMeetingDate: '11/24/2023',
        nextMeetingTime: '7:00pm',
        nextMeetingLocation: {
          online: 'Zoom.otherLink',
          inPerson: {
            'streetNumber': 12,
            'unitNumber': 'N/A',
            'streetName': 'Dundas St. W',
            'city': 'Toronto',
            'province': 'ON',
            'country': 'CA'
          }
        } 
      },
      isNewBookClub: false,
      visibility: 'inviteOnly',
      genre: 'Non-Fiction',
  }
]

export const bookClubMock = bookClubsMock[0];
