import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Poll = (pollProps) => {
  return (
    <Card style={{ width: 400 }}>
      <CardMedia
        component="img"
        height="400"
        image={pollProps.questionAuthor.avatarURL}
      />
      <CardContent>
        <Typography variant="body2" >
          Would you rather?
        </Typography>
        <Link to={`/questions/${pollProps.ques.id}`}>
          <Button block onClick={pollProps.routeChange}>
            View Poll
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

function stateManagement({ users }, { ques }) {
  return {
    questionAuthor: users[ques.author],
  };
}

export default connect(stateManagement)(Poll);
