export const headers = [
  {
    id: 1,
    group: `My`,
    groupItem: [
      {
        id: 1001,
        title: "Home",
        spread: true,
        subItems: [
          { id: 1001001, title: "Dashboard", to: "/" },
          { id: 1001002, title: "Sample Dashboard", to: "/sample" },
        ],
      },
    ],
  },
  {
    id: 2,
    group: `Management`,
    groupItem: [
      {
        id: 2001,
        title: "기본관리",
        subItems: [
          { id: 2001001, title: "로그인", to: "/login" },
          { id: 2001002, title: "비밀번호", to: "/pwd" },
          { id: 2001003, title: "OTP로그인", to: "/login-otp" },
        ],
      },
      {
        id: 2002,
        title: "보안관리",
        groupItem: [
          { id: 2002001, title: "로그인2", to: "/login" },
          { id: 2002002, title: "비밀번호2", to: "/pwd" },
          { id: 2002003, title: "OTP로그인2", to: "/login-otp" },
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
