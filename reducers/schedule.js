const initialState = { currentDiscipline: "-", schedule: [] };
const schedule = (state = testState, action) => {
  const { type, schedule } = action;
  switch (type) {
    case "UPDATE_SCHELDULE":
      return { ...state, schedule };
    default:
      return state;
  }
};

export default schedule;

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
