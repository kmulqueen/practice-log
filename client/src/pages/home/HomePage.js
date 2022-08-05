import { useContext } from "react";
import { useSelector } from "react-redux";
import { Heading, Grid, ResponsiveContext } from "grommet";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import HomePageCard from "../../components/HomePageCard/HomePageCard";
import { cardItems } from "./HomePageCardItems";

const cardGrid = {
  columns: {
    xsmall: "auto",
    small: ["auto"],
    medium: { count: "fit", size: ["1/2", "auto"] },
    large: { count: "fit", size: ["1/3", "auto"] },
    xlarge: { count: "fit", size: ["1/4", "auto"] },
  },
  rows: "small",
  gap: {
    xsmall: "medium",
    small: "small",
    medium: "small",
    large: "medium",
    xlarge: "medium",
  },
};

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const size = useContext(ResponsiveContext);
  return (
    <>
      <PageWrapper>
        <Heading level={1} size="small">
          Hello, {user.username}
        </Heading>
        <Grid
          columns={cardGrid.columns[size]}
          rows={cardGrid.rows}
          gap={cardGrid.gap[size]}
        >
          {cardItems.map((item) => (
            <HomePageCard
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              key={item.id}
              linkTo={item.linkTo}
            />
          ))}
        </Grid>
      </PageWrapper>
    </>
  );
};

export default HomePage;
