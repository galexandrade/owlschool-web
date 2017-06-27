export const PAGES_MENU = [
  {
    path: 'pages',
    visible: true,
    children: [
      {
        path: 'dashboard',
        visible: true,
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'management',
        visible: true,
        data: {
          menu: {
            title: 'general.menu.management',
            icon: 'ion-android-attach',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'school',
            visible: true,
            data: {
              menu: {
                title: 'general.menu.school',
              }
            }
          },
          {
            path: 'students',
            visible: true,
            data: {
              menu: {
                title: 'general.menu.students',
              }
            }
          },
          {
            path: 'student',
            visible: false,
            data: {
              menu: {
                title: 'general.menu.student',
              }
            }
          },
          {
            path: 'team',
            visible: true,
            data: {
              menu: {
                title: 'general.menu.team',
              }
            }
          },
          {
            path: 'classes',
            visible: true,
            data: {
              menu: {
                title: 'general.menu.classes',
              }
            }
          }
        ]
      },
      {
        path: 'events',
        visible: true,
        data: {
          menu: {
            title: 'general.menu.events',
            icon: 'ion-android-calendar',
            selected: false,
            expanded: false,
            order: 245,
          }
        }
      },
      {
        path: 'news',
        visible: true,
        data: {
          menu: {
            title: 'general.menu.news',
            icon: 'ion-speakerphone',
            selected: false,
            expanded: false,
            order: 246,
          }
        }
      },
      {
        path: 'livemessage',
        visible: true,
        data: {
          menu: {
            title: 'general.menu.live_message',
            icon: 'ion-chatboxes',
            selected: false,
            expanded: false,
            order: 245,
          }
        }
      }
    ]
  }
];
