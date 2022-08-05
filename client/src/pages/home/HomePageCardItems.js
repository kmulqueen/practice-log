import { Achievement, Task, Optimize } from "grommet-icons";

export const cardItems = [
  {
    title: "Goals",
    subtitle: "View/Manage your goals",
    icon: <Achievement size="large" color="text-strong" />,
    id: 1,
    linkTo: "/goals/view",
  },
  {
    title: "Sessions",
    subtitle: "View/Create ractice sessions",
    icon: <Task size="large" color="text-strong" />,
    id: 2,
    linkTo: "/sessions",
  },
  {
    title: "Statistics",
    subtitle: "View statistics",
    icon: <Optimize size="large" color="text-strong" />,
    id: 3,
    linkTo: "/statistics",
  },
];
