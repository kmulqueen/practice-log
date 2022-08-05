import React from "react";
import { Card, CardBody, CardFooter } from "grommet";
import Identifier from "./Identifier";
import { useNavigate } from "react-router-dom";

function HomePageCard({ title, subtitle, icon, linkTo }) {
  const nav = useNavigate();
  return (
    <Card
      background="background-front"
      onClick={(e) => {
        e.stopPropagation();
        nav(linkTo);
      }}
    >
      <CardBody pad="none">
        <Identifier title={title} subtitle={subtitle} icon={icon} />
      </CardBody>
      <CardFooter background="background-back"></CardFooter>
    </Card>
  );
}

export default HomePageCard;
