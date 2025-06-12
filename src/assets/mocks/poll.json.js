export const pollData = {
  title: "Poll Test",
  description: "설문조사 템플릿입니다.",
  pollItemList: [
    {
      id: "poll_1",
      number: 1,
      title: "만족하십니까?",
      required: true,
      type: "radio",
      answers: [
        {
          id: "poll_answer_1_1",
          name: "Poll 1",
          title: "매우 불만족",
          value: 1,
        },
        { id: "poll_answer_1_2", name: "Poll 1", title: "불만족", value: 2 },
        { id: "poll_answer_1_3", name: "Poll 1", title: "보통", value: 3 },
        {
          id: "poll_answer_1_4",
          name: "Poll 1",
          title: "대체로 만족",
          value: 4,
        },
        { id: "poll_answer_1_5", name: "Poll 1", title: "매우 만족", value: 5 },
      ],
    },
    {
      id: "poll_2",
      number: 2,
      title: "좋습니까??",
      required: true,
      type: "checkbox",
      max: 3,
      answers: [
        {
          id: "poll_answer_2_1",
          name: "Poll 2",
          title: "매우 불만족",
          value: 1,
        },
        { id: "poll_answer_2_2", name: "Poll 2", title: "불만족", value: 2 },
        { id: "poll_answer_2_3", name: "Poll 2", title: "보통", value: 3 },
        {
          id: "poll_answer_2_4",
          name: "Poll 2",
          title: "대체로 만족",
          value: 4,
        },
        { id: "poll_answer_2_5", name: "Poll 2", title: "매우 만족", value: 5 },
      ],
    },
    {
      id: "poll_3",
      number: 3,
      title: "자유롭게 쓰세요.",
      required: false,
      type: "textarea",
      answers: [
        { id: "poll_answer_3_1", name: "Poll 3", title: "", value: "" },
      ],
    },
    {
      id: "poll_4",
      number: 4,
      title: "자유롭게 쓰세요.",
      required: true,
      type: "select",
      answers: [
        { id: "poll_answer_4_1", name: "Poll 4", title: "스킬", value: "java" },
      ],
      options: [
        { id: "poll_answer_4_1_1", text: "Java", value: "java" },
        { id: "poll_answer_4_1_2", text: "Python", value: "python" },
        { id: "poll_answer_4_1_3", text: "C++", value: "c++" },
        { id: "poll_answer_4_1_4", text: "C#", value: "c#" },
      ],
    },
  ],
};
