import React from "react";
import { connect } from "react-redux";
import NavigationBar from "./NavigationBar";
import { Box, Grid } from "@mui/material";
import LeaderboardCard from "./LeaderboardCard";

const Leaderboard = (leaderboardProps) => {
  return (
    <div>
      <NavigationBar />
      <Box>
        <Grid>
          {leaderboardProps.sortedUsers.map((user) => (
            <LeaderboardCard key={user.id} user={user} />
          ))}
        </Grid>
      </Box>
    </div>
  );
};
function stateManagement({ users }) {
  const sortedUsers = Object.values(users).sort((a, b) => {
    const adata = Object.keys(a.answers).length + a.questions.length;
    const bdata = Object.keys(b.answers).length + b.questions.length;
    return bdata - adata;
  });
  return {
    sortedUsers,
  };
}

export default connect(stateManagement)(Leaderboard);
