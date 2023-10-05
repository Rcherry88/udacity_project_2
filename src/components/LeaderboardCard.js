import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const LeaderboardCard = (leaderboardcardProps) => {

  return (
    <Card style={{ width: 400 }}>
      <CardMedia
        component="img"
        image={leaderboardcardProps.user.avatarURL}
      ></CardMedia>
      <CardContent>
        <Typography variant="body2" >
          {leaderboardcardProps.name}
        </Typography>
        <div>
          Answered Questions:{" "}
          {Object.keys(leaderboardcardProps.user.answers).length}
        </div>
        <div>
          Created Question: {leaderboardcardProps.user.questions.length}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
