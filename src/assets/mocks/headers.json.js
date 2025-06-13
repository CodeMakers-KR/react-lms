export const headers = [
  {
    id: 0,
    group: "즐겨찾는 메뉴",
    groupItem: [],
    exclude: true,
    favorites: true,
  },
  {
    id: 1,
    group: `Main`,
    groupItem: [
      {
        id: 1002,
        title: "Home",
        spread: true,
        subItems: [
          { id: 1002001, title: "Dashboard", to: "/" },
          { id: 1002002, title: "Sample Dashboard", to: "/sample" },
        ],
      },
    ],
  },
  {
    id: 2,
    group: `System Management`,
    groupItem: [
      {
        id: 2001,
        title: "수강생 관리",
        subItems: [{ id: 2001001, title: "수강생 목록", to: "/login" }],
      },
      {
        id: 2002,
        title: "과정 관리",
        subItems: [{ id: 2002001, title: "과정 목록", to: "/login" }],
      },
      {
        id: 2003,
        title: "시스템 관리",
        subItems: [
          { id: 2003001, title: "메뉴 관리", to: "/login" },
          { id: 2003002, title: "휴일 관리", to: "/pwd" },
          { id: 2003003, title: "시스템 관리", to: "/login-otp" },
        ],
      },
    ],
  },
  {
    id: 3,
    group: `기본관리2`,
    groupItem: [
      { id: 3001, title: "로그인2", to: "/login" },
      { id: 3002, title: "비밀번호2", to: "/pwd" },
      { id: 3003, title: "OTP로그인2", to: "/login-otp" },
    ],
  },
];
