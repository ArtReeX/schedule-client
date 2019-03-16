const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SCHEDULE":
      return action.lessons;
    default:
      return state;
  }
};

const testState = {
  currentDiscipline: "Физкультура",
  schedule: [
    {
      name: "Физкультура",
      teacher: "Драгнев А.Г.",
      room: 115,
      timeStart: 1550390400,
      timeEnd: 1550395200
    },
    {
      name: "Базы данных",
      teacher: "Капустин А.В.",
      room: 256,
      timeStart: 1550395800,
      timeEnd: 1550400600
    },
    {
      name: "Экономика",
      teacher: "Суворова А.В.",
      room: 351,
      timeStart: 1550401200,
      timeEnd: 1550406000
    },
    {
      name: "Экономика предприятия",
      teacher: "Суворова А.В.",
      room: 351,
      timeStart: 1550406600,
      timeEnd: 1550411400
    },
    {
      name: "WEB-программирование",
      teacher: "Суворова А.В.",
      room: 351,
      timeStart: 1550412000,
      timeEnd: 1550416800
    }
  ]
};
