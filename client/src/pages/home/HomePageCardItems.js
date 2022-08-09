import { Achievement, Music, Task, Optimize } from "grommet-icons";

export const cardItems = [
  {
    title: "Instruments",
    subtitle: "View/Manage your instruments",
    icon: <Music size="large" color="text-strong" />,
    id: 1,
    linkTo: "/instruments/view",
  },
  {
    title: "Goals",
    subtitle: "View/Manage your goals",
    icon: <Achievement size="large" color="text-strong" />,
    id: 2,
    linkTo: "/goals/view",
  },
  {
    title: "Sessions",
    subtitle: "View/Create ractice sessions",
    icon: <Task size="large" color="text-strong" />,
    id: 3,
    linkTo: "/sessions",
  },
  {
    title: "Statistics",
    subtitle: "View statistics",
    icon: <Optimize size="large" color="text-strong" />,
    id: 4,
    linkTo: "/statistics",
  },
];
