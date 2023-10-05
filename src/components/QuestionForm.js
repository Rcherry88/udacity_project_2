import React, { useState } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/shared";
import NavigationBar from "./NavigationBar";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Grid,
} from "@mui/material";

const QuestionInput = (questioninputProps) => {
  const [firstAnswer, setfirstAnswer] = useState(null);
  const [secondAnswer, setsecondAnswer] = useState(null);

  const submitQuestion = (e) => {
    e.preventDefault();
    questioninputProps.dispatch(
      handleSaveQuestion(
        questioninputProps.authedUser,
        firstAnswer,
        secondAnswer
      )
    );
    questioninputProps.history.push("/");
  };
  const handleFirstAnswer = (e) => {
    setfirstAnswer(e.target.value);
  };

  const handleSecondAnswer = (e) => {
    setsecondAnswer(e.target.value);
  };
  return (
    <div>
      <NavigationBar />
      <Box>
        <Grid>
          <Card>
            <CardContent>
              <Typography variant="body2">Would you rather?</Typography>
              <TextField
                label="Choice 1"
                onChange={handleFirstAnswer}
                value={firstAnswer}
              />
              <span>Or</span>
              <TextField
                label="Choice 2"
                onChange={handleSecondAnswer}
                value={secondAnswer}
              />

              <Button onClick={submitQuestion}>Add</Button>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </div>
  );
};

function stateManagement({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(stateManagement)(QuestionInput);
