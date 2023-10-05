import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAnswer } from "../actions/shared";
import NavigationBar from "./NavigationBar";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";
import QuestionView from "./QuestionView";
import NotFound from "./404Page"
import { Typography } from "@mui/material";

const PollView = (pollviewProps) => {
  const [selectedValue, setSelectedValue] = useState(null);
 
 
  if (!pollviewProps.q ) {
    return (   <NotFound></NotFound> )
 

  }





  const submitAnswer = (e) => {
    e.preventDefault();
    pollviewProps.dispatch(
      handleAnswer(
        pollviewProps.authedUser,
        pollviewProps.match.params.id,
        selectedValue
      )
    );
  };

  const handleChoice = (e) => {
    setSelectedValue(e.target.value);
  };

  let ques = pollviewProps.q ? pollviewProps.q : "";


  let answerMarkOp1 = pollviewProps.q
    ? pollviewProps.q.optionOne.votes.includes(pollviewProps.authedUser)
    : null;
  let answerMarkOp2 = pollviewProps.q
    ? pollviewProps.q.optionTwo.votes.includes(pollviewProps.authedUser)
    : null;

  let progressOptionOne = ques.optionOne.votes
    ? (ques.optionOne.votes.length /
        (ques.optionOne.votes.length + ques.optionTwo.votes.length)) *
      100
    : 0;
  let progressOptionTwo = ques.optionTwo.votes
    ? (ques.optionTwo.votes.length /
        (ques.optionOne.votes.length + ques.optionTwo.votes.length)) *
      100
    : 0;


  return (
    <div>
      {answerMarkOp1 === false && answerMarkOp2 === false ? (
        <div>
          <NavigationBar />
          <Card style={{ width: 400 }}>
            <CardMedia
              component="img"
              height="400"
              image={pollviewProps.author.avatarURL}
            />
            <CardContent>
              <Typography>Would you Rather?</Typography>
              <form onSubmit={submitAnswer}>
                <FormControl>
                  <RadioGroup
                    name="Answers"
                    value={selectedValue}
                    onChange={handleChoice}
                  >
                    <FormControlLabel
                      value="optionOne"
                      control={<Radio />}
                      label={ques ? ques.optionOne.text : ""}
                    />
                    <FormControlLabel
                      value="optionTwo"
                      control={<Radio />}
                      label={ques ? ques.optionTwo.text : ""}
                    />
                  </RadioGroup>
                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    type="submit"
                    variant="outlined"
                  >
                    Submit
                  </Button>
                </FormControl>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <QuestionView
          votesOptionOne={ques.optionOne.votes.length}
          votesOptionTwo={ques.optionTwo.votes.length}
          voteNamesOptionOne={ques.optionOne.votes}
          voteNamesOptionTwo={ques.optionTwo.votes}
          loggedInUser={pollviewProps.loggedInUser.id}

          progressOptionOne={progressOptionOne}
          progressOptionTwo={progressOptionTwo}
          questionOptionOne={ques.optionOne.text}
          questionOptionTwo={ques.optionTwo.text}
          authorimage={pollviewProps.author.avatarURL}
        />
      )}
    </div>
  );
};

function stateManagement({ users, questions, authedUser }, { match }) {
  let q = questions[match.params.id];
  let author = q ? users[q.author] : "";
 let  loggedInUser = users[authedUser];

  return {
    q,
    author,
    authedUser,
    loggedInUser,
  };
}

export default connect(stateManagement)(PollView);
