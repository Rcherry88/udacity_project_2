import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import {
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const QuestionView = (questionviewProps) => {

  const [userSelectedOne, setUserSelectedOne] = useState(false);
  const [ userSelectedTwo, setUserSelectedTwo] = useState(false);


  useEffect(() => {
    for (let i = 0; i < questionviewProps.voteNamesOptionOne.length; i++) {
      if (questionviewProps.voteNamesOptionOne[i] === questionviewProps.loggedInUser) {
        setUserSelectedOne(true);
      }
    }
  
    for (let i = 0; i < questionviewProps.voteNamesOptionTwo.length; i++) {
      if (questionviewProps.voteNamesOptionTwo[i] === questionviewProps.loggedInUser) {
        setUserSelectedTwo(true);
      }
    }
   }
, [questionviewProps.voteNamesOptionOne, questionviewProps.voteNamesOptionTwo, questionviewProps.loggedInUser ]);
 

  
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" >
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div>
      <NavigationBar />
      <Card style={{ width: 400 }}>
        <CardMedia
          component="img"
          height="400"
          image={questionviewProps.authorimage}
        />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography>Option One: {questionviewProps.questionOptionOne} </Typography>
            {userSelectedOne && (
                <Card variant="outlined" style={{ backgroundColor: "#2196f3", color: "#fff", padding: "4px" }}>
                  <Typography variant="body2">You Voted for This</Typography>
                </Card>
              )}
          </div>
          <Typography> Vote Amount: {questionviewProps.votesOptionOne}</Typography>
          <div>Vote Percentage:
            <CircularProgressWithLabel
              variant="determinate"
              value={questionviewProps.progressOptionOne}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography>Option Two: {questionviewProps.questionOptionTwo}</Typography>
            {userSelectedTwo && (
                <Card variant="outlined" style={{ backgroundColor: "#2196f3", color: "#fff", padding: "4px" }}>
                  <Typography variant="body2">You Voted for This</Typography>
                </Card>
              )}
          </div>
          <Typography> Vote Amount: {questionviewProps.votesOptionTwo}</Typography>
          <div>Vote Percentage:
            <CircularProgressWithLabel
              variant="determinate"
              value={questionviewProps.progressOptionTwo}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionView